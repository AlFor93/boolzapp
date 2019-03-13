function getLocalTime(){
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var hoursComplete = h + ":" + m;

    return hoursComplete;
 }

function addMineMessage (messageTxt) {
  var messagesContainer = $(".wrapper-right").not(".hidden").children(".messages-container");

  var messageForm = document.createElement("div");
  var message = document.createElement("div");
  var messageContent = document.createElement("span");
  var messageDetail = document.createElement("span");
  var hours = getLocalTime();

  $(messageForm).addClass("message-form");
  $(message).addClass("message sent");
  $(messageDetail).addClass("ora")

  messageContent.innerHTML = messageTxt;

  messageDetail.append(hours);

  message.append(messageContent);
  message.append(messageDetail);

  messageForm.append(message);

  messagesContainer.append(messageForm);

  setTimeout(addAnswerMessage,3000);

  // console.log(message)

}

function addAnswerMessage () {
  var messagesContainer = $(".wrapper-right").not(".hidden").children(".messages-container");

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
  var textInput = $(this);
  var keyPress = e.which;
  if (keyPress == 13) {
    addMineMessage(textInput.val());
    textInput.val("");
  }
}

function search () {
  var me = $("#searchBar > input");
  var content = me.val().toUpperCase();
  var userListName = $(".user-information > p")
  var userList = $(".user-list");
  for (var i = 0; i < userListName.length; i++) {
    var subject = userListName.eq(i);
    var userListSpecified = userList.eq(i);
    var subjectContent = subject.text().toUpperCase();
    if (!subjectContent.includes(content)) {
      // userListSpecified.addClass("red");
      userListSpecified.hide();
    } else {
      // userListSpecified.removeClass("red");
      userListSpecified.show();
    }
  }
}

function changeConversationClickingName(){

  var clickedUser = $(this);
  var indexUser = clickedUser.index();
  var allChats = $(".wrapper-right");
  allChats.addClass("hidden");
  var nextChat = allChats.eq(indexUser);

  nextChat.removeClass("hidden");
}









function init() {
  var textInput = $(".footer > input");
  textInput.keyup(textEnterEvent);

  var searchBar = $("#searchBar");
  searchBar.keyup(search);
  
  var userList = $(".user-list");
  userList.click(changeConversationClickingName);
}


$(document).ready(init);
