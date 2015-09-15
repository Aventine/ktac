function KtacLocation(zone, x, y, z) {
  this.zone = parseFloat(zone);
  this.x = parseFloat(x);
  this.y = parseFloat(y);
  this.z = parseFloat(z);
}

KtacLocation.prototype.clone = function() {
  var loc = new KtacLocation(this.zone, this.x, this.y, this.z);
  return loc;
};

KtacLocation.prototype.toString = function() {
	var string = "(" + this.zone + ", " + this.x + ", " + this.y + ", " + this.z + ")";
	return string;
};

KtacLocation.prototype.equals = function(other) {
  if(this.zone == other.zone && 
     this.x == other.x && 
     this.y == other.y && 
     this.z == other.z) {
    return true;
  }
  return false;
};

KtacLocation.prototype.getVector3 = function() {
  return new THREE.Vector3(this.x, this.y, this.z);
};
