define(function(require){

    'use strict';

    var Common = require('/js/common.js');
    var imageWidth = 342;
    var imageBaseUrl = 'http://image.tmdb.org/t/p/w' + imageWidth;
    var defaultImageURI = 'http://placehold.it/342x514?text='+ encodeURIComponent('image not found :(');

    return {
        searchActor: function(query, callback) {
            var searchActorUrl = Common.TMDB_API_BASE_URL + 'search/person?query=' + encodeURIComponent(query) + '&api_key=' + Common.TMDB_API_KEY;

            $.get(searchActorUrl, function(searchResult) {
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
            });
        }
    };
});
