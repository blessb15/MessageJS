var GenerateMessage = require("./../js/GenerateMessagePin.js").GenerateMessage;
var addToDatabase = require("./../js/GenerateMessagePin.js").addToDatabase;
var displayMessages = require("./../js/GenerateMessagePin.js").displayMessages;
var mapIt = require("./../js/GenerateMessagePin.js").mapIt;




$( document ).ready(function() {

  $("#addressForm").submit(function(event){
    event.preventDefault();
    var userAddress = $("#address").val();
    var userMessage = $("#message").val();
    GenerateMessage(userAddress, userMessage);
  });

  navigator.geolocation.getCurrentPosition(function(response){
    var latitude = response.coords.latitude;
    var longitude = response.coords.longitude;
    mapIt(latitude, longitude);
  });

  setInterval(function() {

    navigator.geolocation.getCurrentPosition(function(response){
      var latitude = response.coords.latitude.toFixed(4);
      var longitude = response.coords.longitude.toFixed(4);
      var messageArray = displayMessages(latitude, longitude);
      $("#messageFromLocation").empty();
      messageArray.forEach(function(messages) {
        messages.forEach(function(message) {
          if(typeof message == 'object'){
            for(i = message.length - 1 ; i >= 0; i--){
              $("#messageFromLocation").append("<li>" + message[i] + "</li>");
            }
          } else {
            $("#messageFromLocation").append("<li><strong>" + message + "</strong></li>");
          }
        });
      });
      $("#currentLocation").text("latitude: " + latitude + ", longitude: " + longitude);
    });
  }, 1000);
});
