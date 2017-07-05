'use strict';

var app = app || {};

(function(module) {
  var pageView = {};

  pageView.about = () => {
    $('.tab-content').hide();
    $('.about').show();
  }

  pageView.home = () => {
    $('.tab-content').hide();
    $('.entries').show();
    $('.map').show();
  }

  pageView.contact = () => {
    $('.tab-content').hide();
    $('.contact-us').show();
  }

  module.pageView = pageView;
}(app));
