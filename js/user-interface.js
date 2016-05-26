var GenerateMessage = require("./../js/GenerateMessagePin.js").GenerateMessage;
var displayMessages = require("./../js/checkforMessages.js").displayMessages;

$(document).ready(function(){
  $("#addressForm").submit(function(event){
    event.preventDefault();
    var userAddress = $("#address").val();
    var userMessage = $("#message").val();
    GenerateMessage(userAddress, userMessage);
  });
});
