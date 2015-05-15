define([
    'underscore',
    'backbone',
    'models/Photo'
], function(_,
    Backbone,
    PhotoModel) {

    'use strict';

    var PhotoCollection = Backbone.Collection.extend({
        model: PhotoModel
    });

    return PhotoCollection;
});