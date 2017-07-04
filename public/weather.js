'use strict';

var lat = 47.57;
var lon = -122.65;
var api_key = 'd03ed117124fd765f370b5417fedbb03'
//var text = '{"coord":{"lon":-122.65,"lat":47.57},"weather":[{"id":701,"main":"Mist","description":"mist","icon":"50d"}],"base":"stations","main":{"temp":286.92,"pressure":1023,"humidity":87,"temp_min":285.15,"temp_max":289.15},"visibility":16093,"wind":{"speed":1.42,"deg":199.504},"clouds":{"all":90},"dt":1499100960,"sys":{"type":1,"id":2923,"message":0.0067,"country":"US","sunrise":1499084346,"sunset":1499141441},"id":5788054,"name":"Bremerton","cod":200}';

function Weather(obj) {
  this.name = obj.name;
  this.temp = obj.main.temp;
  this.humidity = obj.main.humidity;
  this.icon = obj.weather[0].icon;
  this.lat = obj.coord.lat;
  this.lng = obj.coord.lon;
}

var weatherObj = [];


function getWeather(arr, callback) {
  weatherObj = [];
  arr.map((item, ind) => {
    var temp;
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + item.lat() + '&lon=' + item.lng() + '&appid=' + api_key + '&units=imperial', function(data) {
      temp = new Weather(data);
      weatherObj.push(temp);
      console.log('weather weatherObj');
      callback(weatherObj);
    });
  });
}




// weatherObj = $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + api_key + '&units=imperial', function(data) {
//   return data.responseText;
//   //weatherObj = JSON.parse(data);
// });

//var weatherObj = JSON.parse(text);

//console.log(weatherObj);

//
// console.log(weatherObj.name);
// console.log(weatherObj.main.temp);
// // console.log(weatherObj.main.humidity);
//
// $('#city').html(weatherObj.name);
// $('#temp').html(weatherObj.main.temp);
// $('#weather').html(weatherObj.main.humidity);
$('#icon').attr('src', `http://openweathermap.org/img/w/50d.png`);
