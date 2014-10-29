<?php
class KtacSetBlockPacket extends KtacPacket {

  public $packetName = "KtacSetBlockPacket";
  public $requiredVars = array("loc", "tiletype");


  function process() {
    parent::validate();

    $zone = $this->validateNumeric("loc zone", $this->vars["loc"]['zone']);
    $x = $this->validateNumeric("loc x", $this->vars["loc"]['x']);
    $y = $this->validateNumeric("loc y", $this->vars["loc"]['y']);
    $z = $this->validateNumeric("loc z", $this->vars["loc"]['z']);
    $tiletype = $this->validateNumeric("tiletype", $this->vars["tiletype"]);

    $result = db_select('ktac_block', 'tiletype')
    ->fields('tiletype')
    ->condition('zone', $zone, '=')
    ->condition('x', $x, '=')
    ->condition('y', $y, '=')
    ->condition('z', $z, '=')
    ->execute()
    ->fetchAssoc();

    //var_dump($result); exit;
    $oldTiletype = 0;
    if(sizeof($result) != 0) {
      $oldTiletype = $result["tiletype"];
    }

    if($oldTiletype == $tiletype) {
      $this->errorResponse("no effect: old tiletype was same as new");
    }

    // log the event
    $eventlogJson = new stdClass();
    $eventlogJson->eventType = "setTile";
    $eventlogJson->tiletypewas = $oldTiletype;
    $eventlogJson->tiletypebecame = $tiletype;
    db_insert('ktac_eventlog')
    ->fields(array(
      'timestamp' => time(),
      'zone' => $zone,
      'x' => $x,
      'y' => $y,
      'z' => $z,
      'json' => json_encode($eventlogJson),
    ))
    ->execute();


    // actually set the tile
    db_merge('ktac_block')
    ->key(array('zone' => $zone, "x" => $x, "y" => $y, "z" => $z))
    ->fields(array(
    'blocktype' => $tiletype
    ))
    ->execute();

    //ktacTestNodeJsPushTilled();


    nodejs_send_channel_message("ktacChannel", "KtacSetBlockPacket", json_encode($this->vars));
    drupal_json_output(array('data' => array('accessGranted' => 'KtacSetBlockPacket success')));
    drupal_exit();

    //$this->errorResponse("processed success stub!");
  }
}