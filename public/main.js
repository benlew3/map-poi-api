//google maps api key : AIzaSyCb-7dyOecp8Y_ZQsqqY6PY6fbLLEc6XCk

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBAbgpJgr0A09hZRgK6qJgW-2i4rKjokDY",
    authDomain: "map-poi-api.firebaseapp.com",
    databaseURL: "https://map-poi-api.firebaseio.com",
    storageBucket: "gs://map-poi-api.appspot.com",
    messagingSenderId: "108082024426"
  };

  firebase.initializeApp(config);

  // function initMap() {
  //   var uluru = {lat: -25.363, lng: 131.044};
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 4,
  //     center: uluru
  //   });
  //   var marker = new google.maps.Marker({
  //     position: uluru,
  //     map: map
  //   });
  // }

  function initMap() {
 var map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: -34.397, lng: 150.644},
   zoom: 6
 });
 var infoWindow = new google.maps.InfoWindow({map: map});

 // Try HTML5 geolocation.
 if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position) {
     var pos = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
     };

     infoWindow.setPosition(pos);
     infoWindow.setContent('Location found.');
     map.setCenter(pos);
   }, function() {
     handleLocationError(true, infoWindow, map.getCenter());
   });
 } else {
   // Browser doesn't support Geolocation
   handleLocationError(false, infoWindow, map.getCenter());
 }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
 infoWindow.setPosition(pos);
 infoWindow.setContent(browserHasGeolocation ?
                       'Error: The Geolocation service failed.' :
                       'Error: Your browser doesn\'t support geolocation.');
}
