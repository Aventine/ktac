// these functions are "static", so they're called without an instance of KtacFunctions, like: result = KtacFunctions.someFunction();

function KtacFunctions() {

}

// from http://stackoverflow.com/a/3596141
KtacFunctions.removeFromArray = function (toRemove, array) {
  array.splice( jQuery.inArray(toRemove, array) ,1 );
};

// returns location of next step between here and goal, percent% of the way there
// this is used for moving meshes toward the actor's actual location before the next tick
KtacFunctions.getPercentStepToward = function(here, goal, percent) {
  
  if(percent <= 0) {
    return here;
  }
  
  if(percent >= 1) {
    return goal;
  }
  
  var nextStep = here;
  
  if(goal.x < here.x) {
    nextStep.x = parseFloat(here.x) - (parseFloat(here.x) - parseFloat(goal.x)) * percent;
  }
  else if(goal.x > here.x) {
    nextStep.x = parseFloat(here.x) + (parseFloat(goal.x) - parseFloat(here.x)) * percent;
  }
  
  if(goal.y < here.y) {
    nextStep.y = parseFloat(here.y) - (parseFloat(here.y) - parseFloat(goal.y)) * percent;
  }
  else if(goal.y > here.y) {
    nextStep.y = parseFloat(here.y) + (parseFloat(goal.y) - parseFloat(here.y)) * percent;
  }
  
  if(goal.z < here.z) {
    nextStep.z = parseFloat(here.z) - (parseFloat(here.z) - parseFloat(goal.z)) * percent;
  }
  else if(goal.z > here.z) {
    nextStep.z = parseFloat(here.z) + (parseFloat(goal.z) - parseFloat(here.z)) * percent;
  }
  
  return nextStep;
};

// returns location of next step between here and goal, with given speed being the size of the step
KtacFunctions.getStepToward = function(here, goal, speed) {
  
  var nextStep = here.clone();
  speed = parseFloat(speed);
  
  if(goal.x < here.x) {
    nextStep.x -= speed;
    if(nextStep.x < goal.x){
      nextStep.x = goal.x;
    }
  }
  else if(goal.x > here.x) {
    nextStep.x += speed;
    if(nextStep.x > goal.x){
      nextStep.x = goal.x;
    }
  }
  if(goal.y < here.y) {
    nextStep.y -= speed;
    if(nextStep.y < goal.y){
      nextStep.y = goal.y;
    }
  }
  else if(goal.y > here.y) {
    nextStep.y += speed;
    if(nextStep.y > goal.y){
      nextStep.y = goal.y;
    }
  }
  if(goal.z < here.z) {
    nextStep.z -= speed;
    if(nextStep.z < goal.z){
      nextStep.z = goal.z;
    }
  }
  else if(goal.z > here.z) {
    nextStep.z += speed;
    if(nextStep.z > goal.z){
      nextStep.z = goal.z;
    }
  }
  
  return nextStep;
};



// from http://alistapart.com/article/getoutbindingsituations
// allows callback functions to keep scope
KtacFunctions.createBoundedWrapper = function(object, method) {
  return function() {
    return method.apply(object, arguments);
  };
};

// from https://github.com/mrdoob/three.js/issues/78
KtacFunctions.toScreenXY = function(pos3D) {
  if(!(pos3D instanceof THREE.Vector3)) {
    pos3D = new THREE.Vector3(pos3D.x, pos3D.y, pos3D.z);
  }
  
  pos3D = pos3D.clone();
  var v = pos3D.project(camera);
  var percX = (v.x + 1) / 2;
  var percY = (-v.y + 1) / 2;
  var left = percX * window.innerWidth;
  var top = percY * window.innerHeight;
  return new THREE.Vector2(left, top);
};

KtacFunctions.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

KtacFunctions.getClassFromString = function(className) {
   return window[className];
};

KtacFunctions.zeroPadInteger = function (number, digits) {
    var pad_char = '0';
    var pad = new Array(1 + digits).join(pad_char);
    return (pad + number).slice(-pad.length);
};

// from http://stackoverflow.com/questions/18749591/encode-html-entities-in-javascript
KtacFunctions.htmlEntities = function(rawStr) {
  if(rawStr == undefined) return "";
  
  return rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
   return '&#'+i.charCodeAt(0)+';';
  });
};
