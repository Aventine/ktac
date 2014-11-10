function KtacLoadZonePacket(zone) {
  
  KtacPacket.call(this);
  
  this.content.type = "KtacLoadZonePacket";
  this.content.zone = zone;
  
} KtacLoadZonePacket.prototype = Object.create(KtacPacket.prototype);

KtacLoadZonePacket.prototype.send = function() {
  jQuery.post("/ktacAjax", {packet: JSON.stringify(this.content)}, function(response) {

    var blocks = response.blocks;

    for(var i in blocks) {
      var blockId = blocks[i].blocktype;
      var blockClass = KtacBlock.getBlockClassFromId(blockId);
      var blockLocation = new KtacLocation(blocks[i].zone, blocks[i].x, blocks[i].y, blocks[i].z);
      var block = new blockClass(blockLocation);
      world1.addBlock(block);
    } 
    
    // fill the empty areas with Undefined Blocks
    var zone = 0;
    var y = 0;
    for (var x = 0; x < WORLD_SIZE_X; x++) {
      for (var z = 0; z < WORLD_SIZE_Z; z++) {
        var loc = new KtacLocation(zone, x, y, z);
        if(world1.getBlock(loc) == null) {
          var block = new KtacUndefinedBlock(loc);
          world1.addBlock(block);
        }
      }
    } 
    
  }, "json");
};