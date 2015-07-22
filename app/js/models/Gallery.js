define([
    'underscore',
    'backbone',
    'collections/Photo'
], function(_,
    Backbone,
    Photos) {

    'use strict';

    var GalleryModel = Backbone.Model.extend({
        defaults: {
			name: '',
			slug: '',
			photo: false,
			photos: null,
			desc: ''
        }
    });

    return GalleryModel;
});