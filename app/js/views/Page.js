define([
    'jquery',
    'underscore',
    'backbone',
    'views/abstract',
    'templates',
    'tweenmax'
], function($,
    _,
    Backbone,
    AbstractView,
    JST,
    TweenMax) {

    'use strict';

    var PageView = AbstractView.extend({
        events: {},

        /* ----------------------------------------------------------------------------- *\
           Public Methods
        \* ----------------------------------------------------------------------------- */

        /**
        @method initialize

        @return {null}
        **/
        initialize: function(opts) {
            AbstractView.prototype.initialize.apply(this, arguments);
            _.bindAll(this, 'hide', 'endAnimate');
        },

        hide: function(nextView){
            this.nextView = nextView;
            var leaving = this.className,
                goingTo = this.nextView.className;

            if(leaving.indexOf('Intro') !== -1){
                if(goingTo.indexOf('Work') !== -1){
                    this.animate('up');
                }
                else if(goingTo.indexOf('About') !== -1){
                    this.animate('down');
                }
                else if(goingTo.indexOf('Gallery') !== -1){
                    this.animate('left');
                }
            }
            else if(leaving.indexOf('Work') !== -1){
                if(goingTo.indexOf('Intro') !== -1 || goingTo.indexOf('About') !== -1){
                    this.animate('down');
                }
                else if(goingTo.indexOf('Gallery') !== -1){
                    this.animate('left');
                }
            }
            else if(leaving.indexOf('Gallery') !== -1){
                if(goingTo.indexOf('Intro') !== -1){
                    this.animate('right');
                }
                else if(goingTo.indexOf('Work') !== -1){
                    this.animate('up');
                }
                else if(goingTo.indexOf('About') !== -1){
                    this.animate('down');
                }
            }
            else if(leaving.indexOf('About') !== -1){
                if(goingTo.indexOf('Intro') !== -1 || goingTo.indexOf('Work') !== -1){
                    this.animate('up');
                }
                else if(goingTo.indexOf('Gallery') !== -1){
                    this.animate('left');
                }
            }
        },

        animate: function(direction){
            Backbone.isTransitioning = true;
            var css = {
                opacity: 0,
                onComplete: this.endAnimate
            };
            switch(direction){
                case 'up':
                    _.extend(css, {
                        top: '-'+window.innerHeight,
                        bottom: window.innerHeight
                    });
                    break;
                case 'down':
                    _.extend(css, {
                        top: window.innerHeight,
                        bottom: '-'+window.innerHeight
                    });
                    break;
                case 'left':
                    _.extend(css, {
                        left: '-'+window.innerWidth,
                        right: window.innerWidth
                    });
                    break;
                case 'right':
                    _.extend(css, {
                        left: window.innerWidth,
                        right: '-'+window.innerWidth
                    });
                    break;
                default:
                    console.log('wrong transition');
            }
            TweenMax.to(this.el, 0.7, css);
        },

        endAnimate: function(){
            this.nextView.$el.addClass('current-view');
            this.nextView.doneTransitioning();
            Backbone.isTransitioning = false;
            this.clean();
        },

        doneTransitioning: function() {
        },

        setMetaTags: function(title, description, image) {
            $('meta[property="og:title"]').remove();
            $('head').append( '<meta name="og:title" content="'+title+'">' );
            document.title = title;

            $('meta[property="og:description"]').remove();
            $('head').append( '<meta name="og:description" content="'+description+'">' );

            $('meta[property="og:image"]').remove();
            $('head').append( '<meta name="og:image" content="'+image+'">' );
        },

        /**
        @method render

        @return {PageView}
        **/
        render: function() {
            this.$el.html(this.template());

            return this;
        }
    });

    return PageView;
});