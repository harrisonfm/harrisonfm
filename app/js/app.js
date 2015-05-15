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
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});