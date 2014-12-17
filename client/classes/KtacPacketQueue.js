function KtacPacketQueue() {
  
  this.sendQueue = new Array();
  this.waitingForReply = new Array();
  this.completed = new Array(); // list of finished packets, low indexes are newer
  this.lastUsedTimestamp = 0;
  this.throttle = 100; // minimum number of milliseconds between packet sends
  this.runningQueue = false;
  this.completedsToKeep = 100; // old completed packets will be trashed after this many have accumulated
}

KtacPacketQueue.prototype.send = function(packet) {
  this.sendQueue.push(packet);
  this.runQueue();
};

KtacPacketQueue.prototype.processSendQueue = function() {
  if(this.sendQueue.length == 0) {
    this.runningQueue = false;
    return;
  }
  
  //if we haven't set the socket id yet
  if(KTAC_SOCKET_ID == undefined) {
    KTAC_SOCKET_ID = Drupal.Nodejs.socket.io.engine.id;
    
    // if we don't have a socket id available to us yet
    if(KTAC_SOCKET_ID == undefined) {
      this.lastUsedTimestamp = Date.now();
      this.runningQueue = false;
      this.runQueue();
      return;
    }
  }
  
  
  var packet = this.sendQueue.shift();
  
  packet.timestamp = Date.now();
  
  this.waitingForReply.push(packet);
  
  
  packet.socketId = KTAC_SOCKET_ID;
  
  // really send the packet
  jQuery.post("/ktacAjax", {
    packetSocketId: packet.socketId,
    packetTimestamp: packet.timestamp,
    packetType: packet.type,
    packetContent: JSON.stringify(packet.content)
  }, packet.responseCallback, "json");
  
  this.runningQueue = false;
  if(this.sendQueue.length > 0) {
    this.runQueue();
  }
}

KtacPacketQueue.prototype.runQueue = function() {
  if(this.runningQueue) {
    return;
  }
  
  var nextSend = this.lastUsedTimestamp + this.throttle;
  var now = Date.now();
  if(now >= nextSend) {
    this.processSendQueue();
  } else {
    this.runningQueue = true;
    var delay = nextSend - now;
    setTimeout("ktacPacketQueue.processSendQueue()", delay);
  }
}

KtacPacketQueue.prototype.completePacket = function(packet) {
  this.completed.unshift(packet);
  while(this.completed.length > this.completedsToKeep) {
    this.completed.pop();
  }
}