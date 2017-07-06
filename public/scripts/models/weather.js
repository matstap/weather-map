'use strict';

// var lat = 47.57;
// var lon = -122.65;
var api_key = 'd03ed117124fd765f370b5417fedbb03'

function Weather(obj) {
  this.description = obj.weather[0].description;
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
    $.get('/weather?lat=' + item.lat() + '&lon=' + item.lng() + '&appid=' + api_key + '&units=imperial', function(data) {
      temp = new Weather(data);
      console.log(data);
      weatherObj.push(temp);
      callback(weatherObj);
    });
  });
}
