MessageJS = function(){
  this.LatLngDatabase = {};
}

MessageJS.prototype.returnDatabase = function() {
  return this.LatLngDatabase;
}

MessageJS.prototype.returnMessage = function() {
  return this.message;
}

MessageJS.prototype.mapIt = function(latitude, longitude) {
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

MessageJS.prototype.GenerateMessage = function(Address, message){
  var geocoder = new google.maps.Geocoder();
  var self = this;
  geocoder.geocode( {"address": Address}, function(response, status){
    var location = response[0].geometry.location;
    self.addToDatabase(location.lat().toFixed(4), location.lng().toFixed(4), message, Address);
    new google.maps.Marker({
      map: map,
      position: location
    });
  });
};

MessageJS.prototype.displayMessages = function(lat, long){
  var allMessages = [];
  var Keys = Object.keys(this.returnDatabase());
  var self = this;
  Keys.forEach(function(key) {
    var locationArray = key.split(",");
    var keyLat = Math.abs(locationArray[0]);
    var keyLong = Math.abs(locationArray[1]);
    var userLong = Math.abs(long);
    var userLat = Math.abs(lat);
    var radius = .0005;
    if (((keyLat + radius) > userLat && userLat > (keyLat - radius)) && ((keyLong + radius) > userLong && userLong > (keyLong - radius))) {
      console.log(self.returnDatabase());
      allMessages.push(self.returnDatabase()[key]);
    }
  });
  return allMessages;
};

MessageJS.prototype.addToDatabase = function(lat, long, message, address){
  var latLong = [lat, long];

  if(!(latLong in this.returnDatabase())) {

    this.LatLngDatabase[latLong] = [[]];
    this.LatLngDatabase[latLong].unshift(address);
    this.LatLngDatabase[latLong][1].push(message);
  } else {
    this.LatLngDatabase[latLong][1].push(message);
  }
};

exports.MessageJS = MessageJS;
