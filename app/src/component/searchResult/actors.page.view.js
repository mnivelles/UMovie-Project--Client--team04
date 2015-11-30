define(function (require) {

    'use strict';


    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        actorsTemplate = 'actorResult.page.nunj.html',
        _ = require('underscore'),
        Actors = require('search.actors.model'),
        TMDb = require('TMDbSearch');


    return Backbone.View.extend({

        events: function() {
            return {
                'click .mediaSection--hideShowButton': 'toggleMediaSection'
            }
        },

        render: function (options){
            var self = this;
            self.searchString = options.searchString;
            var actors = new Actors(self.searchString);
            actors.fetch({
                success : function(result) {
                    var actors = self.format(result);
                    var displayCount = actors.length;
                    var actorsList = [];
                    for(var i= 0; i < displayCount; i++){
                        actorsList.push(actors[i]);
                    }
                    self.display(actorsList);

                    $('.mediaSection--hideShowButton', self.el).click(function() {
                        self.toggleMediaSectionParentOfElement($(this));
                    });
                }
            });

            return this;
        },

        toggleMediaSection: function(event) {
            this.toggleMediaSectionParentOfElement($(event.currentTarget));
        },

        format : function(rawActorList) {
            var self = this;
            var actorList = [];
            _.each(rawActorList.toJSON(), function(actor) {
                TMDb.searchActor(actor.artistName, function (tmdbActor) {
                    actorList.push(
                        {
                            id: actor.artistId,
                            name : actor.artistName,
                            portrait :tmdbActor.img
                        }
                    );
                    self.display(actorList);

                }, function() {
                    actorList.push(
                        {
                            id: actor.artistId,
                            name : actor.artistName,
                            portrait :"/image/imageNotFound.png"
                        }
                    );
                });

            });
            return actorList;
        },

        display : function(actors) {
            var self = this;
            var html = Nunjucks.render(actorsTemplate, { actors : actors});
            self.$el.html(html);
        }
    });

});


