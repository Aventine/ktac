function KtacBubble(actor, html) {
	this.actor = actor;
	this.html = html;
	this.screenOffset = {x: 0, y: -80};
	this.divElement = null;
	this.size = {x: 0, y: 0};
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
		jQuery("#bubbles").append("<div id='" + divId + "' class='bubble'></div>");
		this.divElement = jQuery("#" + divId);
	}
	
	this.divElement.html(this.html);
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