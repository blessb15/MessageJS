var addToDatabase = require("./../js/database.js").addToDatabase;

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

exports.displayMessages = function(lat, long){
  var allMessages = [];
  var Keys = Object.keys(LatLngDatabase);
  Keys.forEach(function(key) {
    var locationArray = key.split(",");
    var keyLat = Math.abs(locationArray[0]);
    var keyLong = Math.abs(locationArray[1]);
    var userLong = Math.abs(long);
    var userLat = Math.abs(lat);
    var radius = .0005;
    if (((keyLat + radius) > userLat && userLat > (keyLat - radius)) && ((keyLong + radius) > userLong && userLong > (keyLong - radius))) {
      allMessages.push(LatLngDatabase[key]);
    }
  });
  return allMessages;
};

exports.mapIt = function(latitude, longitude) {
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: latitude, lng: longitude},
  zoom: 8
    });
  var userLatLong = new google.maps.LatLng(latitude, longitude, true);
  new google.maps.Marker({
    map: map,
    position: userLatLong
  });
};
