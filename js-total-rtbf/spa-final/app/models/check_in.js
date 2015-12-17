// Modèle : CheckIn
// ================

'use strict';

var Backbone = require('backbone');
var cnxSvc = require('lib/connectivity');

// Bon, on n'a *rien* à rajouter aux capacités inhérentes
// de Backbone.Model, mais c'est toujours mieux de prévoir un
// module par modèle et par collection, donc voilà.

module.exports = Backbone.Model.extend({
  // Surcharge du gestionnaire Backbone de persistence.  Primo, pour
  // éviter toute requête XHR alors qu'on est offline.
  sync: function syncCheckIn(method, model, options) {
    if (!cnxSvc.isOnline()) {
      return;
    }

    return Backbone.sync(method, model, options);
  }
});
