function KtacAction(name) {
	
	this.name = name;
	this.started = false;
	this.goalLocation = null;
	this.duration = 0;
	this.remainingDuration = 0;
	this.successCallback = null; // an anonymous function that accepts the KtacActor that did the action
	//this.failureCallback = null;
	this.isaReplication = false; // is this action invoked by the server, instead of having been initiated on the client?
	
	this.id = KtacAction.nextId;
	KtacAction.nextId++;
	
	this.created = Date.now();
}

KtacAction.nextId = 1;

KtacAction.prototype.setGoalLocation = function(loc){
	this.goalLocation = loc;
};

KtacAction.prototype.setDuration = function(ticks){
	this.duration = ticks;
	this.remainingDuration = ticks;
};

//the callback is called as callback(actor)
KtacAction.prototype.setSuccessCallback = function(callback){
	this.successCallback = callback;
};

//the callback is called as callback(actor, progressedTicks, totalTicks)
KtacAction.prototype.setTickCallback = function(callback){
	this.tickCallback = callback;
};