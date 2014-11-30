function KtacBoundingBox(actor, sca, offset) {
	this.name = "BoundingBox";
	this.actor = actor;
	this.opacity = 0;
	
	if(sca == undefined) {
		sca = {x: 0.5, y: 0.5, z: 0.5};
	}
	this.scale = sca;
	
	if(offset == undefined) {
		offset = {x: 0, y: 0, z: 0};
	}
	this.offset = offset;
	
	this.location = actor.location; //{x: 0, y: 0, z: 0};
	
	//this.texture = "assets/grass1goodtextures512.jpg";
	this.mesh = null;
	
	
	this.init();
	this.spawn();
}

KtacBoundingBox.prototype.init = function() {
	
	var imgTexture = THREE.ImageUtils.loadTexture(this.texture);
	imgTexture.repeat.set(4, 2);
	imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
	imgTexture.anisotropy = 16;
	var shininess = 50;
	var specular = 0x333333;
	var bumpScale = 1;
	var shading = THREE.SmoothShading;
	
	var material2 = new THREE.MeshLambertMaterial({
		//map : imgTexture,
		color : 0xff0000,
		ambient : 0xff5555,
		shading : shading,
		wireframe: true,
		transparent: true,
		opacity: this.opacity
	});
	

//	var materialPhong = new THREE.MeshPhongMaterial({
//		ambient : 0x030303,
//		color : 0xdddddd,
//		specular : 0x009900,
//		shininess : 30,
//		shading : THREE.FlatShading
//	});
	
	
	var geometry = new THREE.BoxGeometry(this.scale.x, this.scale.y, this.scale.z);
	this.mesh = new THREE.Mesh(geometry, material2);
	this.mesh.boundingBox = this;

};

KtacBoundingBox.prototype.spawn = function() {
	//var axis = new THREE.Vector3(0,0,1);
	//this.mesh.up = axis;
//	if(this.actor instanceof KtacActor) {
//		ktacConsole.outputMessage(this.location.x);
//	}
	
	scene1.add(this.mesh);
	scene1.boundingBoxes.push(this.mesh);
	this.setLocation(this.location);
};

KtacBoundingBox.prototype.setLocation = function(loc) {
	this.location = loc;

	this.mesh.position.x = parseFloat(this.location.x) + parseFloat(this.offset.x);
	this.mesh.position.y = parseFloat(this.location.y) + parseFloat(this.offset.y);
	this.mesh.position.z = parseFloat(this.location.z) + parseFloat(this.offset.z);
};

KtacBoundingBox.prototype.setOffset = function(offset) {
	this.offset = offset;
};

KtacBoundingBox.prototype.setScale = function(sca) {
	this.scale = sca;
	this.mesh.scale.x = this.scale.x;
	this.mesh.scale.y = this.scale.y;
	this.mesh.scale.z = this.scale.z;
};

KtacBoundingBox.prototype.lookAt = function(target) {
	var offsetTarget = target.clone();
	offsetTarget.y = this.mesh.position.y;
	
	//var axis = new THREE.Vector3(0,0,1);
	//this.mesh.up = axis;
	
	
	//this.mesh.rotation.x = 0;
	//this.mesh.rotation.y = 0;
	//this.mesh.rotation.z = 0;
	
	this.mesh.lookAt(offsetTarget);
	
	//var axis = new THREE.Vector3(0,0,1);
	//this.mesh.up = axis;
	
//	this.boundingBox.mesh.rotation.x = this.mesh.rotation.x;
//	this.boundingBox.mesh.rotation.y = this.mesh.rotation.y;
//	this.boundingBox.mesh.rotation.z = this.mesh.rotation.z;
	//this.boundingBox.mesh.updateMatrix();
};

KtacBoundingBox.prototype.destruct = function() {
	scene1.remove(this.mesh);
	KtacFunctions.removeFromArray(this.mesh, scene1.boundingBoxes);
};