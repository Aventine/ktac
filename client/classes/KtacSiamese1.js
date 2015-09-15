function KtacSiamese1() {
  
	this.type = "Siamese1";
	
	KtacActor.call(this, this.type);
	
	this.className = "KtacSiamese1";
	
	//this.location = {x: 0, y: 0, z: 0};
	this.scale = {x: 1, y: 1, z: 1};
	this.graphicsJson = KTAC_CLIENT_LINK + "assets/Siamese1/catAnim_withwalk.js";
	this.texture = KTAC_CLIENT_LINK + "assets/Siamese1/cat_tex512.png";
	this.blendAnims = [
			new KtacBlendAnim(0, "idle", 20),
			new KtacBlendAnim(1, "walk", 40),
			new KtacBlendAnim(2, "still", 1)
	];
	
} KtacSiamese1.prototype = Object.create(KtacActor.prototype);

//KtacSiamese1.actorTypeId = 2;
//KtacSiamese1.actorTypeName = "KTAC_ACTORTYPE_SIAMESE";
//KtacActor.registerActorType(KtacSiamese1);

//KtacSiamese1.prototype.init = function() {
//	
//	var jsonLoader = new THREE.JSONLoader();
//
//		//jsonLoader.load(this.json, self.jsonLoaderCallback, this.texture);
//	jsonLoader.load(this.json, KtacFunctions.createBoundedWrapper(this, this.jsonLoaderCallback), this.texture);
//	
//	
//	
//
//}

KtacSiamese1.prototype.onGraphicsLoaded = function(geometry, materials) {
	
	KtacActor.prototype.onGraphicsLoaded.call(this, geometry, materials);

	var catTexture = THREE.ImageUtils.loadTexture(this.texture);
	var catMaterial = new THREE.MeshLambertMaterial({
		map : catTexture,
		color : 0x999999,
		ambient : 0x777777,
		shading : THREE.SmoothShading,
		skinning: true,
	});
	var mesh = new THREE.SkinnedMesh(geometry, catMaterial);
  var ktacMesh = new KtacMesh(this, mesh);
  this.meshGroup.addMesh(ktacMesh);

	ktacMesh.loadAnimations(geometry.animations, this.blendAnims);
	
	this.meshGroup.setBoundingBox(new THREE.Vector3(0.3, 0.4, 0.6), new THREE.Vector3(0, 0.25, 0));
};

KtacSiamese1.prototype.onGraphicsReady = function() {
	KtacActor.prototype.onGraphicsReady.call(this);
	
	
	this.meshGroup.playAnimation("idle");
	
	// this.boundingBox.setScale({x: 0.3, y: 0.4, z: 0.6});
	// this.boundingBox.setOffset({x: 0, y: 0.25, z: 0});
};

KtacSiamese1.prototype.plantTree = function() {
	var action = new KtacAction("Planting a Tree");
	//action.setAnimation("walk");
	action.setDuration(20); // in ticks
	action.setSuccessCallback(function(actor) {
		var tree = new KtacTree1("planted tree");
		var treeLocation = actor.location.clone();
		treeLocation.y = 0;
		tree.setLocation(treeLocation);
		tree.save();
		tree.growFromSmall();
		//tree.spawn();

	});
	this.queueAction(action);
};


KtacSiamese1.prototype.plantWheat = function() {
  var action = new KtacAction("Planting Wheat");
  //action.setAnimation("walk");
  action.setDuration(20); // in ticks
  action.setSuccessCallback(function(actor) {
    var wheatfield = new KtacWheatfield("planted wheat");
    var location = actor.location.clone();
    location.y = 0;
    wheatfield.setLocation(location);
    wheatfield.save();
    //wheatfield.growFromSmall();
    wheatfield.spawn();

  });
  this.queueAction(action);
};

KtacSiamese1.prototype.till = function(block) {
  
  if(!(block instanceof KtacBlock)) {
    this.showBubbleMessage("That's not a block, can't till");
    return;
  }
  
  var goalLoc = block.location.clone();
  goalLoc.y = 0;
  this.moveTo(goalLoc);
  
  var action = new KtacAction("Tilling");
  action.setDuration(10); // in ticks
  action.setSuccessCallback(KtacFunctions.createBoundedWrapper({block: block}, function() {
    block.setType(KtacDirtBlock);
  }));
  this.queueAction(action);
};

KtacSiamese1.prototype.setToGrass = function(block) {
  
  if(!(block instanceof KtacBlock)) {
    this.showBubbleMessage("That's not a block, can't till");
    return;
  }
  
  var goalLoc = block.location.clone();
  goalLoc.y = 0;
  this.moveTo(goalLoc);
  
  var action = new KtacAction("Planting Grass");
  action.setDuration(10); // in ticks
  action.setSuccessCallback(KtacFunctions.createBoundedWrapper({block: block}, function() {
    block.setType(KtacGrassBlock);
  }));
  this.queueAction(action);
};

KtacSiamese1.prototype.chopTree = function(tree) {
	
	if(!(tree instanceof KtacTree1)) {
		this.showBubbleMessage("That's not a tree!");
		return;
	}
	
	var goalLoc = tree.location.clone();
	goalLoc.y = 0;
	this.moveTo(goalLoc);
	
	var action = new KtacAction("Chopping a Tree");
	//action.setAnimation("walk");
	action.setDuration(20); // in ticks
	
	action.setSuccessCallback(KtacFunctions.createBoundedWrapper({tree: tree}, function() {
		this.tree.beChoppedDown();
	}));
	
	this.queueAction(action);
};