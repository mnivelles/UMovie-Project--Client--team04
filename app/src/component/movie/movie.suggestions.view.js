define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        Promise = require('bluebird'),
        _ = require('underscore'),
        iTunes = require('iTunesSearch'),
        SimilarMoviesSearch = require('TasteKidSearch'),
        MediaCarouselView = require('/js/mediaCarousel.view.js'),
        moviesSuggestionTemplate = 'movie.suggestions.nunj.html';

    var maxDisplayCount = 10;

    return Backbone.View.extend({

        initializeWithMovieTitle : function(title){
            var self = this;
            self.searchSimilarMovies(title);
        },

        searchSimilarMovies : function(title){
            var self = this;
            SimilarMoviesSearch.searchSimilar(title, function(similarMoviesList){
                if(similarMoviesList.length > 0){
                    self.searchMovies(similarMoviesList, function(result){
                        var movies = result.length > maxDisplayCount ? _.slice(result,0,maxDisplayCount) : result;
                        self.render(movies);
                    });
                }
            });
        },

        searchMovie : function(title){
            return new Promise(function(resolve){
                iTunes.searchMovie(title,function(movie){
                    resolve(movie);
                });
            });
        },

        searchMovies : function(moviesList, callback){
            var self = this;
            var promises = [];
            var results = [];
            for(var i=0; i< moviesList.length; i++){
                var promise = self.searchMovie(moviesList[i].Name);
                promise.then(function(movie){
                    if(typeof (movie.id) != 'undefined'){
                        results.push(movie);
                    }
                });
                promises.push(promise);
            }

            Promise.all(promises).then(function(){
                callback(results);
            });
        },

        render : function(movies){
            var self = this;
            var parsedList = _.map(movies, function(movie){
                return{
                    title: movie.title,
                    url : "/movies/" + movie.id,
                    img : movie.img
                }
            });

            var html = Nunjucks.render(moviesSuggestionTemplate);
            self.$el.append(html);

            var topMovieCarouselView = new MediaCarouselView({
                el: $('.template-topMovieCarousel', self.el),
                collection: parsedList
            });
            topMovieCarouselView.render();
        }
    });
});
