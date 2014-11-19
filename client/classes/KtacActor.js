var INIT_STATE_UNLOADED = "unloaded"; // hasn't started loading yet
var INIT_STATE_LOADING = "loading"; // ajax call for model/geometry/materials .js was made, hasn't completed yet
var INIT_STATE_LOADED = "loaded"; // ajax call completed
var INIT_STATE_READY = "ready"; // all done and ready

// subclasses must call this.init() in their constructor

function KtacActor(name) {
  this.id = 1;
  this.type = 0;
	this.name = name;
	
	this.location = new KtacLocation(0,0,0,0);
	this.facingLongitude = 0; // in degrees
	this.speed = 0.1; // tiles per tick
	this.turnSpeed = 5; // degrees per tick
	
	this.actionQueue = new Array();
	this.mesh = null;
	this.boundingBox = null;
	this.graphicsJson = null;

	this.initState = INIT_STATE_UNLOADED;
	this.lookTarget = null; // for storing while loading mesh, and maybe later for tracking over time
	
	this.animations = new Array();
	this.blendAnims = new Array();
	
	this.bubble = new KtacBubble(this, "");
	//this.isMoving = false;
	//this.velocity = {x: 0, y: 0, z: 0}; // used for moving the mesh each frame between ticks
  this.goalLocation = null; // where this actor is trying to be
	this.meshGoalLocation = null; // where to move the mesh to each frame, to arrive at roughly the next tick
};

KtacActor.actorClassesByTypeId = new Array();

KtacActor.prototype.init = function() {
	if(this.graphicsJson != null) {
		var jsonLoader = new THREE.JSONLoader();

		//jsonLoader.load(this.json, self.jsonLoaderCallback, this.texture);
		this.initState = INIT_STATE_LOADING;
		jsonLoader.load(this.graphicsJson, KtacFunctions.createBoundedWrapper(this, this.graphicsJsonLoaderCallback));
	}
	
	scene1.actors.push(this);
	this.spawn();
};



KtacActor.prototype.graphicsJsonLoaderCallback = function(geometry, materials) {
	this.initState = INIT_STATE_LOADED;
	this.onGraphicsLoaded(geometry, materials);
	this.onGraphicsReady();
};

KtacActor.prototype.loadAnimations = function(geometryAnims) {

	for(var i in this.blendAnims) {
		var blendAnim = this.blendAnims[i];
		var anim = new THREE.Animation(this.mesh, geometryAnims[blendAnim.blendIndex]);
		this.animations[blendAnim.name] = anim;
	}
};

KtacActor.prototype.playAnimation = function(animName) {
	this.animations[animName].play();
};

KtacActor.prototype.setLocation = function(loc) {
	this.location = loc;
	
	if(this.initState != INIT_STATE_READY) {
		return;
	}
	
	this.mesh.position.x = loc.x;
	this.mesh.position.y = loc.y;
	this.mesh.position.z = loc.z;
	this.boundingBox.setLocation(loc);
};

KtacActor.prototype.setScale = function(sca) {
	this.scale = sca;
	
	if(this.initState != INIT_STATE_READY) {
		return;
	}
	
	this.mesh.scale.x = sca.x;
	this.mesh.scale.y = sca.y;
	this.mesh.scale.z = sca.z;
	//this.boundingBox.setLocation(loc);
};


// returns true if arrived, false if not there yet
KtacActor.prototype.moveToward = function(dest) {
	
	this.setLocation(this.location);
	
	dest.x = parseFloat(dest.x);
	dest.z = parseFloat(dest.z);
	
	if (this.speed <= 0) {
		return true; // bail out if we cannot move at all
	}
		
	var here = this.location;
	//var nextStep = {x: here.x, y: 0, z: here.z};
	//this.velocity = {x: 0, y: 0, z: 0};
	
	var nextStep = KtacFunctions.getStepToward(here, dest, this.speed);

	if (nextStep.x == dest.x && nextStep.z == dest.z) {
		this.animations["walk"].stop();
		this.animations["still"].play();
		this.meshGoalLocation = null;
		this.setLocation(dest);
		this.goalLocation = null;
		return true; // you have arrived.
	}

	
	
	this.lookAt(new THREE.Vector3(nextStep.x, nextStep.y, nextStep.z));
	this.location = nextStep;
	this.meshGoalLocation = nextStep;
	
	return false; // not there yet
};

