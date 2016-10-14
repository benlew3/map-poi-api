// Initialize Firebase
var config = {
  apiKey: "AIzaSyBAbgpJgr0A09hZRgK6qJgW-2i4rKjokDY",
  authDomain: "map-poi-api.firebaseapp.com",
  databaseURL: "https://map-poi-api.firebaseio.com",
  storageBucket: "gs://map-poi-api.appspot.com",
  messagingSenderId: "108082024426"
};
var map;

firebase.initializeApp(config);

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 2
  });
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });

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

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');
  // (In this example we use a locally stored copy instead.)
  script.src = 'https://developers.google.com/maps/documentation/javascript/tutorials/js/earthquake_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);

  map.data.loadGeoJson('data.json');
}

window.eqfeed_callback = function(results) {
  console.log("got here");
  for (var i = 0; i < results.features.length; i++) {
    console.log("now here");
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1], coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}

function eqfeed_callback(response) {
  console.log(response)
  //console.log(response.map.data);
  map.data.addGeoJson(response);
  console.log("got here cb");
  //console.log(map.data.addGeoJson(response));
}
