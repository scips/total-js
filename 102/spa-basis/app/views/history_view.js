'use strict';

var View = require('./view');
var store = require('lib/persistence');

module.exports = View.extend({
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
        'checkins:add': 'insertCheckIn'
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
    }
});