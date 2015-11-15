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
        }
    };
});
