(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./../js/GenerateMessagePin.js":1}]},{},[2]);
