<?php

class KtacPushPacket {
   public $packetName = "KtacPushPacket";
   
   
   function send() {
     nodejs_send_channel_message("ktacChannel", $this->packetName, json_encode($this));
   }
}
