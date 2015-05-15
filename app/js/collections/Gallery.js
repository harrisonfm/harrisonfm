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
        parse: function(response){
            var parsed = [],
            gallery = {},
            galleries,
            photos,
            content,
            image,
            desc,
            orientation;

            for(var i = 0; i < response.posts.length; i++){
                photos = [];
                content = $('<div>'+response.posts[i].content+'</div>');
                desc = content.find('p').text();
                galleries = content.find('img');
                for(var j = 0; j < galleries.length; j++){
                    image = galleries[j];
                    photos.push(new Photo({
                        title: image.alt,
                        slug: image.alt.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''),
                        url: image.src.replace(/-[\d]{3}x[\d]{3}/, ''),
                        thumb: image.src
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