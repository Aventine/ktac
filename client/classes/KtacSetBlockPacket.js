// loc is a KtacLocation
function KtacSetBlockPacket(loc, blockId) {
  
  KtacPacket.call(this);
  
  this.content.type = "KtacSetBlockPacket";
  this.content.loc = loc;
  this.content.setTo = blockId;
  
} KtacSetBlockPacket.prototype = Object.create(KtacPacket.prototype);
