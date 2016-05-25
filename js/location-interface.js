$( document ).ready(function() {
  $('#map').append(mapIt);
  navigator.geolocation.getCurrentPosition(function(response){
    var latitude = response.coords.latitude;
    var longitude = response.coords.longitude;
    mapIt(latitude, longitude);
  });
  setInterval(function() {
    navigator.geolocation.getCurrentPosition(function(response){
      var latitude = response.coords.latitude;
      var longitude = response.coords.longitude;
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
