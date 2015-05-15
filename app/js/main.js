'use strict';

require.config({
    shim: {
        tweenmax: {
            exports: 'TweenMax'
        },
        vague: {
            deps: ['jquery'],
            exports: "Vague"
        }
    },
    paths: {
        jquery: '../js/libs/bower/jquery/dist/jquery.min',
        backbone: '../js/libs/bower/backbone/backbone',
        underscore: '../js/libs/bower/underscore/underscore',
        tweenmax: '../js/libs/bower/greensock/src/minified/TweenMax.min',
        vague: '../js/libs/bower/Vague.js/Vague'
    }
});

require([
    'app'
], function (App) {
    window.App = App;

    jQuery(function() {
        App.initialize();
    });
});