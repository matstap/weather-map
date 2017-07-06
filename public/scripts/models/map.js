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
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }

    markers = [];
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
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
    }else{
      alert('You are invalid');
    }
    
    locations = directionsDisplay.getDirections().routes[0].overview_path.filter((_, ind) => ind % 25 === 0);
    getWeather(locations, addMarkers);
  });
}

function addMarkers(points) {
  var markerLoc = new google.maps.LatLng(points.lat, points.lng);
  var marker = new google.maps.Marker({
    position: markerLoc,
    map: map,
    icon: points.icon,
    title: `| ${points.name} | ${points.description} |`
  });
  marker.content = `<h3>${points.name}</h3><p>${points.description}</p><p>Temp: ${points.temp}&deg; F</p><p>Humidity: ${points.humidity}%</p>`;
  markers.push(marker);

  var infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.setContent(this.content);
    infoWindow.open(this.getMap(), this);
  });
}
