define([
    'underscore',
    'backbone',
    'models/Job'
], function(_,
    Backbone,
    JobModel) {

    'use strict';

    var JobCollection = Backbone.Collection.extend({
        model: JobModel,
    });

    return JobCollection;
});