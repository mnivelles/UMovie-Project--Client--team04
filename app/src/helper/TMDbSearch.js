define(function(require){

    'use strict';

    var Common = require('/js/common.js'),
        imageWidth = 342,
        imageBaseUrl = 'http://image.tmdb.org/t/p/w' + imageWidth,
        defaultImageURI = 'http://dummyimage.com/342x514/cccccc/4d4d4d&text='+ encodeURIComponent('Image not found :(');

    return {
        searchActor: function(query, callback, failCallback) {
            var searchActorUrl = Common.TMDB_API_BASE_URL + 'search/person?query=' + encodeURIComponent(query) + '&api_key=' + Common.TMDB_API_KEY;

            $.get(searchActorUrl, function(searchResult) {
                if (searchResult.results[0]) {
                    var actorId = searchResult.results[0].id;

                    var actorUrl = Common.TMDB_API_BASE_URL + 'person/' + actorId + '?api_key=' + Common.TMDB_API_KEY;

                    $.get(actorUrl, function(actorResult) {
                        var imageURI = actorResult.profile_path ? imageBaseUrl + actorResult.profile_path + '?api_key=' + Common.TMDB_API_KEY : defaultImageURI;

                        callback({
                            biography: actorResult.biography,
                            img: imageURI,
                            birthday: actorResult.birthday,
                            placeOfBirth: actorResult.place_of_birth,
                            homepage: actorResult.homepage
                        });
                    });
                } else {
                    failCallback();
                }
            });
        },

        searchMovie: function(query, callback, failCallback) {
            var searchMovieUrl = Common.TMDB_API_BASE_URL + 'search/movie?query=' + encodeURIComponent(query) + '&api_key=' + Common.TMDB_API_KEY;

            $.get(searchMovieUrl, function(searchResult) {
                if (searchResult.results[0]) {
                    var movieId = searchResult.results[0].id;

                    var movieUrl = Common.TMDB_API_BASE_URL + 'movie/' + movieId + '?append_to_response=trailers,credits&api_key=' + Common.TMDB_API_KEY;

                    $.get(movieUrl, function(movieResult) {
                        callback({
                            homepage: movieResult.homepage,
                            tagline: movieResult.tagline,
                            actors: _.take(movieResult.credits.cast, 20),
                            crew: _.take(movieResult.credits.crew, 12)
                        });
                    });
                } else {
                    failCallback();
                }
            });
        }
    };
});
