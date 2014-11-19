<?php
class KtacZone {

  public $blocks = array();
  public $actors = array();

  function __construct($zoneId) {
    
    $results = db_select('ktac_block')
    ->fields('ktac_block')
    ->condition('zone', $zoneId, '=')
    ->execute();

    $this->blocks = array();
    while($result = $results->fetchAssoc()) {
      if(!is_array($this->blocks[$result["x"]])) {
        $this->blocks[$result["x"]] = array();
      }
      if(!is_array($this->blocks[$result["y"]])) {
        $this->blocks[$result["y"]] = array();
      }
      $this->blocks[$result["x"]][$result["y"]][$result["z"]] = $result['blocktype'];
    }
    
    $results = db_select('ktac_actor')
    ->fields('ktac_actor')
    ->condition('zone', $zoneId, '=')
    ->execute();

    $this->actors = array();
    while($result = $results->fetchAssoc()) {
      $actor = new KtacActor();
      $actor->populateFromDbResult($result);
      $this->actors[] = $actor;
    }
        
  }
}