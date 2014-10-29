<?php
class KtacActorMovePacket extends KtacPacket {

  public $packetName = "KtacActorMovePacket";
  public $requiredVars = array("goalLocation");


  function process() {
    parent::validate();

    $zone = $this->validateNumeric("loc zone", $this->vars["goalLocation"]['zone']);
    $x    = $this->validateNumeric("loc x", $this->vars["goalLocation"]['x']);
    $y    = $this->validateNumeric("loc y", $this->vars["goalLocation"]['y']);
    $z    = $this->validateNumeric("loc z", $this->vars["goalLocation"]['z']);

    global $user;
    nodejs_add_user_to_channel($user->uid, "ktacChannel");

    nodejs_send_channel_message("ktacChannel", "KtacActorMovePacket", $this->vars);
    drupal_json_output(array('data' => array('accessGranted' => 'Actor Move Packet Processed')));
    drupal_exit();

    //$this->errorResponse("Actor Move Packet processed success stub!");
  }
}