/*
// Configuration pour le bonus 2 : dépendance à jQuery
requirejs.config({
    paths: {
        jquery: 'jquery-1.10.0'
    }
});
*/

require(['one', 'two', 'three'], function(one, two, three) {
  one();
  two();
  three();
});
