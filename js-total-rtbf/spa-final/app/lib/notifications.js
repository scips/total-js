// Notifications WebSockets
// ========================

'use strict';

var $ = require('jquery');
var _ = require('underscore');
var store = require('lib/persistence');
var io = require('socket.io');

// Nom de l'utilisateur
// --------------------

// On le lit dans `sessionStorage`, et si on ne l'y trouve pas
// on le demande à l'utilisateur.
var userName = sessionStorage.userName ||
  $.trim(prompt('Votre nom d’utilisateur'));

if (userName) {
  // On nous en a fourni un non vide ?  On le sauve !
  sessionStorage.userName = userName;
} else {
  // Sinon, coller un anonyme aléatoire, mais ne pas le sauver :
  // on redemandera la fois suivante…
  userName = 'Anonymous' + _.random(1, 1000);
}

exports.userName = userName;

// Web Sockets
// -----------

// On se connecte et on écoute les événements `checkin`
// émis par le serveur, pour les connecter à l'ajout dans
// la couche de persistance.
var socket = io.connect();
socket.on('checkin', store.addCheckIn);
