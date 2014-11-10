function KtacWorld() {
  this.blocksByLocation = new Array();
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
