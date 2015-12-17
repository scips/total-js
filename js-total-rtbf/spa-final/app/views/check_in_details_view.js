// Contrôleur détails de check-ins
// ===============================

'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var View = require('./view');

var CheckInDetailsView = View.extend({
  // On va laisser `Backbone.View` (dont on hérite) construire un élément
  // d'enrobage pertinent, en l'occurrence un `<div id="checkInDetails" class="modal fade">`.
  // Pour ce faire, on utilise les propriétés prédéfinies `className` et `id`.
  className: 'modal fade',

  // Tout type de fermeture du modal par Bootstrap doit aboutir à un traitement complémentaire
  // qu'on colle dans `wrapUp`. On récupère l'event lancé par Bootstrap http://getbootstrap.com/javascript/#modals-events
  events: {
    'hidden.bs.modal': 'wrapUp'
  },

  id: 'checkInDetails',
  template: require('./templates/check_in_details'),

  wrapUp: function wrapUp() {
    // …et si ce n'est pas une annulation due à une URL obsolète/incorrecte de check-in,
    // donc plutôt une fermeture manuelle du dialogue, naviguer normalement vers la home
    // (mais comme elle est déjà renderée, inutile de déclencher la méthode de routeur associée).
    if (!cancelling) {
      Backbone.history.navigate('');
    }
    cancelling = false;
  }
});

var singleton = new CheckInDetailsView(), cancelling = false;

// Annulation d'un éventuel dialogue, en cas d'URL de check-in introuvable ou incorrect.
// Comme le dialogue n'est pas forcément visible, on n'aura pas forcément d'événement
// `hidden` déclenché, donc on fait la nav de remplacement ici.
function cancelCheckInDetails() {
  cancelling = true;
  singleton.$el.modal('hide');
  Backbone.history.navigate('', { replace: true });
}

// Affichage (1er appel ) ou mise à jour (changement d'URL alors que le modal est affiché)
// du dialogue sur base d'un modèle de check-in fourni par le routeur.  On n'aura pas d'animation
// si le dialogue est déjà là, mais ce n'est pas plus mal.
function displayCheckInDetails(model) {
  singleton.model = model;
  singleton.render();
  // singleton.el est un pointeur DOM : même si on l'inclue 2 fois, il n'est pas dupliqué
  $('body').append(singleton.el);
  singleton.$el.modal('show');
}

module.exports = {
  cancel: cancelCheckInDetails,
  display: displayCheckInDetails
};
