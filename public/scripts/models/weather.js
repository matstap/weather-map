'use strict';

function Weather(obj) {
  this.description = obj.currently;
  this.name = obj.city;
  this.temp = obj.temp;
  this.humidity = obj.humidity;
  this.icon = obj.thumbnail;
}

function getWeather(arr, callback) {
  var weatherObj;
  arr.map(item => {
    let currLocation = `${item.lat()},${item.lng()}`;
    $.simpleWeather({
      location: currLocation,
      weoid: '',
      unit: 'f',
      success: function (data) {
        weatherObj = new Weather(data);
        weatherObj.lat = item.lat();
        weatherObj.lng = item.lng();
        callback(weatherObj);
      }
    });
  });
}
