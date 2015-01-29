function KtacTree1() {

	this.type = "Tree1";
	KtacActor.call(this, this.type);
	
	this.className = "KtacTree1";

	
	this.location = {x: 2, y: 0, z: 2};
	this.scale = {x: 0.5, y: 0.5, z: 0.5};
	this.saplingScale = {x: 0.01, y: 0.01, z: 0.01};
	this.graphicsJson = KTAC_CLIENT_LINK + "assets/Tree2/tree2.js";
	this.barkTextureFile = KTAC_CLIENT_LINK + "assets/Tree2/Tree Bark Tiled.png";
	this.leavesTextureFile = KTAC_CLIENT_LINK + "assets/Tree2/Tree\ Leaves.png";
	this.blendAnims = [
			
	];
	
	this.fullsizeTreeScale = {x: this.scale.x, y: this.scale.y, z: this.scale.z};
	
} KtacTree1.prototype = Object.create(KtacActor.prototype);

KtacTree1.prototype.onGraphicsLoaded = function(geometry, materials) {
	
	KtacActor.prototype.onGraphicsLoaded.call(this, geometry, materials);
	
	var leavesTexture = THREE.ImageUtils.loadTexture(this.leavesTextureFile);
	var leavesMaterial = new THREE.MeshLambertMaterial({
		map : leavesTexture,
		color : 0x999999,
		ambient : 0x777777,
		shading : THREE.SmoothShading,
		//skinning: true,
		transparent: true,
		alphaTest: 0.5,
	});
	materials[0] = leavesMaterial;

	var barkTexture = THREE.ImageUtils.loadTexture(this.barkTextureFile);
	barkTexture.repeat.set(16,16);
	barkTexture.wrapS = THREE.RepeatWrapping;
	barkTexture.wrapT = THREE.RepeatWrapping;
	var barkMaterial = new THREE.MeshLambertMaterial({
		map : barkTexture,
		color : 0x999999,
		ambient : 0x777777,
		shading : THREE.SmoothShading,
		//skinning: true,
		//transparent: true,
		//alphaTest: 0.5,
	});
	materials[1] = barkMaterial;
	
	var materialTree = new THREE.MeshFaceMaterial(materials);
	this.mesh = new THREE.SkinnedMesh(geometry, materialTree);
	
	
	
};

KtacTree1.prototype.onGraphicsReady = function() {
	KtacActor.prototype.onGraphicsReady.call(this);
	this.boundingBox.setScale({x: 0.8, y: 0.8, z: 0.8});
	this.boundingBox.setOffset({x: 0, y: 0.4, z: 0});
};



KtacTree1.prototype.growFromSmall = function() {
	var growthDuration = 400; // in ticks
	
	this.setScale(this.saplingScale);
	
	var fullsizeTreeScale = this.scale;
	var action = new KtacAction("Growing Up From Small");
	
	action.setDuration(growthDuration); // in ticks
	action.setTickCallback(function(tree, progressedTicks, totalTicks) {

		var percentThrough = progressedTicks / totalTicks;
		var totalGrowth = {
			x: tree.fullsizeTreeScale.x - tree.saplingScale.x,
			y: tree.fullsizeTreeScale.y - tree.saplingScale.y,
			z: tree.fullsizeTreeScale.z - tree.saplingScale.z,
		};
		var currentScale = {
			x: tree.saplingScale.x + percentThrough * totalGrowth.x,
			y: tree.saplingScale.y + percentThrough * totalGrowth.y,
			z: tree.saplingScale.z + percentThrough * totalGrowth.z,
		};
		tree.setScale(currentScale);
	});
	
	action.setSuccessCallback(function(tree) {
		tree.setScale(tree.fullsizeTreeScale);
	});
	
	this.queueAction(action);
};

KtacTree1.prototype.beChoppedDown = function() {
	var action = new KtacAction("pretend to fall over");
	action.setDuration(20);
	
	action.setSuccessCallback(function(tree) {
		var loc = tree.location.clone();
		tree.destruct();
		var logPile = new KtacLogpile();
		logPile.setLocation(loc);
		logPile.save();
	});
	
	this.queueAction(action);
	
};