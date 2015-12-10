// Modèle : CheckInUx
// ==================

'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
  defaults: {
    lat: 0,
    long: 0,
    places: [],
    placeId: null,
    comment: '',
    checkInDisabled: true
  },
  initialize: function initialize() {
    var modelOnChangePlaceId = function modelOnChangePlaceId() {
      var checkInDisabled = this.get('placeId') === null;
      this.set('checkInDisabled', checkInDisabled);
    }.bind(this);
    this.on('change:placeId', modelOnChangePlaceId);
  },
  getPlace: function modelGetPlace() {
    return _.findWhere(
      this.get('places'), {
        id: this.get('placeId')
      }
    );
  },
  reset: function reset() {
    this.set(this.defaults);
  },
  resetOnSubmit: function resetOnSubmit() {
    this.set({
      placeId: this.defaults.placeId,
      comment: this.defaults.comment
    });
  }
});