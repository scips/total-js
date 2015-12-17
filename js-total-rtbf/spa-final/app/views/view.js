// Classe de contrôleur étendu
// ===========================

'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var helpers = require('lib/view_helper');

// Si chargé depuis les tests…
// …assurer les plugins BS3
require('bootstrap');
// …assurer le data-binding
require('backbone-stickit');

// Classe de base pour toutes les vues.  Fournit quelques
// conventions supplémentaires à celles de Backbone.
module.exports = Backbone.View.extend({
  // À la construction, nos vues *bindent* leurs principales
  // méthodes, de façon à ce qu'on puisse les passer par référence
  // sans perdre le `this`.
  initialize: function() {
    _.bindAll(this, 'template', 'getRenderData', 'render', 'afterRender');
  },

  // Convention 1 : tout traitement sur le DOM de la vue fraîchement
  // injecté doit être placé dans `afterRender`, qui est garantie appelée
  // une fois le HTML désérialisé dans le DOM.
  afterRender: function() {},

  // Convention 2 : le template est alimenté en valeurs par `getRenderData`,
  // laquelle, par défaut, renvoie la version JSON du modèle ou, si le modèle
  // existe mais n'est pas JSONifiable, le modèle lui-même.  Dans la pratique,
  // on surchargera souvent (mais pas tout le temps) cette méthode.
  getRenderData: function getRenderData() {
    return this.model && this.model.toJSON ? this.model.toJSON() : this.model;
  },

  // Surcharge Backbone : toute `Backbone.View` est censée se *renderer* avec
  // sa méthode `render`, mais celle-ci, par défaut, fait juste `return this`.
  // On définit une logique générique de rendering qu'on ne surchargera jamais.
  render: function render() {
    // Primo, on exploite `template`, alimenté par `getRenderData`, pour produire
    // le HTML qu'on injecte alors dans l'élément conteneur.
    this.$el.html(this.renderTemplate(this.getRenderData()));
    // Secundo, si un modèle est défini, on active le *data binding* de
    // Backbone.StickIt.
    if (this.model) {
      this.stickit();
    }
    // Tertio, on déporte tout traitement sur le DOM désérialisé dans `afterRender`
    _.defer(this.afterRender);
    return this;
  },

  // Helper : cette indirection pour le rendering des templates (plutôt que
  // d'appeler les fonctions de template directement) est due à une limitation
  // actuelle de la *runtime* Jade côté client, qui ne permet pas facilement
  // d'enregistrer globalement des *helpers*.  Pour que nos helpers soient
  // systématiquement disponibles dans les vues, on doit donc les injecter à
  // chaque fois.
  //
  // Le deuxième argument est optionnel, et permet d'utiliser une autre fonction
  // de template que celle par défaut (`template`).
  renderTemplate: function renderTemplate(obj, tmpl) {
    tmpl = tmpl || this.template;
    var presenter = $.extend({}, helpers, obj);

    return tmpl(presenter);
  },

  // Convention 3 : le template par défaut est défini dans `template`
  // (qui est une fonction résultant d'un template précompilé par Brunch).
  template: function() {}
});
