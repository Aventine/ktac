function KtacMeshGroup(actor) {
  this.actor = actor;
  this.meshes = new Array();
  this.boundingBox = null; // reference to element in this.meshes
  this.lookTarget = null;
};

KtacMeshGroup.prototype.setBoundingBox = function(scale, offset) {
  this.boundingBox = new KtacBoundingBox(this.actor, scale, offset);
  this.addMesh(this.boundingBox);
};

KtacMeshGroup.prototype.getBoundingBox = function() {
  return this.boundingBox;
};

KtacMeshGroup.prototype.addMesh = function(mesh) {
  this.meshes.push(mesh);
};

KtacMeshGroup.prototype.lookAt = function(target) {
  if(this.actor.initState != INIT_STATE_READY) {
    this.lookTarget = target;
    return;
  }
  
  for(var i in this.meshes) {
    this.meshes[i].lookAt(target);
  }
};

KtacMeshGroup.prototype.setLocation = function(loc) {
  for(var i in this.meshes) {
    this.meshes[i].setLocation(loc);
  }
};

KtacMeshGroup.prototype.setScale = function(sca) {
  for(var i in this.meshes) {
    this.meshes[i].setScale(sca);
  }
};

KtacMeshGroup.prototype.onGraphicsReady = function() {
  for(var i in this.meshes) {
    this.meshes[i].onGraphicsReady();
  }
};

KtacMeshGroup.prototype.colorize = function(color) {
  for(var i in this.meshes) {
    this.meshes[i].colorize(color);
  }
};

KtacMeshGroup.prototype.playAnimation = function(animation) {
  for(var i in this.meshes) {
    this.meshes[i].playAnimation(animation);
  }
};

KtacMeshGroup.prototype.stopAnimation = function(animation) {
  for(var i in this.meshes) {
    this.meshes[i].stopAnimation(animation);
  }
};

KtacMeshGroup.prototype.destruct = function(animation) {
  for(var i in this.meshes) {
    this.meshes[i].destruct();
  }
};

KtacMeshGroup.prototype.getUuid = function() {
  return this.boundingBox.getUuid();
};