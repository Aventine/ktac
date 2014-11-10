var clock = new THREE.Clock();
var scene1 = new THREE.Scene();
scene1.boundingBoxes = new Array(); // Array of BoundingBox meshes (not BoundingBox itself)
scene1.actors = new Array(); // Array of Actors
var projector = new THREE.Projector(); // for detecting mouseover of 3d objects
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = -2;
camera.position.y = 3;
camera.position.z = -2;
//camera.rotation.y = 0.5;
//var axis = new THREE.Vector3(0,1,1);
//camera.rotateOnAxis(axis, THREE.Math.degToRad(90));
var renderer = new THREE.WebGLRenderer({ alpha: true });

var mouse = new Object();
var isMouseContextMenuOpen = false;
var controls;
var KTAC_HIGHLIGHTED_ACTOR = null;
var TICKS_PER_SECOND = 10;
var SECONDS_PER_TICK = 1 / TICKS_PER_SECOND;
var SECONDS_SINCE_TICK = 0;
//var SECONDS_FROM_FRAME_TO_LAST_TICK = 0;
var KTAC_HIGHLIGHT_COLOR = 0xffff00;
var shadowsOn = false;
//var SHADOW_MAP_WIDTH = 2048;
//var SHADOW_MAP_HEIGHT = 1024;

var WORLD_SIZE_X = 16;
var WORLD_SIZE_Z = 16;

var world1 = new KtacWorld();

var ktacConsole = new KtacConsole();



jQuery(document).ready(function() {
  ktacConsole.init();
	

	renderer.setSize(window.innerWidth, window.innerHeight);
	
	if(shadowsOn) {
		renderer.shadowMapEnabled = true;
		renderer.shadowMapType = THREE.PCFShadowMap;
	}
	
	
	document.body.appendChild(renderer.domElement);

	
	$packet = new KtacLoadZonePacket(0);
	$packet.send();
	
	//var cube1 = new KtacGrassBlock();
	/*var tiles = new Array();
	for (x = 0; x < WORLD_SIZE_X; x++) {
		for (z = 0; z < WORLD_SIZE_Z; z++) {
			//tiles.push(new KtacUndefinedBlock(new KtacLocation(0, x, -0.5, z)));
		}
	} */
	
	
	var siamese1 = new KtacSiamese1();

	var tree1 = new KtacTree1();
	//tree1.setLocation({ x: 2, y: 0, z: 2 });
	//var tree2 = new KtacTree1();
	//tree1.setLocation({ x: 3, y: 0, z: 1 });
	
	
	
	scene1.add(new THREE.AmbientLight(0x999999));
	var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(-100, 100, -100).normalize();
	
	if(shadowsOn) {
		directionalLight.castShadow = true;

		//directionalLight.shadowCameraNear = 1000;
		//directionalLight.shadowCameraFar = 2500;
		//directionalLight.shadowCameraFov = 50;

		directionalLight.shadowCameraVisible = true;

		
		
		//directionalLight.shadowBias = 0.0001;
		//directionalLight.shadowDarkness = 0.5;

		//directionalLight.shadowMapWidth = SHADOW_MAP_WIDTH;
		//directionalLight.shadowMapHeight = SHADOW_MAP_HEIGHT;
		
		directionalLight.shadowCameraRight     =  500;
		directionalLight.shadowCameraLeft     = -500;
		directionalLight.shadowCameraTop      =  500;
		directionalLight.shadowCameraBottom   = -500;

	}
	
	scene1.add(directionalLight);
	
	controls = new KtacCameraControls(camera, jQuery("canvas")[0], new THREE.Vector3(0, 1, 0));
	
	
	
	
	
	//animate();
	//tickLoop();
	frameLoop();
	
	jQuery("canvas").mousemove(function(event) {
		mouse.x = event.pageX;
		mouse.y = event.pageY;
	});
	
	jQuery("canvas").mousedown(function(event) {
		
		if(event.which == 3) { // if it was the right mouse button
			isMouseContextMenuOpen = false; // unfreeze selecting momentarily in the event that the menu was open from something else having been right-clicked
			KtacHighlight.highlightMouseover();
			isMouseContextMenuOpen = true;
			jQuery("#mouseContextMenu").css("left", mouse.x).css("top", mouse.y).removeClass("hidden");
		}
		
		if(event.which == 1) { // left mouse button
			isMouseContextMenuOpen = false;
			jQuery("#mouseContextMenu").addClass("hidden");
		}
	});
	

	jQuery("#mouseContextMenu").bind("contextmenu", function(event) { return false; });
	
	
	jQuery("canvas").mouseout(function() {
		jQuery("#mouseContextInfo").addClass("hidden");
	});
	jQuery("canvas").mouseover(function() {
		jQuery("#mouseContextInfo").removeClass("hidden");
	});
	
	jQuery("#mouseContextMenu .moveHere").click(function() {
		jQuery("#mouseContextMenu").addClass("hidden");
		isMouseContextMenuOpen = false;
		var goalLoc = {x: KTAC_HIGHLIGHTED_ACTOR.location.x, y: 0, z: KTAC_HIGHLIGHTED_ACTOR.location.z};
		siamese1.moveTo(goalLoc);
	});
	jQuery("#mouseContextMenu .plantTreeHere").click(function() {
		jQuery("#mouseContextMenu").addClass("hidden");
		isMouseContextMenuOpen = false;
		var goalLoc = {x: KTAC_HIGHLIGHTED_ACTOR.location.x, y: 0, z: KTAC_HIGHLIGHTED_ACTOR.location.z};
		siamese1.moveTo(goalLoc);
		siamese1.plantTree();
	});
	jQuery("#mouseContextMenu .removeActor").click(function() {
		jQuery("#mouseContextMenu").addClass("hidden");
		isMouseContextMenuOpen = false;
		
		if(KTAC_HIGHLIGHTED_ACTOR == siamese1) {
			siamese1.showBubbleMessage("Dont erase yourself!");
			return;
		}
		
		var goalLoc = {x: KTAC_HIGHLIGHTED_ACTOR.location.x, y: 0, z: KTAC_HIGHLIGHTED_ACTOR.location.z};
		siamese1.moveTo(goalLoc);
		siamese1.removeActor(KTAC_HIGHLIGHTED_ACTOR);
		
	});
	
	jQuery("#mouseContextMenu .tillHere").click(function() {
    jQuery("#mouseContextMenu").addClass("hidden");
    isMouseContextMenuOpen = false;

    siamese1.till(KTAC_HIGHLIGHTED_ACTOR);
  });
  
  jQuery("#mouseContextMenu .plantGrassHere").click(function() {
    jQuery("#mouseContextMenu").addClass("hidden");
    isMouseContextMenuOpen = false;

    siamese1.setToGrass(KTAC_HIGHLIGHTED_ACTOR);
  });
	
});




