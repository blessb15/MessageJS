var addToDatabase = require("./../js/SudoDatabaseOfMessageMarkers.js").addToDatabase;

exports.GenerateMessage = function(Address, message){
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( {"address": Address}, function(response, status){
    var location = response[0].geometry.location;
    addToDatabase(location.lat(), location.lng(), message);
    new google.maps.Marker({
      map: map,
      position: location
    });
  });
};
