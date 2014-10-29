function KtacPacket() {
  this.content = new Object();
  this.content.type = "KtacPacket";
}

KtacPacket.prototype.send = function() {
  jQuery.post("/ktacAjax", this.content, function(response) {
    
    
    console.outputMessage("KtacPacket AJAX response: ");
    //for(var i in response) {
      console.outputMessage(response.toSource());
    //}
  }, "json");
};