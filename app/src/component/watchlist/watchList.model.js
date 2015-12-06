define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        Common = require('/js/common.js');


    return Backbone.Model.extend({

        urlRoot : function () {
            return Common.UMOVIE_API_BASE_URL + 'watchlists';
        },

        parse : function(data) {
            var movies = _.map(data.movies, function(movie) {
                var poster = movie.artworkUrl100;

                if (poster) {
                    poster = poster.replace('100x100', '400x400');
                } else {
                    poster = 'http://placehold.it/342x514?text=Void'
                }
                return {
                    id: movie.trackId,
                    poster: poster,
                    title: movie.trackName
                }
            });

            var title = '';

            if (!data.name) {
                title = '';
            } else {
                title = data.name.trim();
            }
            
            title = title || '[Nanashi-SansNom]';
            
            return {
                id: data.id,
                title: title,
                movies: data.movies,
                simpleMovies: movies
            };
        }
    });
});
