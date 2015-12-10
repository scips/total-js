'use strict';

var CheckInsCollection = require('models/collection');
var collection = new CheckInsCollection();
var Backbone = require('backbone');
var connectivity = require('lib/connectivity');
var _ = require('underscore');
var Lawnchair = require('lawnchair');
require('lawnchair-dom');

var pendings = [];

var localStore = new Lawnchair({
  name: 'checkins'
}, function() {});

collection.intialize();

// local first
var initialLoad = function initialLoad() {
  localStore.all(function(checkins) {
    collection.reset(checkins);
    syncPending();
  });
};

var accountForSync = function accountForSync(model) {
  pendings = _.without(pendings, model);
  if (pendings.length) return;

  collection.off('sync', accountForSync);
  collection.fetch({
    reset: true
  });
};

var syncPending = function syncPending() {
  if (!connectivity.isOnline()) return;

  collection.off('sync', accountForSync);
  pendings = collection.filter(function(c) {
    return c.isNew();
  });
  if (pendings.length) {
    collection.on('sync', accountForSync);
    _.invoke(pendings, 'save');
  } else {
    collection.fetch({
      reset: true
    });
  }
};

var addCheckIn = function addCheckIn(checkIn) {
  console.log('add checkin received ', checkIn);
  checkIn.key = checkIn.key || Date.now();
  // add va créé un objet d'après le Model par défaut de la collection
  collection[('id' in checkIn) ? 'add' : 'create'](checkIn);
};

var getCheckIns = function getCheckIns() {
  return collection.toJSON();
};

var getCheckIn = function getCheckIn(id) {
  return collection.get(id);
};

initialLoad();

collection.on('reset', function() {
  localStore.nuke(function() {
    localStore.batch(collection.toJSON());
  });
  Backbone.Mediator.publish('checkins:reset');
});
collection.on('add', function(model) {
  localStore.save(model.toJSON());
  Backbone.Mediator.publish('checkins:add', model.toJSON());
});
collection.on('sync', function(model) {
  if (!(model instanceof collection.model)) {
    return;
  }
  localStore.save(model.toJSON());
});


// exports.addCheckIn = addCheckIn;

module.exports = {
  addCheckIn: addCheckIn,
  getCheckIns: getCheckIns,
  syncPending: syncPending,
  accountForSync: accountForSync,
  getCheckIn: getCheckIn
};