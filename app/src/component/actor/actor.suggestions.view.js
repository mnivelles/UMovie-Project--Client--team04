define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        MediaCarouselView = require('/js/mediaCarousel.view.js'),
        _ = require('underscore'),
        actorsSuggestionTemplate = 'actor.suggestions.nunj.html',
        SimilarActorSearch = require('TasteKidSearch'),
        iTunes = require('iTunesSearch'),
        TMDb = require('TMDbSearch'),
        Promise = require('bluebird');

    var maxDisplayCount = 10;

    return Backbone.View.extend({

        initializeWithMovieName : function(actorName){
            var self = this;
            self.searchSimilarActorsNames(actorName);
        },

        searchSimilarActorsNames : function(actorName){
            var self = this;
            SimilarActorSearch.searchSimilar(actorName, function(similarActorsList){
                if(similarActorsList.length > 0){
                    self.searchActorListIDs(similarActorsList, function(){

                        var similarActorsWithID = _.filter(similarActorsList, function(actor){
                            return typeof (actor.id) != 'undefined';
                        });

                        self.searchActorListImages(similarActorsWithID, function(){

                            var validSimilarActors = _.filter(similarActorsWithID, function(actor){
                                return typeof (actor.img) != 'undefined';
                            });

                            var actors = validSimilarActors.length> maxDisplayCount ? _.slice(validSimilarActors,0,maxDisplayCount) : validSimilarActors;
                            self.render(actors);
                        });
                    });
                }
            });
        },

        searchActorID : function(actorName, index){
            return new Promise(function(resolve){

                iTunes.searchActorId(actorName, function(actorID){
                   resolve({
                       index : index,
                       id : actorID
                   });
                   }, function(){
                       resolve({
                           index : index,
                           id : undefined
                       });
                   });
            });
        },

        searchActorImage : function(actorName, index){
            return new Promise(function(resolve){

                TMDb.searchActor(actorName, function(actorInfos){
                    resolve({
                        index : index,
                        img : actorInfos.img
                    });
                }, function(){
                    resolve({
                        index: index,
                        img : undefined
                    });
                });
            });
        },

        searchActorListImages : function(actorList, callback){
            var self = this;
            var promises = [];

            for(var i=0; i < actorList.length; i++){
                var promise = self.searchActorImage(actorList[i].Name, i);
                promise.then(function(result){
                    if(typeof (result.img) != 'undefined'){
                        actorList[result.index].img = result.img;
                    }
                });
                promises.push(promise);
            }

            Promise.all(promises).then(function(){
                callback();
            });
        },

        searchActorListIDs : function(actorList, callback){
            var self = this;
            var promises = [];

            for(var i=0; i < actorList.length; i++){
                var promise = self.searchActorID(actorList[i].Name, i);
                promise.then(function(result){
                   if(typeof (result.id) != 'undefined'){
                       actorList[result.index].id = result.id;
                   }
                });
                promises.push(promise);
            }

            Promise.all(promises).then(function(){
                callback();
            });
        },

        render : function(actors){
            var self = this;
            var parsedList = _.map(actors, function(actor){
                return {
                    title : actor.Name,
                    img : actor.img,
                    url : '/actors/'+ actor.id
                }
            });
            var html = Nunjucks.render(actorsSuggestionTemplate);
            self.$el.append(html);

            var topActorCarouselView = new MediaCarouselView({
                el: $('.template-topActorCarousel', self.el),
                collection: parsedList
            });
            topActorCarouselView.render();
        }
    });

});
