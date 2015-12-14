'use strict';

// option pour jshint globals
/* global describe, before, beforeEach, it */
var chai = require('chai');
var sinon = require('sinon');

describe('The home view', function() {

  var homeView;

  before(function() {
    chai.should();
  }); // Avant l'ensemble du `describe`

  beforeEach(function() {
    var HomeView = require('views/home_view');
    homeView = new HomeView().render();
  }); // Avant chaque `it`

  // Et aussi : `after`, `afterEach`

  it('should render the clock at startup', function() {
    var clock = sinon.useFakeTimers(1412507461204); // Reset à un moment donné + gel
    clock.tick(1000);
    clock.restore();
  });

});