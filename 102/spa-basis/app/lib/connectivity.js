// Détection online/offline
// ========================

'use strict';

var $ = require('jquery');
var Backbone = require('backbone');

// Ce module encapsule la gestion de la connectivité
// (états online/offline du navigateur) à destination des
// divers éléments externes (notamment la couche de persistence
// et les exploitations d'API externes type Google Maps / Places).

// On publie une seule méthode : isOnline.  Indique le bon état en
// live sur à peu près tous les browsers modernes.
var isOnline = function() {
  return true;
};

var isOffline = function() {
  return !isOnline();
};

var checkStatus = function checkStatus() {
  Backbone.Mediator.publish(isOnline() ? 'connectivity:online' : 'connectivity:offline');
  Backbone.Mediator.publish('connectivity:change');
};

if ('undefined' !== navigator && 'onLine' in navigator) {
  isOnline = function() {
    return navigator.onLine;
  };
  $(window).on('online offline', checkStatus);
  checkStatus();
}

module.exports = {
  isOnline: isOnline,
  isOffline: isOffline
};