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

    var PhotoView = AbstractView.extend({
        className: 'Photo',
        template: JST['app/js/templates/Photo.ejs'],

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
            this.listenTo(this.model, 'change', this.render);
        },

        /**
        @method render

        @return {PhotoView}
        **/
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.img = this.$('img');
            this.overlay = this.$('#overlay');
            this.img.on('load', function(){
                this.$el.addClass('show');
                this.overlay.height(this.img.height());
            }.bind(this));
            return this;
        }
    });

    return PhotoView;
});