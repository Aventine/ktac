function KtacMesh(actor, mesh) {
  this.className = "KtacMesh";
  
  this.actor = actor;
  this.location = new KtacLocation();
  this.locationOffset = new THREE.Vector3(0,0,0);
  this.scale = null;
  this.facingLongitudeOffset = 0; // in degrees, clockwise
  this.mesh = mesh;
  //this.graphicsJson = null;
  this.animations = new Array();
  //this.blendAnims = new Array();
  this.lookTarget = null;
  
  this.isColorized = false;
  this.originalColors = new Array();
};

/*KtacMesh.prototype.onGraphicsLoaded = function(geometry, materials) {
  
};*/

KtacMesh.prototype.setLocationOffset = function(vector3) {
  this.locationOffset = vector3;
};

KtacMesh.prototype.setlongitudeOffset = function(degrees) {
  this.facingLongitudeOffset = degrees;
};

KtacMesh.prototype.lookNorth = function() {
  this.mesh.rotation = new THREE.Euler( 0, 1, 0, 'XYZ');
  this.resetUpwardAxis();
  var facingLongitudeOffsetRadians = this.facingLongitudeOffset * Math.PI / 180.0;
  this.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), 0 - facingLongitudeOffsetRadians);
};

KtacMesh.prototype.lookAt = function(target) {
  if(target == null) {
    return;
  }
  
  if(target instanceof KtacLocation) {
    target = target.getVector3();
  }
  
  this.mesh.lookAt(target);
  this.resetUpwardAxis();
  
  var facingLongitudeOffsetRadians = this.facingLongitudeOffset * Math.PI / 180.0;
  this.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), 0 - facingLongitudeOffsetRadians);
};

KtacMesh.prototype.resetUpwardAxis = function() {
  var axis = new THREE.Vector3(0,1,0);
  this.mesh.up = axis;
};

KtacMesh.prototype.setLocation = function(loc) {
  this.location = loc;
  
  if(this.actor.initState != INIT_STATE_READY) {
    return;
  }
  
  this.mesh.position.x = loc.x + this.locationOffset.x;
  this.mesh.position.y = loc.y + this.locationOffset.y;
  this.mesh.position.z = loc.z + this.locationOffset.z;
};

KtacMesh.prototype.setScale = function(sca) {
  this.scale = sca;
  
  if(this.initState != INIT_STATE_READY) {
    return;
  }
  
  this.mesh.scale.x = sca.x;
  this.mesh.scale.y = sca.y;
  this.mesh.scale.z = sca.z;
};


// setting color as boolean "false" decolorizes and restores original colors
KtacMesh.prototype.colorize = function(color) {
  if(color === false) {
    this.deColorize();
    return;
  }
  
  // get our list of materials to colorize
  var materials = new Array();
  if(this.mesh.material.materials == undefined) {
    // single material mesh
    materials.push(this.mesh.material);
  } else {
    //multi material mesh
    for(var i in this.mesh.material.materials) {
      materials.push(this.mesh.material.materials[i]);
    }
  }
  
  // if we still have our original colors, save them for later restoration
  if(!this.isColorized) {
    for(var i in materials) {
      this.originalColors.push(materials[i].color.getHex());
    }
  }
  
  // apply the colorization
  for(var i in materials) {
    materials[i].color.setHex(color);
  }
  
  this.isColorized = true; 
};

KtacMesh.prototype.deColorize = function() {
  if(!this.isColorized) {
    return;
  }
  
  // get our list of materials to decolorize
  var materials = new Array();
  if(this.mesh.material.materials == undefined) {
    // single material mesh
    materials.push(this.mesh.material);
  } else {
    //multi material mesh
    for(var i in this.mesh.material.materials) {
      materials.push(this.mesh.material.materials[i]);
    }
  }
  
  // apply the decolorization
  for(var i in materials) {
    materials[i].color.setHex(this.originalColors[i]);
  }
  this.isColorized = false;
};

KtacMesh.prototype.loadAnimations = function(geometryAnims, blendAnims) {

  for(var i in blendAnims) {
    var blendAnim = blendAnims[i];
    var anim = new THREE.Animation(this.mesh, geometryAnims[blendAnim.blendIndex]);
    this.animations[blendAnim.name] = anim;
  }
};

KtacMesh.prototype.playAnimation = function(animName) {
  if(this.animations[animName] == undefined) {
    return;
  }
  this.animations[animName].play();
};

KtacMesh.prototype.stopAnimation = function(animName) {
  if(this.animations[animName] == undefined) {
    return;
  }
  this.animations[animName].stop();
};


KtacMesh.prototype.onGraphicsReady = function() {
  scene1.add(this.mesh);
  this.setLocation(this.location);
  this.setScale(this.scale);
  if(this.lookTarget != null) {
    this.lookAt(this.lookTarget);
  } else {
    this.lookNorth();
  }

};

KtacMesh.prototype.destruct = function() {
  scene1.remove(this.mesh);
};

KtacMesh.prototype.getUuid = function() {
  return this.mesh.uuid;
};
