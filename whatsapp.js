 function getLocalTime(){
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var hoursComplete = h + ":" + m;
    
    return hoursComplete;
 }

function addMineMessage () {
  var messagesContainer = $(".messages-container");

  var messageForm = document.createElement("div");
  var message = document.createElement("div");
  var messageContent = document.createElement("span");
  var messageDetail = document.createElement("span");
  messageDetail = getLocalTime();

  var textInput = $("#footer-form");

  $(messageForm).addClass("message-form");
  $(message).addClass("message sent");
  $(messageDetail).addClass("ora")

  messageContent = textInput.val();

  message.append(messageContent);
  message.append(messageDetail);

  messageForm.append(message);

  messagesContainer.append(messageForm);
}

function textEnterEvent (e) {
  var textInput = $("#footer-form");
  var keyPress = e.which;
  if (keyPress == 13) {
    addMineMessage();
    textInput.val("");
  }
}























function init() {
  var textInput = $("#footer-form");
  textInput.keyup(textEnterEvent);

}


$(document).ready(init);
