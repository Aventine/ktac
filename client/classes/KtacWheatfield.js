function KtacWheatfield() {
  
  this.type = "Wheatfield";
  KtacActor.call(this, this.type);
  
  this.className = "KtacWheatfield";
  
  this.location = {x: 2, y: 0, z: 2};
  this.scale = {x: 1, y: 1, z: 1};
  this.graphicsJson = KTAC_CLIENT_LINK + "assets/Wheat/wheat2.json";
  this.texture = KTAC_CLIENT_LINK + "assets/Wheat/head.png";
  
  this.blendAnims = [
      
  ];
  
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
  this.mesh = new THREE.SkinnedMesh( geometry, meshMaterial );


};

KtacWheatfield.prototype.onGraphicsReady = function() {
  KtacActor.prototype.onGraphicsReady.call(this);
  this.boundingBox.setScale({x: 0.8, y: 0.8, z: 0.8});
  this.boundingBox.setOffset({x: 0, y: 0.4, z: 0});
};
