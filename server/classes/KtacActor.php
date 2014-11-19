<?php

class KtacActor {
  
  public $type;
  public $id;
  public $name;
  public $location;
  
  function __construct($idOrJson) {
    if(is_int($id)) {
      $this->populateFromId($idOrJson);
    } else if (is_object($idOrJson)) {
      $this->populateFromJson($idOrJson);
    }
  }
  
  function populateFromId($id) {
    
    $id = KtacValidation::requireInteger($id);
    
    $results = db_select('ktac_actor')
      ->fields('ktac_actor')
      ->condition('id', $id, '=')
      ->execute();

    $result = $results->fetchAssoc();
   
    $this->populateFromDbResult($result);
  }
  
  function populateFromDbResult($result) {
    $this->id = $result["id"];
    $this->type = $result["type"];
    $this->name = $result["name"];
    $this->location = new KtacLocation($result["zone"], $result["x"], $result["y"], $result["z"]);
  }
  
  function populateFromJson($json) {
    //$js = json_decode($json);
    $js = $json;
    $this->id = KtacValidation::requireInteger($js->id);
    $this->type = KtacValidation::requireInteger($js->type);
    $this->name = KtacValidation::requireName($js->name);
    $this->location = new KtacLocation($js->location);
  }
  
  function save() {
    
    //$debug = new KtacDebugPacket("saving with id " . $this->id);
    //$debug->send();
    
    db_merge('ktac_actor')
    ->key(array(
      'id' => $this->id))
    ->fields(array(
      'actortype' => $this->type,
      'name' => $this->name,
      'zone' => $this->location->zone,
      'x' => $this->location->x,
      'y' => $this->location->y,
      'z' => $this->location->z,
    ))
    ->execute();
  }
  
  
}
