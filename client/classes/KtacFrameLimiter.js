function KtacFrameLimiter(frameLimit) {
	this.frameLimit = frameLimit;
	this.deltaLimit = 1 / frameLimit;
	this.fpsMeterElement = null;
	
//	this.deltasLastSecond = new Array();
//	this.deltasLastSecondTotal = 0;
//	this.idlesLastSecond = new Array();
//	this.idlesLastSecondTotal = 0;
//	this.timeLastSecondTotal = 0;

	this.fpsStats = new KtacFpsStats();
}

// delta is the previous frame's delta
KtacFrameLimiter.prototype.requestNextFrame = function(delta){
	
	var idle = 0;
	if(delta > this.deltaLimit) {
	  requestAnimationFrame(frameLoop);
  } else {
	  idle = this.deltaLimit - delta;
	  //if(delay < 0) delay = 0;
	  //ktacConsole.outputMessage("delaying frame " + delay.toFixed(3));
	  // the setTimeout is to enact a frame limiter, only allowing "frameLimit" FPS maximum
	  setTimeout( function() {
	    requestAnimationFrame(frameLoop);
	  }, 1000 * idle );
  }
	
  var frameTime = delta + idle;
  var fps = 1 / frameTime;
  //ktacConsole.outputMessage("frame delta" + delta.toFixed(3) + " idle " + idle.toFixed(3) + " frameTime " + frameTime.toFixed(3));  

  //this.fpsStats.recordFrame(delta, idle, frameTime); TO IMPLEMENT
  
  var fpsString = Math.floor(fps);// + " / " + Math.floor(fpsLastFiveSeconds) + " / " + Math.floor(fpsLastFifteenSeconds);
  var idleString = KtacFunctions.zeroPadInteger(parseInt((idle / frameTime)*100), 2);
  fpsMeterElement.html(fpsString + " FPS " + "(" + idleString + "% idle)");
};

KtacFrameLimiter.prototype.setFpsMeterElement = function(element) {
	this.fpsMeterElement = element;
};