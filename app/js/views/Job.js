define([
    'jquery',
    'underscore',
    'backbone',
    'views/abstract',
    'templates',
    'tweenmax',
    'vague'
], function($,
    _,
    Backbone,
    AbstractView,
    JST,
    TweenMax) {

    'use strict';

    var JobView = AbstractView.extend({
        className: 'Job',
        template: JST['app/js/templates/Job.ejs'],

        events: {
            'click': 'openJob',
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
            _.bindAll(this, 'reveal', 'blur');
        },

        /**
        @method render

        @return {JobView}
        **/
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$('img').load(this.reveal);
            return this;
        },

        reveal: function() {
            this.blur();
            TweenMax.to(this.el, 0.5, {opacity: 1, onComplete: this.nextJob});
        },

        nextJob: function() {            
            Backbone.pubSub.trigger('appendJob');
        },

        blur: function(){
            var vague = this.$('img').Vague({
                intensity: 1
            });
            vague.blur();
        },

        openJob: function() {
            window.location = this.model.get('url');
        }
    });

    return JobView;
});