// Tests Mocha : couche de persistance
// ===================================

'use strict';

/* global describe, it, before, beforeEach, afterEach */

var chai = require('chai');
var sinon = require('sinon');

describe('The persistence layer', function() {
  before(function envSetup() {
    chai.should();
    var Backbone = require('backbone');
    var cheerio = require('cheerio');
    Backbone.$ = cheerio.load('<body></body>');
    require('externals/backbone-mediator');
    Backbone.$.ajax = function() {};
    global.navigator = {};
  });

  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    clock.restore();
  });

  it('should guarantee a per-ms unique key on every check-in object', function() {
    var store = require('lib/persistence');
    store.addCheckIn({ name: 'L’Amphytrion' });

    var checkIns = store.getCheckIns();
    checkIns.should.have.length(1, 'The check-in was not added!');
    checkIns[0].should.contain.keys('name', 'key');
    var firstKey = checkIns[0].key;

    clock.tick(1);
    store.addCheckIn({ name: 'La Rotonde' });
    checkIns = store.getCheckIns();
    checkIns.should.have.length(2, 'The check-in was not added!');
    checkIns[0].should.have.property('key', firstKey + 1);
  });
});
