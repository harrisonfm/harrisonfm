define([
    'jquery',
    'underscore',
    'backbone',
    'views/Page',
    'templates',
    'views/Job',
    'views/Nav',
    'tweenmax',
    'models/Job',
    'collections/Job',
], function($,
    _,
    Backbone,
    PageView,
    JST,
    JobView,
    NavView,
    TweenMax,
    Job,
    Jobs) {

    'use strict';

    var WorkView = PageView.extend({
        className: 'Work page',
        template: JST['app/js/templates/Work.ejs'],
        index: 0,

        events: {},

        /* ----------------------------------------------------------------------------- *\
           Public Methods
        \* ----------------------------------------------------------------------------- */

        /**
        @method initialize

        @return {null}
        **/
        initialize: function(opts) {
            PageView.prototype.initialize.apply(this, arguments);
            this.navView = new NavView();
            this.getJobs();
            _.bindAll(this, 'appendJob');
            Backbone.pubSub.on('appendJob', this.appendJob);
        },

        /**
        @method render

        @return {WorkView}
        **/
        render: function() {
            this.$el.html(this.template());
            this.cacheSelectors();
            this.$el.prepend(this.navView.render().el);
            this.appendJob();
            return this;
        },

        cacheSelectors: function() {
            this.workContainer = this.$('.work-container');
        },

        getJobs: function() {
            var jobArr = [
                new Job({
                    title: 'PB Art',
                    thumb: 'pbart.png',
                    desc: '2015, Frontend, Backbone',
                    url: 'http://www.peanutbutter.com/yippee/skippyart/'
                }),
                new Job({
                    title: 'Neat Beet',
                    thumb: 'neatbeet.png',
                    desc: '2014, Design, Development',
                    url: 'http://neatbeet.com'
                }),
                new Job({
                    title: 'Spotify Artists',
                    thumb: 'spotify.png',
                    desc: '2014, Backend, Wordpress',
                    url: 'http://spotifyartists.com'
                }),
                new Job({
                    title: 'Mandela Moments',
                    thumb: 'mandela.png',
                    desc: '2013, Backend, PHP/Imagemagick',
                    url: 'http://mandelafilm.com/moments'
                }),
                new Job({
                    title: 'Frame to Fame',
                    thumb: 'mofam.png',
                    desc: '2013, Backend, PHP/Imagemagick',
                    url: 'www.usanetwork.com/modernfamily/frametofame'
                }),
                new Job({
                    title: 'Mad Men Motto',
                    thumb: 'madmen.png',
                    desc: '2013, Backend, PHP/JS',
                    url: 'http://www.amctv.com/framed-games/madmenmotto/tab.php'
                }),
            ];
            this.collection = new Jobs(jobArr);
        },

        appendJob: function() {
            if(!this.collection.at(this.index)){
                return;
            }
            var jobView = new JobView({
                model : this.collection.at(this.index)
            });
            this.index++;
            this.workContainer.append(jobView.render().el);
        },

        doneTransitioning: function(){
            var objects = [this.navView.el, this.$('.work-container')[0]];
            TweenMax.to(objects, 0.4, {opacity: 1});
        },

        clean: function(){
            $('svg').remove();
            PageView.prototype.clean.apply(this, arguments);
        }
    });

    return WorkView;
});