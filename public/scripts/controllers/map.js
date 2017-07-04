var map;
var markers = [];

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 47.6062, lng: -122.3321}
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      var coords = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
    );
      map.setZoom(15);
      map.setCenter(coords);
    });
  }

  directionsDisplay.setMap(map);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  // $('#start').on('change', onChangeHandler);
  // $('#end').on('change', onChangeHandler);
  $('#get_weather').on('click', onChangeHandler);
}

var locations = [];
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: $('#start').val(),
    destination: $('#end').val(),
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      locations = directionsDisplay.getDirections().routes[0].overview_path.filter((_, ind) => ind % 25 === 0);
      getWeather(locations, addMarkers);
    } else {
      // window.alert('Directions request failed due to ' + status);
    }
  });
}

function addMarkers(points) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
  for (var i = 0; i < points.length; i++) {
    var markerLoc = new google.maps.LatLng(points[i].lat, points[i].lng);
    var marker = new google.maps.Marker({
      position: markerLoc,
      map: map,
      icon: `http://openweathermap.org/img/w/${points[i].icon}.png`
    });
    markers.push(marker);

    // add pop up for weather
    // var contentString = `${weatherObj.name}, ...`
    // var infowindow = new google.maps.InfoWindow({
    //      content: contentString
    //    });
    // marker.addListener('click', function() {
    //       infowindow.open(map, marker);
    //     });
  }
}
