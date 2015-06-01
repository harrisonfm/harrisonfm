define([
    'underscore',
    'backbone',
    'models/Gallery',
    'collections/Photo',
    'models/Photo',
    'jquery'
], function(_,
    Backbone,
    GalleryModel,
    Photos,
    Photo,
    $) {

    'use strict';

    var GalleryCollection = Backbone.Collection.extend({
        model: GalleryModel,
        url: function(){
            return Backbone.api;
        },
        getSubStr: function(str, delim1, delim2) {
            var a = str.indexOf(delim1);
            if (a === -1){
               return '';
            }
            var b = str.indexOf(delim2, a+delim1.length);
            if (b === -1){
               return ''; 
            }
            return str.substr(a+delim1.length, b-a-delim1.length);
        },
        parse: function(response){
            var parsed = [],
            gallery = {},
            galleries,
            photos,
            content,
            src,
            alt,
            desc;

            for(var i = 0; i < response.posts.length; i++){
                photos = [];
                content = response.posts[i].content;
                desc = this.getSubStr(content, '<p>', '</p>');
                galleries = content.split('src="');
                for(var j = 1, max = galleries.length; j < max; j++){
                    src = galleries[j].substr(0,galleries[j].indexOf("\""));
                    alt = this.getSubStr(galleries[j], 'alt="', '"');
                    photos.push(new Photo({
                        title: alt,
                        slug: alt.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''),
                        url: src.replace(/-[\d]{3}x[\d]{3}/, ''),
                        thumb: src
                    }));
                }

                gallery = new GalleryModel({
                    name: response.posts[i].title,
                    slug: response.posts[i].slug,
                    desc: desc,
                    photos: new Photos(photos)
                });
                parsed.push(gallery);
            }
            return parsed;
        }
    });

    return GalleryCollection;
});