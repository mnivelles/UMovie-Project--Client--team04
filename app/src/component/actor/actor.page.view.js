define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        template = 'actor.page.nunj.html',
        Actor = require('actor.model'),
        imageSearch = require('TMDbImageSearch');
    require('https://apis.google.com/js/client.js?onload=googleApiClientReady');

    return Backbone.View.extend({

        render: function (id) {
            var self = this;
            var actor = new Actor({artistId:id});
            actor.fetch({
                success: function(result){
                    var actor = result.toJSON();
                    imageSearch(actor.artistName, function(imageUrl){
                        self.display(
                            {
                                name : actor.artistName,
                                primaryGenre : actor.primaryGenreName,
                                iTunesLink : actor.artistLinkUrl,
                                imageUrl : imageUrl
                            }
                        );
                        $('.mediaSection--hideShowButton', self.el).click(function() {
                            self.toggleMediaSectionParentOfElement($(this));
                        });
                    });
                }
            });
            return this;
        },

        display: function(options){
            var self = this;
            var html = Nunjucks.render(template, {
                media: {
                    title: options.name,
                    img: options.imageUrl,
                    mainInformations: [
                        'Primary genre : ' + options.primaryGenre
                    ],
                    itunesLink: options.iTunesLink,
                }
            });
            self.$el.html(html);
        }
    });
});
