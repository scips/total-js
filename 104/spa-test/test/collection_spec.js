'use strict';

// option pour jshint globals
/* global describe, before, beforeEach, it */
var chai = require('chai');

describe('The collection', function() {
  var collection;
  before(function() {
    chai.should();
  }); // Avant l'ensemble du `describe`

  beforeEach(function() {
    var Collection = require('models/collection');
    collection = new Collection();
  }); // Avant chaque `it`

  // Et aussi : `after`, `afterEach`

  it('should maintain the natural order', function() {
    // Setup du test et assertions ici
    var expected = [{
      key: Date.now() + 10000
    }, {
      key: Date.now()
    }, {
      key: Date.now() - 10000
    }];
    // add them in an alternate order to be sure that you don't have a false result
    collection.add(expected[0]); // (-10000)
    collection.add(expected[2]); // (+10000)
    collection.add(expected[1]); // (0)

    collection.at(0).toJSON().should.deep.equal(expected[0]);
    collection.at(1).toJSON().should.deep.equal(expected[1]);
    collection.at(2).toJSON().should.deep.equal(expected[2]);
    // comparing the whole stuff
    collection.toJSON().should.deep.equal(expected);
  });

});