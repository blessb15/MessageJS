
LatLngDatabase = {};
exports.addToDatabase = function(lat, long, message){
  var latLong = [lat, long];
  if(!(latLong in LatLngDatabase)) {
    LatLngDatabase[latLong] = [];
    LatLngDatabase[latLong].push(message);
  } else {
    LatLngDatabase[latLong].push(message);
  }
  console.log(latLong);
  console.log(Object.keys(LatLngDatabase));
  console.log(LatLngDatabase[latLong]);
  console.log(LatLngDatabase);
}
