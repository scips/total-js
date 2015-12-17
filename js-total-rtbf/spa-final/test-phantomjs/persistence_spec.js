/* global describe, it, before, beforeEach, afterEach, sinon */

describe("The persistence layer", function() {
  var xhr;
  var _, store;

  before(function envSetup() {
    // Env setup
    var Backbone = require('backbone');
    Backbone.$ = require('jquery');
    require('backbone-mediator');
    _ = require('underscore');
  });

  beforeEach(function testSetup() {
    // Mocks & Isolation
    xhr = sinon.fakeServer.create();

    // Test subjects
    localStorage.clear();
    store = require('lib/persistence');
    // All fetch requests get cleared (empty replies)
    _.chain(xhr.requests).where({ method: 'GET' }).each(function(req) {
      req.respond(200, { 'Content-Type': 'application/json' }, '[]');
    });
  });

  afterEach(function testTearDown() {
    // Mocks & Isolation teardown
    xhr.restore();
  });

  it("should properly merge sync-based data in the local cache", function(done) {
    var subject = { name: 'L’Amphitryon' };
    store.addCheckIn(subject);
    var req = _(xhr.requests).findWhere({ method: 'POST' });

    req.respond(201, { 'Content-Type': 'application/json' }, '{"id":42}');
    store.test.getLocalStore(function(checkIns) {
      checkIns.should.have.length(1, 'The check-in was not added!');
      checkIns[0].should.have.property('id', 42);
      done();
    });
  });
});
