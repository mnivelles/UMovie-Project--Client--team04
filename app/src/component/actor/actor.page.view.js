define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        template = 'actor.page.nunj.html',
        ActorModel = require('actor.model'),
        imageSearch = require('TMDbImageSearch');
    require('https://apis.google.com/js/client.js?onload=googleApiClientReady');

    return Backbone.View.extend({

        render: function (id) {
            var self = this;
            var actor = new ActorModel({artistId:id});
            actor.fetch({
                success: function(result){
                    self.actor = result.toJSON();
                    imageSearch(self.actor.artistName, function(imageUrl){
                        self.display(imageUrl);
                        $('.mediaSection--hideShowButton', self.el).click(function() {
                            self.toggleMediaSectionParentOfElement($(this));
                        });
                        //this.hideMediaSectionForSmallScreen();
                    });
                }
            });
            return this;
        },

        display: function(imageUrl){
            var self = this;
            var html = Nunjucks.render(template, {
                media: {
                    title: self.actor.artistName,
                    img: imageUrl,
                    mainInformations: [
                        'Primary genre : ' + self.actor.primaryGenreName
                    ],
                    itunesLink: self.actor.artistLinkUrl,
                }
            });
            self.$el.html(html);
        }
    });
});
