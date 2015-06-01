define([
    'jquery',
    'underscore',
    'backbone',
    'views/Page',
    'views/Nav',
    'views/Loader',
    'tweenmax',
    'templates'
], function($,
    _,
    Backbone,
    PageView,
    NavView,
    LoaderView,
    TweenMax,
    JST) {

    'use strict';

    var AboutView = PageView.extend({
        className: 'About page',

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
            this.getAuthorInfo();
            _.bindAll(this, 'loadingDone');
            Backbone.pubSub.on('loadingDone', this.loadingDone);
        },

        /**
        @method render

        @return {AboutView}
        **/
        render: function() {
            this.$el.prepend([this.navView.render().el, this.loaderView.render().el]);
            return this;
        },

        getAuthorInfo: function() {
            $.getJSON(Backbone.api, {
                    json: 'get_author_index',
                    author_meta: 'twitter,facebook,spotify,steam,instagram,author_profile_picture,user_email'
                },
                function(response){
                    var author = response.authors[0];
                    var append = '<div class="about-container"><img id="me" src="'+author.author_profile_picture+'">';
                    append += '<section>'+author.description.replace(/[\n\r]/g, '<br>')+'</section>';
                    append += '<footer><a href="mailto:'+author.user_email+'">E-mail</a> <a href="'+author.instagram+'" target="_blank">Instagram</a> <a href="'+author.spotify+'" target="_blank">Spotify</a> <a href="'+author.twitter+'" target="_blank">Twitter</a> <a href="'+author.facebook+'" target="_blank">Facebook</a> <a href="'+author.steam+'" target="_blank">Steam</a></footer></div>';
                    this.loaderView.startLoad(0);
                    this.$el.append(append);
                }.bind(this)
            );
        },

        loadingDone: function(){
            var objects = [this.navView.el, this.$('.about-container')[0], [this.$('footer')[0], this.$('#me')[0]]];
            TweenMax.staggerTo(objects, 0.5, {opacity: 1}, 0.5);
        }
    });

    return AboutView;
});