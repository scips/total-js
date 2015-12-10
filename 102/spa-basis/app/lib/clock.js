'use strict';

var moment = require('moment');

var clock = function clock() {
    return moment().format('dddd D MMMM YYYY HH:mm:ss');
};

exports.now = clock;