function KtacPacket() {
  this.content = new Object();
  this.type = "KtacPacket";
  this.responseCallback = this.defaultResponseCallback;
  this.timestamp = null; // this is set by KtacPacketQueue at the moment the packet is sent
  this.socketId = null;
}

KtacPacket.prototype.send = function() {
  //jQuery.post("/ktacAjax", {packetType: this.type, packetContent: JSON.stringify(this.content)}, this.responseCallback, "json");
  ktacPacketQueue.send(this);
};

KtacPacket.prototype.defaultResponseCallback = function(response) {
  // to make your own packet have a response callback,
  // implement a function like here and set this.responseCallback to it
};
