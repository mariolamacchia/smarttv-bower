(function(window, $, io) {
  'use strict';

  var smarttv = {};
  window.smarttv = smarttv;

  // Socket
  var socket = io.connect('/');
  smarttv.send = io.send;
  smarttv.on = io.on;

  // Apps
  $.get('/api/apps', function(apps) {
    smarttv.apps = apps;
  });
  smarttv.showApp = function(app) {
    window.location.href = '/' + app;
  };
  smarttv.pressKey = function(key) {
    sendEvent('keyDown', key);
    sendEvent('keyUp', key);

    function sendEvent(type, key) {
      $.ajax('http://192.168.0.212:8000/api/inputs', {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          type: type,
          keyCode: key
        })
      });
    }
  };

  // Hidden keyboard
  $(document).ready(function() {
    $('body').append(
      $('<input type=text id="st-hidden-input">')
        .width(window.innerWidth)
        .css('position', 'absolute')
        .css('top', '-100%')
    );
  });
  smarttv.showKeyboard = function() {
    $('#st-hidden-input').focus();
  };

})(window, $, io);
