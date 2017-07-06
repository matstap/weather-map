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
      // console.log(response.routes[0].overview_path);
    } else {

    }
    locations = directionsDisplay.getDirections().routes[0].overview_path.filter((_, ind) => ind % 25 === 0);
    getWeather(locations, addMarkers);
  });
}

function addMarkers(points) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
  console.log('points', points.length);
  console.log(points);
  // points.forEach(function(p) {
  for (var i = 0; i < points.length; i++) {
    var markerLoc = new google.maps.LatLng(points[i].lat, points[i].lng);
    var marker = new google.maps.Marker({
      position: markerLoc,
      map: map,
      icon: `https://openweathermap.org/img/w/${points[i].icon}.png`,
      title: `| ${points[i].name} | ${points[i].description} |`
    });
    marker.content = `<h3>${points[i].name}</h3><p>${points[i].description}</p><p>Temp: ${points[i].temp}&deg; F</p><p>Humidity: ${points[i].humidity}%</p>`;
    markers.push(marker);

    var infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.setContent(this.content);
      infoWindow.open(this.getMap(), this);
    });
  }
  // console.log(markers[5].position.lat(), markers[5].position.lng());
}
