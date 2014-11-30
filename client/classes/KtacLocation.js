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
}