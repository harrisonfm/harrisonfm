define([
    'underscore',
    'backbone'
], function(_,
    Backbone) {

    'use strict';

    var JobModel = Backbone.Model.extend({
        defaults: {
			title: '',
			thumb: '',
			desc: '',
            url: ''
        }
    });

    return JobModel;
});