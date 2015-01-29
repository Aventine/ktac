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

  	$ktacActor = new KtacActor($this->rawData->actor);
  	
//   	if(isset($this->rawData->deleteOnServer) && $this->rawData->deleteOnServer === true) {
//   		$num_deleted = db_delete('ktac_actor')
//   		->condition('id', $ktacActor->id)
//   		->execute();
  		
//   		$announce = new KtacPushPacket();
//   		$announce->packetName = "KtacActorSavePacket";
//   		$announce->id = $ktacActor->id;
//   		$announce->deletedOnServer = true;
//   		$announce->send();
  		
//   		drupal_json_output(array('data' => array('accessGranted' => 'Actor Delete Packet Processed')));
//   		drupal_exit(); exit;
//   	}
  	
    $ktacActor->save();
    
    //$announce = new KtacPushPacket();
    $announce = $this->createReplyPacket();
    $announce->packetName = "KtacActorSavePacket";
    $announce->id = $ktacActor->id;
    $announce->actorType = $ktacActor->type;
    $announce->location = $ktacActor->location;
    $announce->toBeDeleted = $ktacActor->toBeDeleted;
    $announce->send();
    
    
    drupal_json_output(array('data' => array('savedId' => $ktacActor->id)));
    drupal_exit(); exit;

    //$this->errorResponse("Actor Move Packet processed success stub!");
  }
}