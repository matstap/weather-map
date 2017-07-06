'use strict';

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

function getWeather(arr, callback) {
  var weatherObj;
  arr.map(item => {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + item.lat() + '&lon=' + item.lng() + '&appid=' + api_key + '&units=imperial', function(data) {
      weatherObj = new Weather(data);
      callback(weatherObj);
    });
  });
}
