// Contrôleur zone historique
// ==========================

'use strict';

var Backbone = require('backbone');
var View = require('./view');
var store = require('lib/persistence');

module.exports = View.extend({
  // Événements DOM
  // --------------
  events: {
    'click li': 'showCheckInDetails'
  },

  // Événements applicatifs
  // ----------------------
  subscriptions: {
    'checkins:new': 'insertCheckIn',
    'checkins:reset': 'render'
  },

  // Templates
  // ---------

  // Le template interne pour la liste et ses éléments
  listTemplate: require('./templates/check_ins'),
  // Le template principal
  template: require('./templates/history'),

  // Convention définie par notre classe mère View pour `render` : on
  // peuple le template principal avec ces données.
  getRenderData: function() {
    return {
      list: this.renderTemplate({ checkIns: store.getCheckIns() }, this.listTemplate)
    };
  },

  // Réagit à la notif de nouveau check-in en l'insérant en haut
  // de la liste.
  insertCheckIn: function(checkIn) {
    checkIn.extra_class = 'new';
    var markup = this.renderTemplate({ checkIns: [checkIn] }, this.listTemplate);
    var list = this.$('#history');
    list.prepend(markup);
    setTimeout(function() {
      list.find('li.new').removeClass('new');
    }, 15);
  },

  // Réagit aux clics sur les élements de l'historique en affichant
  // la boîte de dialogue de détails, via routage.
  showCheckInDetails: function showCheckInDetails(e) {
    var id = this.$(e.currentTarget).attr('data-id');
    if (!id) {
      return;
    }

    Backbone.history.navigate('check-in/' + id, { trigger: true });
  }
});
