define([
    'jquery',
    'underscore',
    'backbone',
    'views/abstract',
    'templates',
    'tweenmax'
], function($,
    _,
    Backbone,
    AbstractView,
    JST,
    TweenMax) {

    'use strict';

    var LoaderView = AbstractView.extend({
        className: 'Loader',
        template: JST['app/js/templates/Loader.ejs'],
        loaderIndex: 0,

        events: {},

        /* ----------------------------------------------------------------------------- *\
           Public Methods
        \* ----------------------------------------------------------------------------- */

        /**
        @method initialize

        @return {null}
        **/
        initialize: function(opts) {
            AbstractView.prototype.initialize.apply(this, arguments);
            _.bindAll(this, 'increment');
        },

        /**
        @method render

        @return {LoaderView}
        **/
        render: function() {
            this.$el.html(this.template());
            this.progressBar = this.$('.bar');
            return this;
        },

        startLoad: function(length) {
            this.loaderLength = length + 1;
            this.animateDistance = 300 / this.loaderLength;
            this.increment();
        },

        increment: function(){
            TweenMax.to(this.progressBar, 0.4, {
                width: this.animateDistance * ++this.loaderIndex, 
                onComplete: this.concludeLoad,
                onCompleteScope: this
            });
        },

        concludeLoad: function(){
            if(this.progressBar.width() >= 300){
                Backbone.pubSub.trigger('loadingDone');
                this.clean();
            }
        }
    });

    return LoaderView;
});