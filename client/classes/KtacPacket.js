function KtacPacket() {
  this.content = new Object();
  this.type = "KtacPacket";
  this.responseCallback = this.defaultResponseCallback;
}

KtacPacket.prototype.send = function() {
  jQuery.post("/ktacAjax", {packetType: this.type, packetContent: JSON.stringify(this.content)}, this.responseCallback, "json");
};

KtacPacket.prototype.defaultResponseCallback = function(response) {
  // to make your own packet have a response callback,
  // implement a function like here and set this.responseCallback to it
};
