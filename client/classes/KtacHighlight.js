function KtacHighlight() {
  this.intersected = null;
}


KtacHighlight.highlightMouseover = function() {
  jQuery("#mouseContextInfo").css("left", mouse.x + 10). css("top", mouse.y + 10);
  
  // if the mouse context menu is open, selection is frozen and mousing around won't select other things
  if(isMouseContextMenuOpen) {
    return;
  }
  
  
  var mouseVector = new Object();
  mouseVector.x = ( mouse.x / window.innerWidth ) * 2 - 1;
  mouseVector.y = - ( mouse.y / window.innerHeight ) * 2 + 1;
  
  var vector = new THREE.Vector3( mouseVector.x, mouseVector.y, 1 );
  projector.unprojectVector( vector, camera );
  var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

  // create an array containing all objects in the scene with which the ray intersects
  var intersects = ray.intersectObjects( scene1.boundingBoxes ); //scene1.children );

  // this.intersected = the object in the scene currently closest to the camera 
  //    and intersected by the Ray projected from the mouse position  
  
  // if there is one (or more) intersections
  if ( intersects.length > 0 )
  {
    // if the closest object intersected is not the currently stored intersection object
    if ( intersects[ 0 ].object != this.intersected ) 
    {   
        // restore previous intersection object (if it exists) to its original color
      if ( this.intersected ) {
 
        KtacHighlight.setHighlightColors(this.intersected, this.intersected.originalBoundingBoxColor);
        KtacHighlight.setHighlightColors(this.intersected.boundingBox.actor.mesh, this.intersected.originalActorColors);
      }
      // store reference to closest object as current intersection object
      this.intersected = intersects[ 0 ].object;
      
      KTAC_HIGHLIGHTED_ACTOR = this.intersected.boundingBox.actor;
      var actorMesh = KTAC_HIGHLIGHTED_ACTOR.mesh;
      
      // store color of closest object (for later restoration)
      //this.intersected.originalBoundingBoxColor = this.intersected.material.color.getHex(); 
      //this.intersected.originalActorColor = this.intersected.boundingBox.actor.mesh.material.color.getHex();
      
      
      // set a new color for closest object
      //this.intersected.material.color.setHex( 0xffff00 );
      //this.intersected.boundingBox.actor.mesh.material.color.setHex( 0xffff00 );
      
      
      this.intersected.originalBoundingBoxColors = KtacHighlight.setHighlightColors(this.intersected, KTAC_HIGHLIGHT_COLOR);
      this.intersected.originalActorColors       = KtacHighlight.setHighlightColors(this.intersected.boundingBox.actor.mesh, KTAC_HIGHLIGHT_COLOR);
      
      jQuery("#mouseContextInfo .label").html(KTAC_HIGHLIGHTED_ACTOR.name);
      jQuery("#mouseContextInfo").removeClass("hidden");
      
    }
  } 
  else // there are no intersections
  {
    // restore previous intersection object (if it exists) to its original color
    if ( this.intersected ) { 
      
      //this.intersected.material.color.setHex( this.intersected.originalBoundingBoxColor );
      //this.intersected.boundingBox.actor.mesh.material.materials[0].color.setHex( this.intersected.originalActorColor );
      
      KtacHighlight.setHighlightColors(this.intersected, this.intersected.originalBoundingBoxColors);
      KtacHighlight.setHighlightColors(this.intersected.boundingBox.actor.mesh, this.intersected.originalActorColors);
    }
    // remove previous intersection object reference
    //     by setting current intersection object to "nothing"
    this.intersected = null;
    
    KTAC_HIGHLIGHTED_ACTOR = null;
    jQuery("#mouseContextInfo .label").html("");
    jQuery("#mouseContextInfo").addClass("hidden");
  }
  
};

// returns the current colors of the mesh's materials
// if an array of colors is provided, sets them
// if a single, non-array color is provided, sets it to all
KtacHighlight.setHighlightColors = function(mesh, colors) {
  var beforeColors = new Array();
  
  if(mesh.material.materials == undefined) {
    beforeColors[0] = mesh.material.color.getHex();
    
    if(colors instanceof Array) {
      mesh.material.color.setHex(colors[0]);
    } else if (colors != undefined){
      mesh.material.color.setHex(colors);
    }
      
    return beforeColors;
  }
  // else we have a mesh with multiple materials
  
  for(var i in mesh.material.materials) {
    beforeColors[i] = mesh.material.materials[i].color.getHex();
  }
  
  if(colors instanceof Array) {
    for(i in mesh.material.materials) {
      if(colors[i] != undefined) {
        mesh.material.materials[i].color.setHex(colors[i]);
      }
    }
  } else if (colors != undefined){
    for(var i in mesh.material.materials) {
      mesh.material.materials[i].color.setHex(colors);
    }
  }
  
  return beforeColors;
};