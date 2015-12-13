define(function(require){

    'use strict';

    var Common = require('/js/common.js');

    return {
        searchActorId: function(query, callback, failCallback) {
            var searchActorUrl = Common.UMOVIE_API_BASE_URL + 'search/actors?q=' + encodeURIComponent(query);

            $.get(searchActorUrl, function(searchResult) {
                if (searchResult.results[0]) {
                    callback(searchResult.results[0].artistId);
                } else {
                    failCallback();
                }
            });
        },

        searchMovie : function(query, callback) {
            var searchURL = Common.UMOVIE_API_BASE_URL + 'search/movies?limit=1&q=' + encodeURIComponent(query);

            var movie = {
                title : undefined,
                id : undefined,
                img : undefined
            };

            var search = $.get(searchURL);

            search.done(function(searchResult){
                if(searchResult.results[0]){
                    var result = searchResult.results[0];
                    movie = {
                        title : result.trackName,
                        id : result.trackId,
                        img : result.artworkUrl100.replace('100x100','400x400')
                    };
                }
                callback(movie);
            });

            search.fail(function(){
                callback(movie);
            });
        }
    };
});