function tickLoop() {
	for(var i = 0; i < scene1.actors.length; i++) {
		scene1.actors[i].tick();
	}
	/*if(KTAC_HIGHLIGHTED_ACTOR != null) {
		controls.lookAt(KTAC_HIGHLIGHTED_ACTOR.mesh.position);
	}*/
	
	SECONDS_SINCE_TICK = 0;
	//SECONDS_FROM_FRAME_TO_LAST_TICK = clock.getDelta();
	//setTimeout(tickLoop, 1000 / TICKS_PER_SECOND);
	
	//console.outputMessage("testing KtacConsole on tick");
}

function frameLoop() {
		requestAnimationFrame( frameLoop );
		
		var delta = clock.getDelta();
		SECONDS_SINCE_TICK += delta;
		if(SECONDS_SINCE_TICK > SECONDS_PER_TICK) {
			SECONDS_SINCE_TICK = 0;
			tickLoop();
			//delta += SECONDS_FROM_FRAME_TO_LAST_TICK;
		}

		THREE.AnimationHandler.update( delta * 20 );
		
		controls.update(delta);
		
		renderer.render(scene1, camera);
		
		KtacHighlight.highlightMouseover();
		
		for(var i = 0; i < scene1.actors.length; i++) {
			scene1.actors[i].frame(delta);
		}
}

Drupal.Nodejs.callbacks.ktacPushPacket = {
  callback: function(message) {
    
    switch(message.data.subject) {
    
      case "KtacSetBlockPacket" :
        ktacConsole.outputMessage("recieved KtacSetBlockPacket");
        var packet = jQuery.parseJSON(message.data.body);
        var blockClass = KtacBlock.getBlockClassFromId(packet.setTo);
        block = world1.getBlock(packet.loc);
        if(block == null) {
          
          var block = new blockClass(packet.loc);
          world1.addBlock(block);
        } else {
          block.setType(blockClass, true);
        }
        break;
        
      case "KtacActorMovePacket" :
        ktacConsole.outputMessage("recieved KtacActorMovePacket stub");
        // var packet = message.data.body;
        // var action = new KtacAction("moveTo");
        // action.setAnimation("walk");
        // action.setGoalLocation(packet.goalLocation);
        // action.isaReplication = true;
        // controlledActor.queueAction(action);
        break;
        
      default:
        throw new Error("unknown packet recieved from server");
    }
  }
};