KtacActor.prototype.tick = function() {
	if(this.initState == INIT_STATE_READY) {
		this.progressCurrentAction();
	}
};

KtacActor.prototype.queueAction = function(action) {
	
//	// don't queue a replicated action if we're already
//	// controlling the actor in a non-replicated way
//	if(action.isaReplication && this.actionQueue.length > 0) {
//		return;
//	}
//	
//	if(action.isaReplication) {
//		//log("clearing actionqueue and adding replication<br>");
//		//this.actionQueue = new Array();
//	}
	
	this.actionQueue.push(action);
};

KtacActor.prototype.progressCurrentAction = function() {
	if (this.actionQueue.length == 0)
		return null;
	var finished = false;

	var action = this.actionQueue[0];
	if (!action.started) {
		
//		if (action.goalLocation != null) {
//			var walk = this.animationMap.get({action: "walk", direction: this.facingDirection});
//			this.currentAnimation = walk;
//			
//			if(!action.isaReplication) {
//				var event = new Object();
//				event.type = "KtacActorMovePacket";
//				event.goalLocation = action.goalLocation;
//				sendEvent(event);
//			}
//		}
//		this.currentAnimation.start();
		
		if(action.goalLocation != null) {
			
			this.goalLocation = action.goalLocation;
			
			this.playAnimation("walk");
			//this.isMoving = true;
			
			
		}
		
		this.bubble.setHtml(this.name + "<br>" + action.name);
		
		if(!action.isaReplication) {
      this.save(); // to get this.goalLocation to other clients
    }
		
		action.started = true;
	}

	if (action.goalLocation != null) {
		var arrived = this.moveToward(action.goalLocation);
		if (arrived) {
			finished = true;
			//this.isMoving = false;
		}
	}

	if (action.remainingDuration > 0) {
		action.remainingDuration--;
		
		if (action.tickCallback != null) {
			action.tickCallback(this, action.duration - action.remainingDuration, action.duration);
		}
		
		if (action.remainingDuration <= 0) {
			finished = true;
		}
	}

	if (finished) {
		
		this.bubble.setHtml("");
		
//		var idle = this.animationMap.get({action: "idle", direction: this.facingDirection});
//		idle.start();
//		this.currentAnimation = idle;
		
		//this.sprite.startAnimation("idle");
		if (action.successCallback != null) {
			action.successCallback(this);
		}
//		log(this.name + " finished action '" + action.name + "'<br/>");
		this.actionQueue.shift();
		return true;
	}
	return false;
};

KtacActor.prototype.lookAt = function(target) {
	if(this.initState != INIT_STATE_READY) {
		this.lookTarget = target;
		return;
	}
	
	this.mesh.lookAt(target);
	
	//var axis = new THREE.Vector3(0,0,1);
	//this.boundingBox.mesh.up = axis;
	
	this.boundingBox.lookAt(target);
	
//	this.boundingBox.mesh.rotation.x = this.mesh.rotation.x;
//	this.boundingBox.mesh.rotation.y = this.mesh.rotation.y;
//	this.boundingBox.mesh.rotation.z = this.mesh.rotation.z;
	//this.boundingBox.mesh.updateMatrix();
};

//KtacActor.prototype.getMapTile = function() {
//	var mapTile = new Object();
//	mapTile.x = Math.round(this.location.x);
//	mapTile.y = Math.round(this.location.y);
//	return mapTile;
//};

// the ajax call for the graphics .js (mesh/geometry/materials) is done!
// Apply the KtacActor's properties to the mesh
KtacActor.prototype.onGraphicsLoaded = function(geometry, materials) {
	this.initState = INIT_STATE_LOADED;
	
	
	
	//this.loadAnimations(geometry.animations);
	//this.playAnimation("idle");
	
//	var idleAnimGeometry = geometry.animations[0];
//	var idleAnim = new THREE.Animation(this.mesh, idleAnimGeometry);
//	idleAnim.loop = true;
//	idleAnim.play();
	
	
	
	
	
	
	
};

