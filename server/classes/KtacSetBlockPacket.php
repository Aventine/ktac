<?php
class KtacSetBlockPacket extends KtacPacket {

  public $packetName = "KtacSetBlockPacket";
  public $requiredVars = array("loc", "setTo");


  function process() {
    parent::validate();
//$this->errorResponse("debug test: " . print_r($this->vars, 1));
    $zone = $this->validateInteger("loc zone", $this->vars["loc"]->zone);
    $x = $this->validateInteger("loc x", $this->vars["loc"]->x);
    $y = $this->validateInteger("loc y", $this->vars["loc"]->y);
    $z = $this->validateInteger("loc z", $this->vars["loc"]->z);
    $blocktype = $this->validateInteger("setTo", $this->vars["setTo"]);

    $result = db_select('ktac_block', 'blocktype')
    ->fields('blocktype')
    ->condition('zone', $zone, '=')
    ->condition('x', $x, '=')
    ->condition('y', $y, '=')
    ->condition('z', $z, '=')
    ->execute()
    ->fetchAssoc();

    //var_dump($result); exit;
    $oldBlocktype = 0;
    if(sizeof($result) != 0) {
      $oldBlocktype = $result["blocktype"];
    }

    if($oldBlocktype == $blocktype) {
      $this->errorResponse("no effect: old blocktype was same as new");
    }

    // log the event
    /*$eventlogJson = new stdClass();
    $eventlogJson->eventType = "setTile";
    $eventlogJson->blocktypewas = $oldBlocktype;
    $eventlogJson->blocktypebecame = $blocktype;
    db_insert('ktac_eventlog')
    ->fields(array(
      'timestamp' => time(),
      'zone' => $zone,
      'x' => $x,
      'y' => $y,
      'z' => $z,
      'json' => json_encode($eventlogJson),
    ))
    ->execute();*/


    // actually set the tile
    db_merge('ktac_block')
    ->key(array('zone' => $zone, "x" => $x, "y" => $y, "z" => $z))
    ->fields(array(
    'blocktype' => $blocktype
    ))
    ->execute();

    //ktacTestNodeJsPushTilled();


    nodejs_send_channel_message("ktacChannel", "KtacSetBlockPacket", json_encode($this->vars));
    drupal_json_output(array('data' => array('accessGranted' => 'KtacSetBlockPacket success')));
    //drupal_exit();
    exit;
    
    //$this->errorResponse("processed success stub!");
  }
}