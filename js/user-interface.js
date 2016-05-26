var MessageJS = require("./../js/GenerateMessagePin.js").MessageJS;




$( document ).ready(function() {
    var messageJS = new MessageJS();

  $("#addressForm").submit(function(event){
    event.preventDefault();
    var userAddress = $("#address").val();
    var userMessage = $("#message").val();
    messageJS.GenerateMessage(userAddress, userMessage, messageJS);
  });

  navigator.geolocation.getCurrentPosition(function(response){
    var latitude = response.coords.latitude;
    var longitude = response.coords.longitude;
    messageJS.mapIt(latitude, longitude);
  });

  setInterval(function() {

    navigator.geolocation.getCurrentPosition(function(response){
      var latitude = response.coords.latitude.toFixed(4);
      var longitude = response.coords.longitude.toFixed(4);
      var messageArray = messageJS.displayMessages(latitude, longitude, messageJS);
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
