function KtacWheatfield() {
  KtacActor.call(this);
  
  this.numStalks = 100;
  
  this.className = "KtacWheatfield";
  this.name = "Wheatfield";

  this.graphicsJson = KTAC_CLIENT_LINK + "assets/Wheat/wheat2.json";
  this.texture = KTAC_CLIENT_LINK + "assets/Wheat/head.png";
  
  this.meshGroup.setBoundingBox(new THREE.Vector3(0.4, 0.8, 0.4), new THREE.Vector3(0, 0.4, 0));
  
} KtacWheatfield.prototype = Object.create(KtacActor.prototype);



KtacWheatfield.prototype.onGraphicsLoaded = function(geometry, materials) {
  
  KtacActor.prototype.onGraphicsLoaded.call(this, geometry, materials);


  var texture2 = THREE.ImageUtils.loadTexture(this.texture);//, undefined);
  //texture2.repeat.set(16,16);
  texture2.wrapS = THREE.RepeatWrapping;
  texture2.wrapT = THREE.RepeatWrapping;
  var material = new THREE.MeshLambertMaterial({
      map : texture2,
      color : 0xC9AF38,
      ambient : 0xaaaaaa,
      shading : THREE.SmoothShading,
      //skinning: true,
      //wireframe: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
    });
  materials = new Array();
  materials[0] = material;
  materials[1] = material;
  
  var meshMaterial = new THREE.MeshFaceMaterial(materials);
  var mesh = new THREE.SkinnedMesh( geometry, meshMaterial );
  //this.mesh = mesh;

  var ktacMesh = new KtacMesh(this, mesh);
  this.meshGroup.addMesh(ktacMesh);

  // additional randomly placed meshes
  for (var i = 0; i < this.numStalks; i++) {
    var offsetX = Math.random() * 0.8 - 0.4;
    var offsetY = 0 - Math.random() * 0.2;
    var offsetZ = Math.random() * 0.8 - 0.4;
    var offsetPosition = new THREE.Vector3(offsetX, offsetY, offsetZ);
    var anotherMesh = new THREE.SkinnedMesh( geometry, meshMaterial );
    var anotherKtacMesh = new KtacMesh(this, anotherMesh);
    anotherKtacMesh.setLocationOffset(offsetPosition);
    
    // rotate the stalk to face outward from the center
    var theta = Math.atan2(offsetZ, offsetX); 
    anotherKtacMesh.setlongitudeOffset(THREE.Math.radToDeg(theta));
    
    this.meshGroup.addMesh(anotherKtacMesh);
  }

};

/*KtacWheatfield.prototype.onGraphicsReady = function() {
  KtacActor.prototype.onGraphicsReady.call(this);

  
};*/
