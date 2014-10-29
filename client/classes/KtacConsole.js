function KtacConsole() {
  
  this.consoleElement = null;
}

KtacConsole.prototype.init = function() {
  this.consoleElement = jQuery("#console");
};

KtacConsole.prototype.outputMessage = function(message) {
  //this.consoleElement = jQuery("#console");
  if(this.consoleElement == null) {
    return;
  }
  
  var wasAtBottom = (this.consoleElement[0].scrollHeight - this.consoleElement.scrollTop() == this.consoleElement.outerHeight());
  this.consoleElement.append("<div class='message'>" + message + "</div>");
  
  // only scroll to the new content if the scrollbar was already at the bottom
  if(wasAtBottom) {
    this.consoleElement.scrollTop(this.consoleElement[0].scrollHeight);
  }
};