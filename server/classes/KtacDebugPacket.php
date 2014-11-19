<?php

class KtacDebugPacket extends KtacPushPacket {
  
  public $packetName = "KtacDebugPacket";
  public $message;
  
  function __construct($message) {
    $this->message = "<pre>" . $message . "</pre>";
  }
}
