function KtacChatEntry () {
  this.active = false;
  
  jQuery(document).ready(function() {
    jQuery("#chatEntry").focus(function() {
      ktacChatEntry.goActive();
    });
    
    jQuery("#chatEntry").blur(function() {
      ktacChatEntry.goInactive();
    });
    
    jQuery("#chatEntry").keyup(function(e){
      if(e.keyCode == 13) { // 13 = the Enter key
        ktacChatEntry.say(jQuery("#chatEntry").val());
      }
    });
  });
  
};

KtacChatEntry.prototype.goActive = function(){
  jQuery("#chatEntry").addClass("active");
  cameraControls.disableKeyboardInput();
};

KtacChatEntry.prototype.goInactive = function(){
  jQuery("#chatEntry").removeClass("active");
  cameraControls.enableKeyboardInput();
};

KtacChatEntry.prototype.say = function(message){
  message = KtacFunctions.htmlEntities(message);
  ktacConsole.outputMessage("Player: " + message);
  playerActor.showBubbleMessage(message);
  jQuery("#chatEntry").val("");
};
