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
