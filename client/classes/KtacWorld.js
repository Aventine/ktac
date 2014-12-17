function KtacWorld() {
  this.blocksByLocation = new Array();
  this.actorsById = new Array();
}

KtacWorld.prototype.addBlock = function(block) {
  var loc = block.location;
  
  if(this.blocksByLocation[loc.zone] == undefined) {
    this.blocksByLocation[loc.zone] = new Array();
  }
  if(this.blocksByLocation[loc.zone][loc.x] == undefined) {
    this.blocksByLocation[loc.zone][loc.x] = new Array();
  }
  if(this.blocksByLocation[loc.zone][loc.x][loc.y] == undefined) {
    this.blocksByLocation[loc.zone][loc.x][loc.y] = new Array();
  }
  
  if(this.blocksByLocation[loc.zone][loc.x][loc.y][loc.z] != undefined) {
    this.blocksByLocation[loc.zone][loc.x][loc.y][loc.z].destruct();
  }
  this.blocksByLocation[loc.zone][loc.x][loc.y][loc.z] = block;
};

KtacWorld.prototype.getBlock = function(loc) {
  if(this.blocksByLocation[loc.zone] == undefined) {
    return null;
  }
  if(this.blocksByLocation[loc.zone][loc.x] == undefined) {
    return null;
  }
  if(this.blocksByLocation[loc.zone][loc.x][loc.y] == undefined) {
    return null;
  }
  if(this.blocksByLocation[loc.zone][loc.x][loc.y][loc.z] == undefined) {
    return null;
  }
  return this.blocksByLocation[loc.zone][loc.x][loc.y][loc.z];
};

KtacWorld.prototype.setActor = function(actor) {
	if(actor.id == 0) {
		return;
	}
	
	this.actorsById[actor.id] = actor;
};

KtacWorld.prototype.removeActor = function(actor) {
	this.actorsById.splice(actor.id, 1);
};

KtacWorld.prototype.getActorById = function(id) {
	if(this.actorsById[id] == undefined) {
		return null;
	}
	return this.actorsById[id];
};