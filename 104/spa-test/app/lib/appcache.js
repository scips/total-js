'use strict';

var $ = require('jquery');

if (window.applicationCache) {
  window.applicationCache.addEventListener(
    'updateready',
    function() {
      $('#reloadPrompt').modal({
        show: true
      });
    });
}