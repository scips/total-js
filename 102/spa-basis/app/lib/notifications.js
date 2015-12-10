'use strict';

var $ = require('jquery');
var _ = require('underscore');

var userName = sessionStorage.getItem('userName');
if (userName === null) {
    if ((userName = prompt("What's your name?")) !== null) {
        userName = $.trim(userName);
        sessionStorage.setItem('userName', userName);
    } else {
        userName = 'Anonymous' + _.random(1000, 10000);
    }
}

exports.userName = userName;