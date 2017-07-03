'use strict';

var app = app || {};

(function(module) {
  var pageView = {};

pageView.navigation = () => {
  $('#icon-menu').on('click', () => {
    $(this).toggleClass('active');
  });
}

pageView.loadMap = () => {
  //Callback function for google maps ajax Call
}

pageView.loadWeather = () => {
  //Callback function for weather api ajax call
}

pageView.about = () => {
  $('.tab-content').hide();
  $('.about').show();
}

  module.pageView = pageView;
}(app));
