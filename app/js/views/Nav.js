define([
    'jquery',
    'underscore',
    'backbone',
    'views/abstract',
    'templates'
], function($,
    _,
    Backbone,
    AbstractView,
    JST) {

    'use strict';

    var NavView = AbstractView.extend({
        className: 'Nav',
        template: JST['app/js/templates/Nav.ejs'],

        events: {
            'click .logo': 'toIntro',
            'click .work': 'toWork',
            'click .about': 'toAbout',
            'click .photo': 'toPhoto'
        },

        /* ----------------------------------------------------------------------------- *\
           Public Methods
        \* ----------------------------------------------------------------------------- */

        /**
        @method initialize

        @return {null}
        **/
        initialize: function(opts) {
            AbstractView.prototype.initialize.apply(this, arguments);
        },

        toIntro: function(){
            Backbone.history.navigate('', true);
        },

        toAbout: function(){
            Backbone.history.navigate('about', true);  
        },

        toWork: function(){
            Backbone.history.navigate('work', true);
        },

        toPhoto: function(){
            Backbone.history.navigate('photo', true);
        },

        /**
        @method render

        @return {NavView}
        **/
        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });

    return NavView;
});