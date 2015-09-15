function KtacLogpile() {
  
	this.type = "Logpile";
	KtacActor.call(this, this.type);
	
	this.className = "KtacLogpile";
	
	this.location = {x: 4, y: 0, z: 4};
	this.scale = {x: 1, y: 1, z: 1};
	this.graphicsJson = KTAC_CLIENT_LINK + "assets/Logpile/logpile.json";
	this.texture = KTAC_CLIENT_LINK + "assets/Logpile/bark.jpg";
	
	this.meshGroup.setBoundingBox(new THREE.Vector3(0.8, 0.8, 0.8), new THREE.Vector3(0, 0.4, 0));
	
	this.blendAnims = [
			
	];
	
} KtacLogpile.prototype = Object.create(KtacActor.prototype);

KtacLogpile.prototype.onGraphicsLoaded = function(geometry, materials) {
	
	KtacActor.prototype.onGraphicsLoaded.call(this, geometry, materials);


	var texture2 = THREE.ImageUtils.loadTexture(this.texture);//, new THREE.UVMapping());
	//texture2.repeat.set(16,16);
	texture2.wrapS = THREE.RepeatWrapping;
	texture2.wrapT = THREE.RepeatWrapping;
	var material = new THREE.MeshLambertMaterial({
			map : texture2,
			color : 0x999999,
			ambient : 0x777777,
			shading : THREE.SmoothShading,
			//skinning: true,
	    //wireframe: true,
		});
	
	var mesh = new THREE.Mesh( geometry, material );
	this.meshGroup.addMesh(new KtacMesh(this, mesh));


};

// KtacLogpile.prototype.onGraphicsReady = function() {
	// KtacActor.prototype.onGraphicsReady.call(this);
	// this.boundingBox.setScale({x: 0.8, y: 0.8, z: 0.8});
	// this.boundingBox.setOffset({x: 0, y: 0.4, z: 0});
// };


