function KtacBlock(loc) {
  KtacActor.call(this);
  
  this.name = "Default Block";
  this.scale = new THREE.Vector3(1, 1, 1);
  this.offset = new THREE.Vector3(0, -0.5, 0);
  this.texture = KTAC_CLIENT_LINK + "assets/Missing/missing.jpg";
  this.graphicsJson = false;
  
  if(loc == undefined) {
    loc = new KtacLocation(0, 0, 0, 0);
  }
  this.location = loc;

  this.meshGroup.setBoundingBox(this.scale, this.offset);


} KtacBlock.prototype = Object.create(KtacActor.prototype);

KtacBlock.blockClassesById = new Array();

KtacBlock.prototype.spawn = function() {
  KtacActor.prototype.spawn.call(this);
  
  world1.addBlock(this);
};

KtacBlock.prototype.onGraphicsLoaded = function(geometry, materials) {
  KtacActor.prototype.onGraphicsLoaded.call(this, geometry, materials);
  
  var imgTexture = THREE.ImageUtils.loadTexture(this.texture);
  imgTexture.repeat.set(1, 1);
  imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
  imgTexture.anisotropy = 16;
  var shininess = 50, specular = 0x333333, bumpScale = 1, shading = THREE.FlatShading;
  var material2 = new THREE.MeshLambertMaterial({
    map : imgTexture,
    color : 0x999999,
    ambient : 0x777777,
    shading : shading
  });
  
  var geometry = new THREE.BoxGeometry(this.scale.x, this.scale.y, this.scale.z);
  var mesh = new THREE.Mesh(geometry, material2);
  var ktacMesh = new KtacMesh(this, mesh);
  ktacMesh.setLocationOffset(this.offset);
  this.meshGroup.addMesh(ktacMesh);
};

KtacBlock.prototype.setType = function(classToUse) {
  
  var loc  = this.location.clone();
  loc.y = 0;
  

	var instanceOfClass = new classToUse();
  var packet = new KtacSetBlockPacket(loc, instanceOfClass.getTypeId());
  packet.send();

};

KtacBlock.prototype.setTypeReplicated = function(classToUse) {
  
  var loc  = this.location.clone();
  loc.y = 0;
  
  if(replicated != true) {
  var instanceOfClass = new classToUse();
    var packet = new KtacSetBlockPacket(loc, instanceOfClass.getTypeId());
    packet.send();
  }
  
  var newBlock = new classToUse(this.location);
  this.destruct();
  newBlock.spawn();
};

KtacBlock.prototype.destruct = function() {
  scene1.remove(this.mesh);
  //KtacFunctions.removeFromArray(this, scene1.actors);
  this.boundingBox.destruct();
};
/*
// static method
KtacBlock.registerBlockType = function(blockClass) {
  KtacBlock.blockClassesById[blockClass.blockId] = blockClass;
};

// static method
KtacBlock.getBlockClassFromId = function(blockId) {
  return KtacBlock.blockClassesById[blockId];
};
*/

KtacBlock.prototype.getTypeId = function() {
  var blockTypeId = jQuery.inArray(this.className, KTAC_CONFIG.blockTypes);
  return blockTypeId;
};

//static method
KtacBlock.getClassByTypeId = function(blockTypeId) {
  var className = KTAC_CONFIG.blockTypes[blockTypeId];
  return KtacFunctions.getClassFromString(className); 
};