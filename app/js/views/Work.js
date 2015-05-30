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
            this.loaderView = new LoaderView();
            this.getJobs();
            _.bindAll(this, 'appendJob', 'loadingDone');
            Backbone.pubSub.on('appendJob', this.appendJob);
            Backbone.pubSub.on('loadingDone', this.loadingDone);
        },

        /**
        @method render

        @return {WorkView}
        **/
        render: function() {
            this.$el.html(this.template());
            this.cacheSelectors();
            this.$el.prepend(this.navView.render().el);
            this.$el.prepend(this.loaderView.render().el);
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
                this.loaderView.startLoad(0);
            }.bind(this));
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

        loadingDone: function(){
            var objects = [this.navView.el, this.$('.work-container')[0]];
            TweenMax.to(objects, 0.4, {
                opacity: 1,  
                onComplete: this.appendJob,
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