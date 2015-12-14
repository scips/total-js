//
// Checkin view
//

'use strict';

var View = require('./view');
var locSvc = require('lib/location');
var poiSvc = require('lib/places');
var CheckInUX = require('models/check_in_ux');
var userName = require('lib/notifications').userName;
var store = require('lib/persistence');

module.exports = View.extend({
  subscriptions: {
    'connectivity:online': 'fetchPlaces'
  },
  bindings: {
    '#comment': 'comment',
    '#geoloc': {
      observe: ['lat', 'long'],
      onGet: function checkInViewOnGetGeoloc(values) {
        if (values[0] === 0) {
          return null;
        }
        return values[0] + ", " + values[1];
      }
    },
    '#places': {
      observe: ['places', 'placeId'],
      onGet: function checkInViewOnGetPlaces() {
        return this.getRenderData().placeList;
      },
      updateMethod: 'html'
    },
    'button[type=submit]': {
      attributes: [{
        observe: 'checkInDisabled',
        name: 'disabled'
      }]
    },
    'header button': {
      attributes: [{
        observe: 'fetchPlacesDisabled',
        name: 'disabled'
      }]
    }
  },
  events: {
    // event selector
    'click .btn-info': 'fetchPlaces',
    'click #places li': 'selectPlace',
    'submit': 'checkIn'
  },
  template: require('./templates/check_in'),
  templateItem: require('./templates/places'),
  initialize: function checkInViewInitialise() {
    View.prototype.initialize.apply(this, arguments);
    this.model = new CheckInUX();
  },
  getRenderData: function checkInGetRenderData() {
    return {
      placeList: this.renderTemplate({
        places: this.model.get('places'),
        placeId: this.model.get('placeId')
      }, this.templateItem)
    };
  },
  afterRender: function afterCheckInRender() {
    this.fetchPlaces();
  },
  fetchPlaces: function fetchPlaces() {
    this.model.reset();
    console.log("fetch place");
    locSvc.getCurrentLocation(function fetchPlaceCallback(lat, long) {
      if (arguments.length < 2) {
        return;
      }
      poiSvc.lookupPlaces(lat, long, function lookupCallback(places) {
        this.model.set('places', places);
        this.model.set({
          lat: lat,
          long: long
        });
      }.bind(this));
    }.bind(this));
  },
  selectPlace: function selectPlace(e) {
    var $currentEl = this.$(e.currentTarget);
    var placeId = $currentEl.data('place-id');
    this.model.set('placeId', placeId);
  },
  checkIn: function checkIn(e) {
    e.preventDefault();
    if (this.model.get('checkInForbidden'))
      return;
    var place = this.model.getPlace();
    var checkIn = {
      placeId: place.id,
      vicinity: place.vicinity,
      icon: place.icon,
      name: place.name,
      comment: this.model.get('comment'),
      userName: userName
    };
    this.model.resetOnSubmit();
    store.addCheckIn(checkIn);
  }
});