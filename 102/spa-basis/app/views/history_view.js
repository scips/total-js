'use strict';

var View = require('./view');
var store = require('lib/persistence');
var Backbone = require('backbone');

module.exports = View.extend({
    events: {
        'click li[data-id]': 'showCheckInDetails'
    },
    // Le template principal
    template: require('./templates/history'),
    templateItem: require('./templates/check_ins'),
    getRenderData: function() {
        return {
            list: this.renderTemplate({
                checkIns: store.getCheckIns()
            }, this.templateItem)
        };
    },
    afterRender: function afterHomeRender() {},
    subscriptions: {
        'checkins:reset': 'render',
        'checkins:add': 'insertCheckIn',
        'checkins:saved': 'updateId'
    },
    insertCheckIn: function insertCheckIn(model) {
        model.extra_class = 'new';
        var itemHtml = this.renderTemplate({
            checkIns: [model]
        }, this.templateItem);
        this.$el.find('#history').prepend(itemHtml);
        setTimeout(function() {
            this.$el.find('li.new').removeClass('new');
        }.bind(this), 1);
    },
    showCheckInDetails: function showCheckInDetails(e) {
        var id = this.$(e.currentTarget).data('id');
        if (!id) {
            return;
        }

        Backbone.history.navigate('check-in/' + id, {
            trigger: true
        });
    },
    updateId: function updateId(checkIn) {
        this.$('li[data-cid="' + checkIn.cid + '"]').
        attr('data-id', checkIn.id).removeAttr('data-cid');
    }
});