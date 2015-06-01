define([
    'jquery',
    'underscore',
    'backbone',
    'views/Intro',
    'views/Work',
    'views/Gallery',
    'views/About',
    'models/Gallery',
    'app'
], function($,
    _,
    Backbone,
    IntroView,
    WorkView,
    GalleryView,
    AboutView,
    Gallery,
    App) {

    'use strict';

    var newView,
        currentView,
        formerView,
        firstView = true,
        galleryView,
        galleryModel = new Gallery(),

    Router = Backbone.Router.extend({
        routes: {
            '': 'intro',
            'work': 'work',
            'photo': 'gallery',
            'about': 'about',
            'photo/:gallery': 'gallery',
            'photo/:gallery/:photo': 'gallery'
        }
    }),

    initialize = function() {
        var router = new Router();

        router.on('route:intro', intro);
        router.on('route:work', work);
        router.on('route:about', about);
        router.on('route:gallery', gallery);

        var opts = {};

        if(Backbone.isDev !== true){
            opts = {
                pushState: true
            };
        }

        if(!Backbone.history.start(opts)){
            intro();
        }
    },

    intro = function() {
        var introView = new IntroView();
        showView(introView);
    },

    about = function() {
        var aboutView = new AboutView();
        showView(aboutView);
    },

    work = function() {
        var workView = new WorkView();
        showView(workView);
    },

    gallery = function(gallery, photo) {
        var opts;
        if(gallery && photo){
            opts = {
                photo: photo,
                slug: gallery
            };
        }
        else if(gallery){
            opts = {
                photo: null,
                slug: gallery
            };
        }
        else{
            opts = {
                photo: null,
                slug: null
            };
        }
        if(!currentView || currentView.className.indexOf('Gallery') === -1){
            galleryModel.set(opts);
            galleryView = new GalleryView({
                model: galleryModel
            });
            showView(galleryView);
        }
        else{
            galleryView.model.set(opts);
        }
    },

    showView = function(view) {
        if(view === currentView){
            return;
        }
        newView = view;
        formerView = currentView;

        //(currentView) ? currentView.hide(showNext) : showNext();
        showNext();
    },

    showNext = function() {
        currentView = newView;
        $('body').append(currentView.render().el);
        if(firstView || Backbone.isTransitioning){
            currentView.$el.addClass('current-view');
            currentView.doneTransitioning();
            firstView = false;
            Backbone.isTransitioning = false;
        }

        if(formerView){
            formerView.hide(currentView);
        }
    };

    return {
        initialize: initialize
    };
});