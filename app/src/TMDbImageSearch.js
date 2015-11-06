define(function(require){

    'use strict';

    var Common = require('/js/common.js');
    var imageWidth = 342;
    var imageBaseUrl = 'http://image.tmdb.org/t/p/w' + imageWidth;
    var defaultImageURI = 'http://placehold.it/342x514?text='+ encodeURIComponent('image not found :(');

    return function actorImageSearch(query, callback) {

        var url = Common.TMDB_API_BASE_URL + 'search/person?query='+ encodeURIComponent(query) +'&api_key='+ Common.TMDB_API_KEY;

        $.get(url, function(result) {
            var actorProfile = result.results[0];
            var imageURI = actorProfile.profile_path ? imageBaseUrl + actorProfile.profile_path + '?api_key=' + Common.TMDB_API_KEY : defaultImageURI;
            callback(imageURI);
        });
    }
});
