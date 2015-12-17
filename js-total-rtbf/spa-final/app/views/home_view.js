// Contrôleur principal
// ====================

'use strict';

var moment = require('moment');
var View = require('./view');
var CheckInView = require('./check_in_view');
var HistoryView = require('./history_view');
var cnxSvc = require('lib/connectivity');
var userName = require('lib/notifications').userName;

module.exports = View.extend({
  // Événements applicatifs
  // ----------------------
  subscriptions: {
    'connectivity:online': 'syncMarker',
    'connectivity:offline': 'syncMarker'
  },

  // Templates
  // ---------

  // Le template principal
  template: require('./templates/home'),

  // Après le rendering complet (initial), on procède aux initialisations
  // de comportements et injections des vues imbriquées
  afterRender: function afterHomeRender() {
    // On met en cache le marqueur online/offline et on lui colle un tooltip façon Bootstrap
    this.syncMarker();
    // On lance l'horloge (en haut à droite)
    this.startClock();
    // On initialise et on render à la volée les deux vues imbriquées
    new CheckInView({ el: this.$('#checkInUI') }).render();
    new HistoryView({ el: this.$('#historyUI') }).render();
  },

  // Convention définie par notre classe mère View pour render : on
  // peuple le template principal avec ces données.
  getRenderData: function getHomeRenderData() {
    return {
      // Moment.js c'est que du bonheur…
      now: moment().format('dddd D MMMM YYYY HH:mm:ss'),
      userName: userName
    };
  },

  // Lancement de l'horloge.  Un simple setInterval suffit…
  startClock: function startClock() {
    var clock = this.$('#ticker');
    var that = this;
    setInterval(function() {
      clock.text(that.getRenderData().now);
    }, 1000);
  },

  // Réaction à la notif de passage online/offline : on ajuste le marqueur
  syncMarker: function syncMarker() {
    this.$onlineMarker = this.$onlineMarker || this.$('#onlineMarker').tooltip({ placement: 'bottom' });
    this.$onlineMarker[cnxSvc.isOnline() ? 'show' : 'hide']('fast');
  }
});
