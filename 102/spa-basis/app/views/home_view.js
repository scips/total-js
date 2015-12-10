// Contrôleur principal
// ====================

'use strict';

var View = require('./view');
var userName = require('lib/notifications').userName;
var formatedDate = require('lib/clock');
var CheckInView = require('./check_in_view');

module.exports = View.extend({
    // Le template principal
    template: require('./templates/home'),
    getRenderData: function() {
        return {
            userName: userName,
            now: formatedDate.now()
        };
    },
    afterRender: function afterHomeRender() {
        this.startClock();
        this.checkInView = new CheckInView({
            el: this.$('#checkInUI')
        });
        this.checkInView.render();
    },
    startClock: function startClock() {
        var clock = this.$('#ticker');
        this.clockInterval = setInterval((function setIntervalUpdateClock() {
            clock.text(formatedDate.now());
        }).bind(this), 1000);
    }
});