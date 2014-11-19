<?php
class KtacActorSavePacket extends KtacPacket {

  public $packetName = "KtacActorSavePacket";
  //public $requiredVars = array("actor");
  // public $validation = array(
    // "actorId" => "validInteger",
    // "actorLocationZone" => "validInteger",
    // "actorLocationX" => "validInteger",
    // "actorLocationY" => "validInteger",
    // "actorLocationZ" => "validInteger",
  // );
  
  public $actor;

  function process() {
    //parent::validate();
    //$this->actor = $this->rawData->actor;
//print_r($this->vars["actor"]);
//echo $id; die;
    //$debug = new KtacDebugPacket(print_r($this, 1));
    //$debug->send();
  
    $ktacActor = new KtacActor($this->rawData->actor);
    $ktacActor->save();
 
   //$id = $this->validateInteger("actor id", $this->vars["actor"]->id);
   

   /* $zone = $this->validateNumeric("loc zone", $this->vars["goalLocation"]['zone']);
    $x    = $this->validateNumeric("loc x", $this->vars["goalLocation"]['x']);
    $y    = $this->validateNumeric("loc y", $this->vars["goalLocation"]['y']);
    $z    = $this->validateNumeric("loc z", $this->vars["goalLocation"]['z']);

    global $user;
    nodejs_add_user_to_channel($user->uid, "ktacChannel");

    nodejs_send_channel_message("ktacChannel", "KtacActorMovePacket", $this->vars);*/
    drupal_json_output(array('data' => array('accessGranted' => 'Actor Save Packet Processed')));
    drupal_exit();

    //$this->errorResponse("Actor Move Packet processed success stub!");
  }
}