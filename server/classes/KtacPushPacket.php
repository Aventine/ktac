<?php

class KtacPushPacket {
  public $packetName = "KtacPushPacket";
  public $replyToSocketId = null;
  public $replyToTimestamp = null;
   
  function send() {
    nodejs_send_channel_message("ktacChannel", $this->packetName, json_encode($this));
  }
}
