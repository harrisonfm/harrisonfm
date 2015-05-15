define([
    'underscore',
    'backbone'
], function(_,
    Backbone) {

    'use strict';

    var PhotoModel = Backbone.Model.extend({
        defaults: {
			title: '',
            slug: '',
            url: '',
            thumb: ''
        }
    });

    return PhotoModel;
});