function KtacActorSavePacket(actor, options) {
  KtacPacket.call(this);
  
  this.type = "KtacActorSavePacket";
  //this.content.actorId = actor.id;
  //this.content.actorLocation = actor.location;
  this.content.actor = new Object();
  this.content.actor.id = actor.id;
  this.content.actor.typeId = actor.getTypeId();
  this.content.actor.name = actor.name;
  if(actor.goalLocation) {
    this.content.actor.location = actor.goalLocation;
  } else {
    this.content.actor.location = actor.location;
  }
  this.content.actor.toBeDeleted = actor.toBeDeleted;
  
} KtacActorSavePacket.prototype = Object.create(KtacPacket.prototype);