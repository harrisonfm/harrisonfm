define([
    'jquery',
    'underscore',
    'backbone',
    'views/Page',
    'views/Nav',
    'tweenmax',
    'templates'
], function($,
    _,
    Backbone,
    PageView,
    NavView,
    TweenMax,
    JST) {

    'use strict';

    var AboutView = PageView.extend({
        className: 'About page',
        template: JST['app/js/templates/About.ejs'],

        events: {
        },

        /* ----------------------------------------------------------------------------- *\
           Public Methods
        \* ----------------------------------------------------------------------------- */

        /**
        @method initialize

        @return {null}
        **/
        initialize: function(opts) {
            PageView.prototype.initialize.apply(this, arguments);
            this.navView = new NavView();
        },

        /**
        @method render

        @return {AboutView}
        **/
        render: function() {
            this.$el.html(this.template());
            this.$el.prepend(this.navView.render().el);

            return this;
        },

        doneTransitioning: function(){
            var objects = [this.navView.el, this.$('.about-container')[0], [this.$('footer')[0], this.$('.me')[0]]];
            TweenMax.staggerTo(objects, 0.5, {opacity: 1}, 0.5);
        }
    });

    return AboutView;
});