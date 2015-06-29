function KtacBubble(actor, html) {
	this.actor = actor;
	this.html = html;
	this.screenOffset = {x: 0, y: -80};
	this.divElement = null;
	this.contentElement = null;
	this.size = {x: 0, y: 0};
	
	this.progressbarDurationTicks = 1;
	this.progressbarRemainingDurationTicks = 1;
  this.progressbarElement = null;	
}

//setting html to "" will remove the bubble
KtacBubble.prototype.setHtml = function(html) {
	this.html = html;
	var divId = "bubble_uuid_" + this.actor.getUuid();
	
	if(html == "" && this.divElement != null) {
		this.divElement.remove();
		this.divElement = null;
		return;
	}
	
	if(this.divElement == null) {
		jQuery("#bubbles").append("<div id='" + divId + "' class='bubble'><div class='content'></div><div class='meta'><div class='durationProgressbar'></div></div></div>");
		this.divElement = jQuery("#" + divId);
	}
	this.contentElement = this.divElement.find(".content");
	this.contentElement.html(this.html);
	this.progressbarElement = this.divElement.find(".meta .durationProgressbar");
	this.progressbarElement.progressbar({value: 0});
	this.size.x = this.divElement.width();
	this.size.y = this.divElement.height();
	
};

KtacBubble.prototype.updatePosition = function() {
	if(this.divElement == null) {
		return;
	}
	
	screenLoc = KtacFunctions.toScreenXY(this.actor.mesh.position);
	screenLoc.x = screenLoc.x - (this.size.x / 2) + this.screenOffset.x;
	screenLoc.y = screenLoc.y - this.size.y + this.screenOffset.y;
	
	
	
	this.divElement.offset({left: Math.floor(screenLoc.x), top: Math.floor(screenLoc.y)});
};

KtacBubble.prototype.updateProgressbar = function(remainingDurationTicks, durationTicks) {
  this.progressbarDurationTicks = durationTicks;
  this.progressbarRemainingDurationTicks = remainingDurationTicks;
  var progressPercent = ((durationTicks - remainingDurationTicks) / durationTicks) * 100;
  this.progressbarElement.progressbar("value", progressPercent);
};

KtacBubble.prototype.frame = function() {
  this.updatePosition();
  
  var fakeFramePartialTick; // to make the progress bar smooth, per-frame updates while actually being per-tick.  This how much of a portion of a tick to fake (0-1).
  fakeFramePartialTick = SECONDS_SINCE_TICK * TICKS_PER_SECOND;
  
  if(fakeFramePartialTick > 1) fakeFramePartialTick = 1;
  
  var progressPercent = ((this.progressbarDurationTicks - this.progressbarRemainingDurationTicks + fakeFramePartialTick) / this.progressbarDurationTicks) * 100;
  this.progressbarElement.progressbar("value", progressPercent);
};