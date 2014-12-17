<?php
class KtacPacket {

  public $packetName = "KtacPacket";
  public $requiredVars = array();
  public $vars = array();
  public $rawData = stdClass;
  public $fromSocketId = null;
  public $fromTimestamp = null;

  function __construct($packetData) {
    $this->rawData = json_decode($packetData);
  }

  function createReplyPacket() {
  	$replyPacket = new KtacPushPacket();
  	$replyPacket->replyToSocketId = $this->fromSocketId;
  	$replyPacket->replyToTimestamp = $this->fromTimestamp;
  	return $replyPacket;
  }
}