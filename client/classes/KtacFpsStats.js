function KtacFpsStats() {
  
  this.deltasLastSecond = new Array();
  this.deltasLastSecondTotal = 0;
  this.idlesLastSecond = new Array();
  this.idlesLastSecondTotal = 0;
  this.timeLastSecondTotal = 0;
  
}

KtacFpsStats.prototype.recordFrame = function(delta, idle, frameTime) {
  // TODO
};