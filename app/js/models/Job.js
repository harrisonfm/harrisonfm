define([
    'underscore',
    'backbone'
], function(_,
    Backbone) {

    'use strict';

    var JobModel = Backbone.Model.extend({
        defaults: {
			'title': 'LoremIpsum.com',
			'thumb': '',
			'desc': 'made this website',
            'url': 'http://loremipsum.com'
        }
    });

    return JobModel;
});