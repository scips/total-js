// Contrôleur principal
// ====================

'use strict';

var View = require('./view');
var userName = require('lib/notifications').userName;
var formatedDate = require('lib/clock');
var CheckInView = require('./check_in_view');
var HistoryView = require('./history_view');
var connectivity = require('lib/connectivity');

module.exports = View.extend({
    // Le template principal
    template: require('./templates/home'),
    subscriptions: {
        'connectivity:change': 'syncMarker'
    },
    getRenderData: function() {
        return {
            userName: userName,
            now: formatedDate.now()
        };
    },
    afterRender: function afterHomeRender() {
        this.startClock();
        this.syncMarker();
        this.checkInView = new CheckInView({
            el: this.$('#checkInUI')
        });
        this.checkInView.render();
        this.historyView = new HistoryView({
            el: this.$('#historyUI')
        });
        this.historyView.render();
    },
    startClock: function startClock() {
        var clock = this.$('#ticker');
        this.clockInterval = setInterval((function setIntervalUpdateClock() {
            clock.text(formatedDate.now());
        }).bind(this), 1000);
    },
    syncMarker: function syncMarker() {
        this.$marker = this.$marker || this.$('#onlineMarker');
        this.$marker[connectivity.isOnline() ? 'show' : 'hide']();
    }
});