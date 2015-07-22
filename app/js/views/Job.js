define([
    'jquery',
    'underscore',
    'backbone',
    'views/abstract',
    'templates',
    'vague'
], function($,
    _,
    Backbone,
    AbstractView,
    JST) {

    'use strict';

    var JobView = AbstractView.extend({
        tagName: 'a',
        template: JST['app/js/templates/Job.ejs'],

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

        /**
        @method render

        @return {JobView}
        **/
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.blur();
            return this;
        },

        blur: function(){
            var vague = this.$('img').Vague({
                intensity: 1
            });
            vague.blur();
        }
    });

    return JobView;
});