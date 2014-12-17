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
    var blockClass = KtacFunctions.getClassFromString(KTAC_CONFIG.blockTypes[blockId]);
    var blockLocation = new KtacLocation(blocks[i].zone, blocks[i].x, blocks[i].y, blocks[i].z);
    var block = new blockClass(blockLocation);
    block.spawn();
  } 
  
  // fill the empty areas with Undefined Blocks
  var zone = 0;
  var y = 0;
  for (var x = 0; x < WORLD_SIZE_X; x++) {
    for (var z = 0; z < WORLD_SIZE_Z; z++) {
      var loc = new KtacLocation(zone, x, y, z);
      if(world1.getBlock(loc) == null) {
        var block = new KtacUndefinedBlock(loc);
        block.spawn();
      }
    }
  }
  
  var serverActors = response.actors;
  var assignedPlayerActor = false;
  for (i in serverActors) {
    var actorClass = KtacActor.getClassByTypeId(serverActors[i].type);
    var actor = new actorClass();
    actor.id = serverActors[i].id;
    var serverLoc = serverActors[i].location;
    actor.setLocation(new KtacLocation(serverLoc.zone, serverLoc.x, serverLoc.y, serverLoc.z));
    world1.setActor(actor);
    if(!assignedPlayerActor && actor instanceof KtacSiamese1) {
      playerActor = actor;
      assignedPlayerActor = true;
    }
  }
};