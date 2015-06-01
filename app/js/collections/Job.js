define([
    'underscore',
    'backbone',
    'models/Job'
], function(_,
    Backbone,
    Job) {

    'use strict';

    var JobCollection = Backbone.Collection.extend({
        model: Job,
        url: function(){
            return Backbone.api;
        },
        parse: function(response){
            var parsed = [],
            job,
            jobCaption,
            jobs = response.page.content.split('</figure>');
            for(var i = 0, max = jobs.length - 1; i < max; i++){
                job = jobs[i].substring(jobs[i].indexOf('src="')+5);
                job = job.substring(0, job.indexOf('" width'));
                jobCaption = job.substring(job.indexOf('alt="')+5).split('|');
                parsed.push(new Job({
                    thumb: job.substring(0,job.indexOf('"')),
                    title: jobCaption[0],
                    desc: jobCaption[1],
                    url: jobCaption[2]
                }));
            }
            return parsed;
        }
    });

    return JobCollection;
});