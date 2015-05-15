define([
    'jquery',
    'underscore',
    'backbone',
    'views/Page',
    'templates',
    'views/Nav',
    'views/Loader',
    'tweenmax'
], function($,
    _,
    Backbone,
    PageView,
    JST,
    NavView,
    LoaderView,
    TweenMax) {

    'use strict';

    var IntroView = PageView.extend({
        className: 'Intro page',
        template: JST['app/js/templates/Intro.ejs'],

        events: {},

        /* ----------------------------------------------------------------------------- *\
           Public Methods
        \* ----------------------------------------------------------------------------- */

        /**
        @method initialize

        @return {null}
        **/
        initialize: function(opts) {
            PageView.prototype.initialize.apply(this, arguments);
            _.bindAll(this, 'loadingDone');
            this.navView = new NavView();
            this.loaderView = new LoaderView();
            $.getJSON(Backbone.api, {
                json: 'get_page',
                slug: 'intro'
            }, function(res){
                this.loaderView.startLoad(1);
                var url = res.page.thumbnail_images.full.url;
                this.bg.css('background-image', 'url('+url+')');
                this.preload = $('<img src="'+url+'" />');
                this.preload.on('load', this.loaderView.increment);
            }.bind(this));
            Backbone.pubSub.on('loadingDone', this.loadingDone);
        },

        /**
        @method render

        @return {IntroView}
        **/
        render: function() {
            this.$el.html(this.template());
            this.$el.append(this.loaderView.render().el);
            this.$el.append(this.navView.render().el);
            this.bg = this.$('.bg');
            return this;
        },

        loadingDone: function() {
            var objects = [this.bg[0], this.$('.logo')[0], this.$('.Nav')[0]];
            TweenMax.staggerTo(objects, 0.8, {opacity: 1, delay: 0.2, onStart: this.startReveal}, 0.8);
        }
    });

    return IntroView;
});