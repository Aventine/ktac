function KtacCameraControls ( camera, domElement, lookAt ) {
	
	this.camera = camera;
	this.domElement = domElement;
	
	this.movementSpeed = 2.0;
	this.keyboardLookSpeed = 1;
	this.lookSpeed = 80.0;
	this.pixelsPerRotation = 1000;
	this.maxLat = 80;
	this.minLat = -80;
	this.degreesPerUpdate = 4;
	
	this.mouseIsDragging = false;
	this.mousePos = { x: 0, y: 0 };
	this.moveState = {
		up : 0,
		down : 0,
		left : 0,
		right : 0,
		forward : 0,
		back : 0,
		pitchUp : 0,
		pitchDown : 0,
		pitchMouse : 0,
		yawLeft : 0,
		yawRight : 0,
		yawMouse : 0
	};
	this.moveVector = new THREE.Vector3( 0, 0, 0 );
	this.rotationVector = new THREE.Vector3( 0, 0, 0 );
	this.tmpQuaternion = new THREE.Quaternion();
	
	this.lon = 0;
	this.lat = 0;
	this.theta = 0;
	this.phi = 0;
	
	//this.debugLat = 0;
	//this.debugLon = 0;
	
	
	
	
	// target: a THREE.Vector3
	this.lookAt = function(target) {
		
		this.camera.lookAt(target);
		
		var sphereRadius = this.camera.position.distanceTo(target);
		var pointOnSphere = new THREE.Vector3(0,0,0);
		pointOnSphere.subVectors(target, this.camera.position);
		
		
		var latRads = Math.acos(pointOnSphere.y / sphereRadius); //theta
		var lonRads = Math.atan(pointOnSphere.x / pointOnSphere.z); //phi
		
		//this.debugLon = THREE.Math.radToDeg(lonRads);
		//this.debugLat = THREE.Math.radToDeg(latRads);
		this.lat = 90 - THREE.Math.radToDeg(latRads);
		this.lon = 90 + THREE.Math.radToDeg(lonRads);
	}
	
	if(lookAt != undefined) {
		this.lookAt(lookAt);
		
	}
	
	this.keydown = function( event ) {

		if ( event.altKey ) {
			return;
		}

		switch ( event.keyCode ) {

			//case 16: /* shift */ this.movementSpeedMultiplier = .1; break;

			case 87: /*W*/ this.moveState.forward = 1; break;
			case 83: /*S*/ this.moveState.back = 1; break;

			case 65: /*A*/ this.moveState.left = 1; break;
			case 68: /*D*/ this.moveState.right = 1; break;

			case 82: /*R*/ this.moveState.pitchUp = this.keyboardLookSpeed; break;
			case 70: /*F*/ this.moveState.pitchDown = this.keyboardLookSpeed; break;

			case 32: /*Space*/ this.moveState.up = 1; break;
			case 90: /*Z*/ this.moveState.down = 1; break;

			case 81: /*Q*/ this.moveState.yawLeft = this.keyboardLookSpeed; break;
			case 69: /*E*/ this.moveState.yawRight = this.keyboardLookSpeed; break;

		}

		this.updateMovementVector();
		//this.updateRotationVector();
		//this.updateRotationAngles();

	};
	
	
	this.keyup = function( event ) {

		switch( event.keyCode ) {

			//case 16: /* shift */ this.movementSpeedMultiplier = 1; break;

			case 87: /*W*/ this.moveState.forward = 0; break;
			case 83: /*S*/ this.moveState.back = 0; break;

			case 65: /*A*/ this.moveState.left = 0; break;
			case 68: /*D*/ this.moveState.right = 0; break;

			case 82: /*R*/ this.moveState.pitchUp = 0; break;
			case 70: /*F*/ this.moveState.pitchDown = 0; break;

			case 32: /*Space*/ this.moveState.up = 0; break;
			case 90: /*Z*/ this.moveState.down = 0; break;

			case 81: /*Q*/ this.moveState.yawLeft = 0; break;
			case 69: /*E*/ this.moveState.yawRight = 0; break;

		}

		this.updateMovementVector();
		//this.updateRotationVector();
		//this.updateRotationAngles();

	};
	
	
	this.mousedown = function( event ) {

		/*if ( this.domElement !== document ) {

			this.domElement.focus();

		}*/

		event.preventDefault();
		event.stopPropagation();

		this.mouseIsDragging = true;
		this.mousePos = { x: 0, y: 0 };
	};
	
	this.mouseup = function( event ) {

		event.preventDefault();
		event.stopPropagation();

		this.mouseIsDragging = false;
		this.moveState.yaw = 0;
		this.moveState.pitch = 0;
		this.updateRotationVector();
	};
	
	this.mousemove = function( event ) {

		if(!this.mouseIsDragging) return;
		
		if(this.mousePos.x == 0 && this.mousePos.y == 0) {
			this.mousePos.x = event.pageX;
			this.mousePos.y = event.pageY;
		}
		
		var mouseDelta = new Object();
		mouseDelta.x = this.mousePos.x - event.pageX;
		mouseDelta.y = this.mousePos.y - event.pageY;
		
		this.moveState.yawMouse = mouseDelta.x / this.pixelsPerRotation;
		this.moveState.pitchMouse = mouseDelta.y / this.pixelsPerRotation;
		
		this.updateRotationVector();
		
		this.mousePos.x = event.pageX;
		this.mousePos.y = event.pageY;
		
		
	};
	
	this.updateMovementVector = function() {

		this.moveVector.x = ( -this.moveState.left    + this.moveState.right );
		//this.moveVector.y = ( -this.moveState.down    + this.moveState.up );
		this.moveVector.z = ( -this.moveState.forward + this.moveState.back );

		//console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );

	};

	this.updateRotationVector = function() {

		this.rotationVector.x = ( -this.moveState.pitchDown + this.moveState.pitchUp + this.moveState.pitchMouse );
		this.rotationVector.y = ( -this.moveState.yawRight  + this.moveState.yawLeft + this.moveState.yawMouse );
		this.rotationVector.z = 0; //( -this.moveState.rollRight + this.moveState.rollLeft );

		this.moveState.pitchMouse = 0;
		this.moveState.yawMouse = 0;
		this.mousePos = { x: 0, y: 0 };
		//console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );

	};

	this.updateRotationAngles = function() {
		this.lat += ( -this.moveState.pitchDown + this.moveState.pitchUp + this.moveState.pitchMouse ) * this.degreesPerUpdate;
		this.lon += ( -this.moveState.yawRight  + this.moveState.yawLeft + this.moveState.yawMouse ) * this.degreesPerUpdate;
		
		if(this.lat > this.maxLat) this.lat = this.maxLat;
		if(this.lat < this.minLat) this.lat = this.minLat;
		
		
	}
	
	this.update = function( delta ) {

		//this.camera.rotation.y = 0;
		//this.camera.rotation.z = 0;
		
		this.updateRotationAngles();
		
		var moveMult = delta * this.movementSpeed;
		var rotMult = delta * this.lookSpeed;

		this.camera.translateX( this.moveVector.x * moveMult );
		//this.camera.translateY( this.moveVector.y * moveMult );
		this.camera.translateZ( this.moveVector.z * moveMult );

		this.camera.position.y += ( -this.moveState.down + this.moveState.up ) * moveMult;
		
		
		//this.tmpQuaternion.set( this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1 ).normalize();
		//this.camera.quaternion.multiply( this.tmpQuaternion );

		// expose the rotation vector for convenience
		//this.camera.rotation.setFromQuaternion( this.camera.quaternion, this.camera.rotation.order );
		
		//var axis = new THREE.Vector3(1,0,0);
		//this.camera.rotateOnAxis(axis, this.rotationVector.x * rotMult);
		//var axis = new THREE.Vector3(0,1,0);
		//this.camera.rotateOnAxis(axis, this.rotationVector.y * rotMult);
		
		this.phi   = THREE.Math.degToRad( 90 - this.lat );
		this.theta = THREE.Math.degToRad( this.lon );
		
		var targetPosition = new THREE.Vector3( 0, 0, 0 );
		var radius = 10;
		var position = this.camera.position;
		
		//targetPosition.x = position.x + radius * Math.sin( this.phi ) * Math.cos( this.theta );
		//targetPosition.y = position.y + radius * Math.cos( this.phi );
		//targetPosition.z = position.z + radius * Math.sin( this.phi ) * Math.sin( this.theta );

		targetPosition.x = position.x - radius * Math.sin( this.phi ) * Math.cos( this.theta );
		targetPosition.y = position.y + radius * Math.cos( this.phi );
		targetPosition.z = position.z + radius * Math.sin( this.phi ) * Math.sin( this.theta );
		
		
		//var euler = new THREE.Euler( 0, 0, 0, 'XYZ' );
		//targetPosition.applyEuler(euler);
		//this.camera.eulerOrder = "ZXY";
		
		this.camera.lookAt( targetPosition );
		//this.camera.rotation.x = 0;
		//this.camera.rotation.y = 0;
		//this.camera.rotation.z = 0;
		
		//this.camera.rotation.applyEuler(euler);
		
		//var axis = new THREE.Vector3(1,0,0);
		//this.camera.rotateOnAxis(axis, -this.theta);
		//var axis = new THREE.Vector3(0,1,0);
		//this.camera.up = axis;

		
	//		jQuery("#mouseContextInfo .debug").html("camera rotation<br>" +
	//				"x: " + camera.rotation.x + "<br>" +
	//				"y: " + camera.rotation.y + "<br>" +
	//				"z: " + camera.rotation.z + "<br>" + 
	//				"lat: " + this.lat + "<br>" + 
	//				"lon: " + this.lon + "<br>" + 
	//				"theta: " + this.theta + "<br>" + 
	//				"phi: " + this.phi + "<br>"
//				"debugLat: " + this.debugLat + "<br>" + 
//				"debugLon: " + this.debugLon + "<br>"
				
//				);
	};
	
	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};

	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	this.domElement.addEventListener( 'mousemove', bind( this, this.mousemove ), false );
	this.domElement.addEventListener( 'mousedown', bind( this, this.mousedown ), false );
	this.domElement.addEventListener( 'mouseup',   bind( this, this.mouseup ), false );

	window.addEventListener( 'keydown', bind( this, this.keydown ), false );
	window.addEventListener( 'keyup',   bind( this, this.keyup ), false );

	this.updateMovementVector();
	this.updateRotationVector();
}