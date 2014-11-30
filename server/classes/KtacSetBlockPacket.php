<?php
class KtacSetBlockPacket extends KtacPacket {

  public $packetName = "KtacSetBlockPacket";
  //public $requiredVars = array("loc", "setTo");


  function process() {
    //parent::validate();
//$this->errorResponse("debug test: " . print_r($this->vars, 1));
    // $zone = $this->validateInteger("loc zone", $this->vars["loc"]->zone);
    // $x = $this->validateInteger("loc x", $this->vars["loc"]->x);
    // $y = $this->validateInteger("loc y", $this->vars["loc"]->y);
    // $z = $this->validateInteger("loc z", $this->vars["loc"]->z);
    // $blocktype = $this->validateInteger("setTo", $this->vars["setTo"]);

    $loc = new KtacLocation($this->rawData->loc);
    $blocktype = KtacValidation::requireInteger($this->rawData->setTo);

    $result = db_select('ktac_block', 'blocktype')
    ->fields('blocktype')
    ->condition('zone', $loc->zone, '=')
    ->condition('x', $loc->x, '=')
    ->condition('y', $loc->y, '=')
    ->condition('z', $loc->z, '=')
    ->execute()
    ->fetchAssoc();

    //var_dump($result); exit;
    $oldBlocktype = 0;
    if(sizeof($result) != 0) {
      $oldBlocktype = $result["blocktype"];
    }

    if($oldBlocktype == $blocktype) {
    	KtacValidation::errorOut("no effect: old blocktype was same as new");
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
    ->key(array('zone' => $loc->zone, "x" => $loc->x, "y" => $loc->y, "z" => $loc->z))
    ->fields(array(
    'blocktype' => $blocktype
    ))
    ->execute();

    //ktacTestNodeJsPushTilled();

    $announce = new KtacPushPacket();
    $announce->packetName = "KtacSetBlockPacket";
    $announce->loc = $loc;
    $announce->setTo = $blocktype;
    $announce->send();

    nodejs_send_channel_message("ktacChannel", "KtacSetBlockPacket", json_encode($this->vars));
    drupal_json_output(array('data' => array('accessGranted' => 'KtacSetBlockPacket success')));
    drupal_exit();
    exit;
    
    //$this->errorResponse("processed success stub!");
  }
}