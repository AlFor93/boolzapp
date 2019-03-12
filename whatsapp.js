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
  var hours = getLocalTime();

  var textInput = $("#footer-form");

  $(messageForm).addClass("message-form");
  $(message).addClass("message sent");
  $(messageDetail).addClass("ora")

  messageContent = textInput.val();

  messageDetail.append(hours);

  message.append(messageContent);
  message.append(messageDetail);

  messageForm.append(message);

  messagesContainer.append(messageForm);

  setTimeout(addAnswerMessage,3000);
}

function addAnswerMessage () {
  var messagesContainer = $(".messages-container");

  var messageForm = document.createElement("div");
  var message = document.createElement("div");
  var messageContent = document.createElement("span");
  var messageDetail = document.createElement("span");
  var hours = getLocalTime();


  $(messageForm).addClass("message-form");
  $(message).addClass("message received");
  $(messageDetail).addClass("ora")
  $(messageContent).text("YuppiDuppi!");

  messageDetail.append(hours);

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

function search () {
  var me = $("#searchBar > input");
  var content = me.val();
  var userListName = $(".user-information > p")
  var userList = $(".user-list");
  for (var i = 0; i < userListName.length; i++) {
    var subject = userListName.eq(i);
    var subjectContent = subject.text();
    if (!subjectContent.includes(content)) {
      userList.addClass("red");
    } else {
      userList.removeClass("red");
    }
    console.log(subjectContent);
  }
  console.log("contenuto: " + content);
}











function init() {
  var textInput = $("#footer-form");
  textInput.keyup(textEnterEvent);
  // var searchButton = $(".fa-search");
  // searchButton.click(search);
  var searchBar = $("#searchBar");
  searchBar.keyup(search);
}


$(document).ready(init);
