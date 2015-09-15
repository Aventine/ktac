function KtacBoundingBox(actor, sca, offset) {
  KtacMesh.call(this, actor, null);
  
  this.className = "KtacBoundingBox";
	this.opacity = 1;
	this.isBoundingBox = true;

	this.graphicsJson = false;
	
	if(sca == undefined) {
		sca = new THREE.Vector3(0.5, 0.5, 0.5);
	}
	this.scale = sca;
	
	if(offset == undefined) {
		offset = new THREE.Vector3(0, 0, 0);
	}
	this.locationOffset = offset;
	
	this.location = actor.location;
	
  var shading = THREE.SmoothShading;
  
  var material2 = new THREE.MeshLambertMaterial({
    color : 0xff0000,
    ambient : 0xff5555,
    shading : shading,
    wireframe: true,
    transparent: true,
    opacity: this.opacity
  });
  
  
  var geometry = new THREE.BoxGeometry(this.scale.x, this.scale.y, this.scale.z);
  this.mesh = new THREE.Mesh(geometry, material2);
  this.mesh.boundingBox = this;
	
	scene1.boundingBoxes.push(this.mesh);
	
} KtacBoundingBox.prototype = Object.create(KtacMesh.prototype);

// KtacBoundingBox.prototype.spawn = function() {
	// //var axis = new THREE.Vector3(0,0,1);
	// //this.mesh.up = axis;
// //	if(this.actor instanceof KtacActor) {
// //		ktacConsole.outputMessage(this.location.x);
// //	}
// 	
	// scene1.add(this.mesh);
// 	
	// this.setLocation(this.location);
// };

// KtacBoundingBox.prototype.setLocation = function(loc) {
	// this.location = loc;
// 
	// this.mesh.position.x = parseFloat(this.location.x) + parseFloat(this.offset.x);
	// this.mesh.position.y = parseFloat(this.location.y) + parseFloat(this.offset.y);
	// this.mesh.position.z = parseFloat(this.location.z) + parseFloat(this.offset.z);
// };

// KtacBoundingBox.prototype.setOffset = function(offset) {
	// this.offset = offset;
// };

// KtacBoundingBox.prototype.setScale = function(sca) {
	// this.scale = sca;
	// this.mesh.scale.x = this.scale.x;
	// this.mesh.scale.y = this.scale.y;
	// this.mesh.scale.z = this.scale.z;
//};

// KtacBoundingBox.prototype.lookAt = function(target) {
	// var offsetTarget = target.clone();
	// offsetTarget.y = this.mesh.position.y;
// 	
	// //var axis = new THREE.Vector3(0,0,1);
	// //this.mesh.up = axis;
// 	
// 	
	// //this.mesh.rotation.x = 0;
	// //this.mesh.rotation.y = 0;
	// //this.mesh.rotation.z = 0;
// 	
	// this.mesh.lookAt(offsetTarget);
// 	
	// //var axis = new THREE.Vector3(0,0,1);
	// //this.mesh.up = axis;
// 	
// //	this.boundingBox.mesh.rotation.x = this.mesh.rotation.x;
// //	this.boundingBox.mesh.rotation.y = this.mesh.rotation.y;
// //	this.boundingBox.mesh.rotation.z = this.mesh.rotation.z;
	// //this.boundingBox.mesh.updateMatrix();
// };
// 
KtacBoundingBox.prototype.destruct = function() {
	KtacMesh.prototype.destruct.call(this);
	
	KtacFunctions.removeFromArray(this.mesh, scene1.boundingBoxes);
};