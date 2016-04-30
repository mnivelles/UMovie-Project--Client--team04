define(function (require) {

    'use strict';

    return {
        UMOVIE_API_BASE_URL: 'https://umovie.herokuapp.com/unsecure/',
        UMOVIE_API_BASE_URL_SECURED: 'https://umovie.herokuapp.com/',
        TMDB_API_BASE_URL: 'https://api.themoviedb.org/3/',
        TMDB_API_KEY: 'YOUR_TMDB_API_KEY',
        TASTEKID_API_KEY : 'YOUR_TESTEKID_API_KEY',
        REACTIONS_EMOJI_MOVIE_URL: 'https://jsonblob.com/api/jsonBlob/565139c6e4b01190df40ef0a',
        REACTIONS_EMOJI_TVSHOW_URL: 'https://jsonblob.com/api/jsonBlob/565137c2e4b01190df40ef00',
        REACTIONS_EMOJI_WATCHLIST_URL: 'https://jsonblob.com/api/jsonBlob/56513aefe4b01190df40ef10',
        LOGIN_TOKEN_COOKIE: 'LoginToken',
        CURRENT_USER_ID: 'CurrentUserId',
        CURRENT_USER_EMAIL: 'CurrentUserEmail',
        ENTER_KEY: 13,

        getSecuredUrl: function(pathParam, onlyQueryParam) {
            if(onlyQueryParam !== undefined) {
                return this.UMOVIE_API_BASE_URL_SECURED + pathParam + '?access_token=' + $.cookie(this.LOGIN_TOKEN_COOKIE);
            } else {
                return this.UMOVIE_API_BASE_URL_SECURED + pathParam + '&access_token=' + $.cookie(this.LOGIN_TOKEN_COOKIE);
            }
        },

        isUserLoggedIn: function() {
            var self = this;

            return $.ajax({
                url: self.getSecuredUrl('tokenInfo', true),
                type: 'GET'
            });
        }
    };

});
