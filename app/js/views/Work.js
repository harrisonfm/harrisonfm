define([
    'jquery',
    'underscore',
    'backbone',
    'views/Page',
    'templates',
    'views/Job',
    'views/Nav',
    'views/Loader',
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
    LoaderView,
    TweenMax,
    Job,
    Jobs) {

    'use strict';

    var WorkView = PageView.extend({
        className: 'Work page',
        template: JST['app/js/templates/Work.ejs'],

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
            this.loaderView = new LoaderView();
            this.getJobs();
            _.bindAll(this, 'appendJob', 'loadingDone');
            Backbone.pubSub.on('loadingDone', this.loadingDone);
        },

        /**
        @method render

        @return {WorkView}
        **/
        render: function() {
            this.$el.append([this.template(), this.navView.render().el, this.loaderView.render().el]);
            this.cacheSelectors();
            return this;
        },

        cacheSelectors: function() {
            this.workContainer = this.$('.work-container');
        },

        getJobs: function() {
            this.collection = new Jobs();
            this.collection.fetch({
                data: {
                    json: 'get_page',
                    slug: 'work'
                }
            }).done(function(){
                this.loaderView.startLoad(this.collection.length);
                this.collection.each(this.appendJob, this);
            }.bind(this));
        },

        appendJob: function(element) {
            var jobView = new JobView({
                model : element,
                attributes: {
                    href: element.get('url'),
                    target: '_blank'
                }
            });
            this.workContainer.append(jobView.render().el);
            jobView.$('img').on('load', this.loaderView.increment);
        },

        revealJobs: function(){
            TweenMax.staggerTo(this.$('.Job'), 0.4, {opacity: 1}, 0.4);
        },

        loadingDone: function(){
            var objects = [this.navView.el, this.$('.work-container')];
            TweenMax.to(objects, 0.4, {
                opacity: 1,  
                onComplete: this.revealJobs,
                onCompleteScope: this
            });
        },

        clean: function(){
            $('svg').remove();
            PageView.prototype.clean.apply(this, arguments);
        }
    });

    return WorkView;
});