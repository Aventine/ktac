function KtacLocation(zone, x, y, z) {
  this.zone = zone;
  this.x = x;
  this.y = y;
  this.z = z;
}

KtacLocation.prototype.clone = function() {
  var loc = new KtacLocation(this.zone, this.x, this.y, this.z);
  return loc;
};
