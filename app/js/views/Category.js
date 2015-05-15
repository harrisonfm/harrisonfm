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

    var CategoryView = AbstractView.extend({
        tagName: 'li',
        template: JST['app/js/templates/Category.ejs'],

        events: {
            'click': 'routeGallery'
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

        @return {CategoryView}
        **/
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        routeGallery: function(e) {
            Backbone.history.navigate('photo/'+this.model.get('slug'), true);
            e.stopPropagation();
        }
    });

    return CategoryView;
});