function KtacPacket() {
  this.content = new Object();
  this.content.type = "KtacPacket";
}

KtacPacket.prototype.send = function() {
  jQuery.post("/ktacAjax", {packet: JSON.stringify(this.content)}, function(response) {
    
    
    //ktacConsole.outputMessage("KtacPacket AJAX response: ");
    //for(var i in response) {
      //ktacConsole.outputMessage(response.toSource());
    //}
  }, "json");
};