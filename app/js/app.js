define([
    'jquery',
    'underscore',
    'backbone',
    'router/router'
], function($,
    _,
    Backbone,
    Router) {

    'use strict';

    var initialize = function() {
        Backbone.pubSub = Backbone.Events;
        if(document.location.href.indexOf('9000') !== -1 || document.location.href.indexOf('8888') !== -1){
            Backbone.isDev = true;
            Backbone.api = 'http://192.168.1.140:8888/hfmapi/';
        }
        else{
            Backbone.api = 'http://harrisonfm.com/api/';
        }
        if(document.documentElement.className.indexOf('lt-ie9') !== -1){
            alert('You are using an unsupported browser. Please check http://browsehappy.com for some modern options you can update to. The site may not work properly otherwise.');
        }
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});