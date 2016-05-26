var addToDatabase = require("./../js/SudoDatabaseOfMessageMarkers.js").addToDatabase;

exports.GenerateMessage = function(Address, message){
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( {"address": Address}, function(response, status){
    var location = response[0].geometry.location;
    addToDatabase(location.lat().toFixed(4), location.lng().toFixed(4), message, Address);
    new google.maps.Marker({
      map: map,
      position: location
    });
  });
};
