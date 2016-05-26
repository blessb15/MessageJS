LatLngDatabase = {};
exports.addToDatabase = function(lat, long, message, address){
  var latLong = [lat, long];
  if(!(latLong in LatLngDatabase)) {
    LatLngDatabase[latLong] = [[]];
    console.log(LatLngDatabase);
    LatLngDatabase[latLong].unshift(address);
    LatLngDatabase[latLong][1].push(message);
  } else {
    LatLngDatabase[latLong][1].push(message);
  }
};
