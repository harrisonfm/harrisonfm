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

    var ThumbView = AbstractView.extend({
        className: 'Thumb',
        template: JST['app/js/templates/Thumb.ejs'],

        events: {
            'click': 'enlarge'
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

        /**
        @method render

        @return {ThumbView}
        **/
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        enlarge: function() {
            if(window.innerWidth <= 820){
                return false;
            }
            Backbone.pubSub.trigger('enlarge', this.model);
        }
    });

    return ThumbView;
});