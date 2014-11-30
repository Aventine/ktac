// subclasses must call this.init() in their constructor

function KtacBlock(loc) {
  
  this.name = "Terrain Cube";
  
  
  if(loc == undefined) {
    loc = new KtacLocation(0, 0, 0, 0);
  }
  this.location = loc;
  
  this.scale = {x: 1, y: 1, z: 1};
  this.offset = {x: 0, y: -0.5, z: 0};
  this.texture = KTAC_CLIENT_LINK + "assets/Missing/missing.jpg";
  this.mesh = null;
  
  this.boundingBox = new KtacBoundingBox(this, {x: 1, y: 1, z: 1}, this.offset);
  
}

KtacBlock.blockClassesById = new Array();

KtacBlock.prototype.init = function() {
  
  var imgTexture = THREE.ImageUtils.loadTexture(this.texture);
  imgTexture.repeat.set(1, 1);
  imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
  imgTexture.anisotropy = 16;
  var shininess = 50, specular = 0x333333, bumpScale = 1, shading = THREE.SmoothShading;
  var material2 = new THREE.MeshLambertMaterial({
    map : imgTexture,
    color : 0x999999,
    ambient : 0x777777,
    shading : shading
  });
  
  var geometry = new THREE.BoxGeometry(this.scale.x, this.scale.y, this.scale.z);
  this.mesh = new THREE.Mesh(geometry, material2);
  this.mesh.actor = this;
  
  this.spawn();
};

KtacBlock.prototype.spawn = function() {
  
  if(shadowsOn) {
    this.mesh.receiveShadow = true;
  }
  
  scene1.add(this.mesh);
  this.mesh.position.x = this.location.x + this.offset.x;
  this.mesh.position.y = this.location.y + this.offset.y;
  this.mesh.position.z = this.location.z + this.offset.z;
};

KtacBlock.prototype.setType = function(classToUse, replicated) {
  
  var loc  = this.location.clone();
  loc.y = 0;
  
  if(replicated != true) {
    var packet = new KtacSetBlockPacket(loc, classToUse.getTypeId());
    packet.send();
  }
  
  if(replicated == true) {
    var newBlock = new classToUse(this.location);
    this.destruct();
  }
  
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

//static method
KtacBlock.getTypeId = function() {
  var blockTypeId = jQuery.inArray(this.className, KTAC_CONFIG.blockTypes);
  return blockTypeId;
};

//static method
KtacBlock.getClassByTypeId = function(blockTypeId) {
  var className = KTAC_CONFIG.blockTypes[blockTypeId];
  return KtacFunctions.getClassFromString(className); 
};