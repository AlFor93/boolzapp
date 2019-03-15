//FUNZIONE PER AVERE LE ORE E I MINUTI CORRETTI NELLA FASCIA COMPRESA TRA 00 E 09
function addZero (k) {
  if (k < 10) {
    k = "0" + k;
  }
  return k;
}
//FUNZIONE PER SINCRONIZZARE L'ORA CON IL PC DELL'UTENTE
function getLocalTime (){
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var hoursComplete = h + ":" + m;

    return hoursComplete;
 }
//FUNZIONE PER CREARE E INVIARE UN NUOVO MESSAGGIO DINAMICO E, RICEVERE UNA RISPOSTA AUTOMATICA
//PASSANDO COME VALORI DELLA FUNZIONE messageTxt (l'input di testo della chat attiva),
//invio(la classe da aggiungere al messaggio inviato per posizionarlo correttamente),
//activeMessageContainer (per selezionare l'effettivo container attivo, per evitare che la risposta possa
//essere posizionata in una conversazione diversa).


// function addMineMessage (messageTxt, invio, activeMessageContainer) {
//
//   var messageForm = document.createElement("div");
//   var message = document.createElement("div");
//   var messageContent = document.createElement("span");
//   var messageDetail = document.createElement("span");
//   var hours = getLocalTime();
//
//   $(messageForm).addClass("message-form");
//   $(message).addClass(invio);
//   $(messageDetail).addClass("ora")
//
//   if (invio == "message received" ) {
//     $(messageContent).text("YuppiDuppi!");
//   } else {
//     messageContent.innerHTML = messageTxt;
//   }
//
//   messageDetail.append(hours);
//
//   message.append(messageContent);
//   message.append(messageDetail);
//
//   messageForm.append(message);
//
//   activeMessageContainer.append(messageForm);
//
// }
function addMessageHB (messageTxt, invio, activeMessageContainer) {

  var data = {
    tipoInvio : invio,
    testo : function (){
      if (invio == "received" ) {
          var testo = "YuppiDuppi!";
      } else {
        var testo = messageTxt;
      }
      return testo;
    },
    ora : getLocalTime()
  };

  var template = $("#box-template").html();
  var compiled = Handlebars.compile(template);
  var finalMessageFormHtml = compiled(data);

  activeMessageContainer.append(finalMessageFormHtml);

}


//FUNZIONE PER INVIARE IL MESSAGGIO AL CLICK DI INVIO
function textEnterEvent (e) {
  var textInput = $(this);
  var activeMessageContainer =  $(".wrapper-right").not(".hidden").children(".messages-container");
  var keyPress = e.which;
  if (keyPress == 13) {
    addMessageHB(textInput.val(), "sent" , activeMessageContainer);
    // addMineMessage(textInput.val(), "message sent", activeMessageContainer);

    textInput.val("");
    activeMessageContainer.animate({scrollTop: activeMessageContainer.prop("scrollHeight")},0);
    setTimeout(function(){
      addMessageHB(textInput.val(), "received", activeMessageContainer);
      // addMineMessage(textInput.val(), "message received", activeMessageContainer);
      //funzione per far scrollare in automatico la pagina verso il fondo della chat
      activeMessageContainer.animate({scrollTop: activeMessageContainer.prop("scrollHeight")});
    },3000);
  }
}
//FUNZIONE PER LA RICERCA DEI CONTATTI E LA SPARIZIONE DI QUELLI NON CORRISPONDENTI
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
//FUNZIONE PER SWITCHARE DA UNA CONVERSAZIONE ALL'ALTRA
function changeConversationClickingName (){

  var clickedUser = $(this);
  var indexUser = clickedUser.index();
  var allChats = $(".wrapper-right");
  allChats.addClass("hidden");
  var nextChat = allChats.eq(indexUser);

  nextChat.removeClass("hidden");
}
//FUNZIONE PER FAR APPARIRE IL MENU PER LA CANCELLAZIONE DEL MESSAGGIO
// function showMenu () {
//   var menuContainer = document.createElement("div");
//   var menuOption1 = document.createElement("p");
//   var menuOption2 = document.createElement("p");
//   var selectedMessage = $(this);
//
//   $(menuContainer).addClass("fixedDown").css("backgroundColor","#cecece");
//   selectedMessage.addClass("relative");
//
//   $(menuOption1).text("Info messaggio");
//   $(menuOption2).text("Cancella messaggio");
//
//   menuContainer.append(menuOption1);
//   menuContainer.append(menuOption2);
//   selectedMessage.append(menuContainer);
//   console.log(selectedMessage)
// }
function showMenu () {
  var selectedMessage = $(this);
  var menu = selectedMessage.children(".menu");
  menu.toggleClass("hidden");
}
//FUNZIONE PER CANCELLARE UN MESSAGGIO
function deleteSelectedMessage () {
  var deleteButton = $(this);
  var menu = deleteButton.parent();
  var message = menu.parent();

  message.remove()
}








function init() {
  //Azione scatenante per mandare il messaggio "all'invio"
  var textInput = $(".footer > input");
  textInput.keyup(textEnterEvent);
  //Richiamo alla funzione per cercare i contatti
  var searchBar = $("#searchBar");
  searchBar.keyup(search);
  //Richiamo alla funzione per cambiare conversazione
  var userList = $(".user-list");
  userList.click(changeConversationClickingName);
  //richiamo alla funzione per aprire il menu per la cancellazione del messaggio
  $(document).on("click",".message",showMenu);
  //richiamo alla funzione per cancellare i messaggi
  $(document).on("click",".delete-mex",deleteSelectedMessage);
}


$(document).ready(init);
