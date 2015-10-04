define(function (require) {

    "use strict";

    var TvShow = Backbone.Model.extend({

            urlRoot: "http://umovie.herokuapp.com/tvshows/season",

            initialize: function () {
                this.episodes = new TvShowCollection();
                this.episodes.url = this.urlRoot + "/" + this.id + "/episodes";
            }

        }),

        TvShowCollection = Backbone.Collection.extend({
            model: TvShow,
            url: "http://umovie.herokuapp.com/tvshows/season"
        });

    return {
        TvShow: TvShow,
        TvShowCollection: TvShowCollection
    };

});
