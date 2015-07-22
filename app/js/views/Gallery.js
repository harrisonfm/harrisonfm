define([
    'jquery',
    'underscore',
    'backbone',
    'views/Page',
    'views/Nav',
    'views/Thumb',
    'views/Photo',
    'views/Category',
    'views/Loader',
    'collections/Gallery',
    'models/Gallery',
    'templates',
], function($,
    _,
    Backbone,
    PageView,
    NavView,
    ThumbView,
    PhotoView,
    CategoryView,
    LoaderView,
    Galleries,
    Gallery,
    JST) {

    'use strict';

    var GalleryView = PageView.extend({
        className: 'Gallery page',
        template: JST['app/js/templates/Gallery.ejs'],
        currentPhoto: null,

        events: {
            'click .return': 'routeReturn',
            'click .next': 'next',
            'click .prev': 'prev',
            'click .expand': 'expandGalleries'
        },

        /* ----------------------------------------------------------------------------- *\
           Public Methods
        \* ----------------------------------------------------------------------------- */

        /**
        @method initialize

        @return {null}
        **/
        initialize: function(opts) {
            PageView.prototype.initialize.apply(this, arguments);
            this.setGalleries();
            this.navView = new NavView();
            this.loaderView = new LoaderView();
            _.bindAll(this, 'displayPhoto', 'adjustSlideHeight', 'enlarge', 'responsiveResize', 'loadingDone');
            Backbone.pubSub.on('enlarge', this.enlarge);
            Backbone.pubSub.on('loadingDone', this.loadingDone);
            $(window).on('resize', this.responsiveResize);
            this.setResponsiveFlag();
        },

        setResponsiveFlag: function(){
            this.isSmallView = window.innerWidth < 821 ? true : false;
        },

        responsiveResize: _.debounce(function(){
            if(this.isSmallView && window.innerWidth > 820){
                this.galleryList.css('display', '');
                if(this.slides.is(':empty')){
                    this.routeReturn();
                }
            }
            else if(!this.isSmallView){
                this.galleryList.css('display', '');
                this.routeReturn();
            }
            this.setResponsiveFlag();
        }, 300),

        /**
        @method render

        @return {GalleryView}
        **/
        render: function() {
            this.$el.html(this.template());
            this.cacheSelectors();
            this.$('aside').prepend(this.navView.render().el);
            this.section.append(this.loaderView.render().el);
            return this;
        },

        cacheSelectors: function() {
            this.section = this.$('section');
            this.slides = this.$('#slides');
            this.thumbnails = this.$('#thumbnails');
            this.title = this.$('#title');
            this.galleryList = this.$('.gallery-list');
            this.controls = this.$('.controls');
            this.footer = this.$('aside footer');
        },

        setGalleries: function() {
            this.collection = new Galleries();
            this.collection.fetch({
                data: {
                    json: 1,
                    category_name: 'gallery'
                }
            }).done(function(){
                this.addAllGalleries();
                this.setPhotos();
                this.listenTo(this.model, 'change:slug', this.setPhotos);
                this.listenTo(this.model, 'change:photo', this.setPhotoForSlug);
            }.bind(this));
        },

        initializeLoader: function(length){
            if(!this.$el.find('.Loader').length){
                this.loaderView = new LoaderView();
                this.section.append(this.loaderView.render().el);
            }
            this.loaderView.startLoad(length);
        },

        loadingDone: function(){
            if(this.model.get('photo') && window.innerWidth < 821){
                var offset = this.$el.find('#'+this.model.get('photo')).offset();
                $('html,body').animate({ scrollTop: offset.top - 10 }, 400);
            }
        },

        addAllGalleries: function() {
            this.collection.each(this.addOneGallery, this);
            this.galleryList.addClass('show');
        },

        addOneGallery: function(element) {
            var categoryView,
            opts = {
                model: element,
                id: element.get('slug'),
            };
            if(element.get('parent')){
                this.galleryList.find('#'+element.get('parent')).addClass('parent');
                categoryView = new CategoryView(opts);
                this.galleryList.find('#'+element.get('parent')+'> ul').append(categoryView.render().el);
            }
            else{
                categoryView = new CategoryView(opts);
                this.galleryList.append(categoryView.render().el);
            }
        },

        addAllThumbnails: function() {
            window.scrollTo(0,0);
            this.thumbnails.empty();
            this.model.get('photos').each(this.addOneThumbnail, this);
        },

        addOneThumbnail: function(element) {
            var thumbView = new ThumbView({model: element, id: element.get('slug')});
            this.thumbnails.append(thumbView.render().el);
            thumbView.$el.find('img').on('load', function(){
                this.loaderView.increment();
            }.bind(this));
        },

        enlarge: function(photo){
            var slug = !this.model.get('slug') ? 'highlights' : this.model.get('slug');
            Backbone.history.navigate('photo/'+slug+'/'+photo.get('slug'), true);
        },

        setPhotos: function(){
            if((this.model.previous('slug') === null && this.model.get('slug') === 'highlights') || 
                (this.model.get('slug') === null && this.model.previous('slug') === 'highlights')){
                return;
            }

            var gallery = this.collection.findWhere({slug: this.model.get('slug')});
            if(typeof gallery === 'undefined'){
                gallery = this.collection.findWhere({slug: 'highlights'});
            }

            this.model.set({
                photos: gallery.get('photos'),
                desc: gallery.get('desc'),
            });

            var length = this.model.get('photo') ? this.model.get('photos').length + 1 : this.model.get('photos').length; 
            this.initializeLoader(length);
            
            this.addAllThumbnails();
            if(this.model.get('photo')){
                this.setPhotoForSlug();
            }
            else{
                this.updateDescription(this.model.get('desc'));
            }
            if(window.innerWidth <= 820){
                this.galleryList.slideUp();
            }
        },

        updateDescription: function(text){
            this.title.text(text);
            this.footer.addClass('show');
        },

        setPhotoForSlug: function(){
            this.footer.removeClass('show');
            if(this.model.get('photo')){
                if(this.model.get('photos') && window.innerWidth > 820){
                    this.displayPhoto(this.model.get('photos').findWhere({slug: this.model.get('photo')}));
                }
            }
            else{
                this.toThumbs();
            }
        },

        routeReturn: function(){
            if(this.model.get('slug') === 'highlights' || this.model.get('slug') === null){
                Backbone.history.navigate('photo', true);
            }
            else{
                Backbone.history.navigate('photo/'+this.model.get('slug'), true);
            }            
        },

        toThumbs: function(){
            this.controls.hide();
            this.slides.empty();
            this.thumbnails.fadeIn();
            if(this.photoView){
                this.photoView.clean();
                this.photoView = null;    
            }
            this.updateDescription(this.model.get('desc'));
            $(window).off('resize', this.adjustSlideHeight);
            window.scrollTo(0, 0);
        },

        adjustSlideHeight: _.debounce(function(){
            this.slides.height(window.innerHeight - 20);
            if(this.photoView){
                this.photoView.overlay.height(this.photoView.img.height());    
            }            
        }, 300),

        next: function(){
            var index = this.model.get('photos').indexOf(this.photoView.model) + 1;
            var photo = this.model.get('photos').at(index) || this.model.get('photos').at(0);
            Backbone.history.navigate('photo/'+this.model.get('slug')+'/'+photo.get('slug'), true);
        },

        prev: function(){
            var index = this.model.get('photos').indexOf(this.photoView.model) - 1;
            var photo = this.model.get('photos').at(index) || this.model.get('photos').at(this.model.get('photos').length - 1);
            Backbone.history.navigate('photo/'+this.model.get('slug')+'/'+photo.get('slug'), true);
        },

        displayPhoto: function(photo){
            if(!this.photoView){
                this.thumbnails.hide();
                this.slides.height(window.innerHeight - 20);
                $(window).on('resize', this.adjustSlideHeight);
            }
            this.photoView = this.photoView || new PhotoView({model: photo});
            this.photoView.model = photo;
            this.slides.append(this.photoView.render().el);
            if(!this.$el.find('.Loader').length){
                this.initializeLoader(1);
            }
            this.photoView.img.on('load', function(){
                this.loaderView.increment();
            }.bind(this));
            this.updateDescription(photo.get('title'));
            this.controls.show();
        },

        expandGalleries: function(){
            if(this.galleryList.is(':visible')){
                this.galleryList.slideUp({easing: 'linear'});
            }
            else{
                this.galleryList.slideDown({easing: 'linear'});
            }            
        },

        clean: function(){
            $(window).off('resize');
            PageView.prototype.clean.apply(this, arguments);
        }
    });

    return GalleryView;
});