var displayMessages = require("./../js/checkforMessages.js").displayMessages;

$( document ).ready(function() {
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
        })
      });
      $("#currentLocation").text("latitude: " + latitude + ", longitude: " + longitude);
    });
  }, 1000);
});

function mapIt(latitude, longitude) {
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: latitude, lng: longitude},
  zoom: 8
    });
  var userLatLong = new google.maps.LatLng(latitude, longitude, true);
  new google.maps.Marker({
    map: map,
    position: userLatLong
  });
}
