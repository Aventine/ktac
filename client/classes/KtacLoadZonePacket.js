function KtacLoadZonePacket(zone) {
  
  KtacPacket.call(this);
  
  this.type = "KtacLoadZonePacket";
  this.content.zoneId = zone;
  this.responseCallback = this.populate;
  
} KtacLoadZonePacket.prototype = Object.create(KtacPacket.prototype);

KtacLoadZonePacket.prototype.populate = function(response) {
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
  
  var serverActors = response.actors;
  var assignedPlayerActor = false;
  for (i in serverActors) {
    var actor = new KtacSiamese1();
    var serverLoc = serverActors[i].location;
    actor.setLocation(new KtacLocation(serverLoc.zone, serverLoc.x, serverLoc.y, serverLoc.z));
    if(!assignedPlayerActor) {
      playerActor = actor;
      assignedPlayerActor = true;
    }
  }
};