KtacActor.prototype.onGraphicsReady = function() {
	
	this.mesh.actor = this;
	this.boundingBox = new KtacBoundingBox(this, {x: 0.5, y: 0.5, z: 0.5}, {x: 0, y: 0.25, z: 0}); // provide a default bounding box
	scene1.add(this.mesh);
	
	this.initState = INIT_STATE_READY;
	
	this.setLocation(this.location);
	this.setScale(this.scale);
	
	
	if(this.lookTarget != null) {
		this.lookAt(this.lookTarget);
	}
	
	var axis = new THREE.Vector3(0,1,0);
	this.mesh.up = axis;
};

KtacActor.prototype.spawn = function() {
	// nothing to do here yet (or at all?)
};

KtacActor.prototype.getUuid = function() {
	return this.mesh.uuid;
};

KtacActor.prototype.frame = function(delta) {
	
	this.bubble.updatePosition();
	this.moveMeshTowardGoalPerFrame(delta);
};

KtacActor.prototype.moveMeshTowardGoalPerFrame = function(delta) {
	if(this.meshGoalLocation == null) {
		return;	
	}
	
	var secondsUntilTick = SECONDS_PER_TICK - SECONDS_SINCE_TICK;
	if(secondsUntilTick <= 0) {
		return;
	}
	
	var percentToTravel = delta / secondsUntilTick;
	
	var nextStep = KtacFunctions.getPercentStepToward(this.mesh.position, this.meshGoalLocation, percentToTravel);

	if(this.mesh.position.x == this.meshGoalLocation.x &&
			this.mesh.position.y == this.meshGoalLocation.y &&
			this.mesh.position.z == this.meshGoalLocation.z) {
		this.meshGoalLocation = null;
		return;
	}
	
	this.mesh.position.x = nextStep.x;
	this.mesh.position.y = nextStep.y;
	this.mesh.position.z = nextStep.z;
};

KtacActor.prototype.showBubbleMessage = function(htmlMessage) {
	var action = new KtacAction(htmlMessage);
	action.setDuration(15);
	this.queueAction(action);
};

KtacActor.prototype.moveTo = function(loc) {
	var action = new KtacAction("Walking");
	action.setGoalLocation(loc);
	this.queueAction(action);
};

KtacActor.prototype.removeActor = function(actorToRemove) {
	
	if(actorToRemove == this) {
		this.showBubbleMessage("Dont erase yourself!");
		return;
	}
	
	if(!(actorToRemove instanceof KtacActor)) {
		this.showBubbleMessage("Cant erase that, not an actor.");
		return;
	}
	
	var goalLoc = {x: actorToRemove.location.x, y: 0, z: actorToRemove.location.z};
	this.moveTo(goalLoc);
	
	var action = new KtacAction("Erasing " + actorToRemove.name);
	action.setDuration(20); // in ticks
	action.setSuccessCallback(KtacFunctions.createBoundedWrapper({actorToRemove: actorToRemove}, function() {

		this.actorToRemove.queueDestructAction();
	}));
	this.queueAction(action);
	
};

KtacActor.prototype.queueDestructAction = function() {
	var action = new KtacAction("Bye-bye...");
	action.setDuration(20); // in ticks
	action.setSuccessCallback(function(actor) {
		
		actor.destruct();
	});
	this.queueAction(action);
};

KtacActor.prototype.destruct = function() {
	scene1.remove(this.mesh);
	KtacFunctions.removeFromArray(this, scene1.actors);
	this.boundingBox.destruct();
};

// create in database on server
KtacActor.prototype.save = function() {
  var packet = new KtacActorSavePacket(this);
  packet.send();
};

// static method
KtacActor.registerActorType = function(actorClass) {
  KtacActor.actorClassesByTypeId[actorClass.actorTypeId] = actorClass;
};

// static method
KtacActor.getActorClassFromTypeId = function(actorTypeId) {
  return KtacActor.actorClassesByTypeId[actorTypeId];
};