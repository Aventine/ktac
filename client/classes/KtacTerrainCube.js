// subclasses must call this.init() in their constructor

function KtacTerrainCube(loc) {
  
  this.name = "Terrain Cube";
  
  if(loc == undefined) {
    loc = {x: 0, y: 0, z: -0.5};
  }
  this.location = loc;
  
  this.scale = {x: 1, y: 1, z: 1};
  this.texture = KTAC_CLIENT_LINK + "assets/Missing/missing.jpg";
  this.mesh = null;
  
  this.boundingBox = new KtacBoundingBox(this, {x: 1, y: 1, z: 1}, {x: 0, y: 0, z: 0});
  
}

KtacTerrainCube.prototype.init = function() {
  
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

KtacTerrainCube.prototype.spawn = function() {
  
  if(shadowsOn) {
    this.mesh.receiveShadow = true;
  }
  
  scene1.add(this.mesh);
  this.mesh.position.x = this.location.x;
  this.mesh.position.y = this.location.y;
  this.mesh.position.z = this.location.z;
};

KtacTerrainCube.prototype.setType = function(classToUse) {
  
  var newBlock = new classToUse(this.location);
  this.destruct();
};

KtacTerrainCube.prototype.destruct = function() {
  scene1.remove(this.mesh);
  //KtacFunctions.removeFromArray(this, scene1.actors);
  this.boundingBox.destruct();
};