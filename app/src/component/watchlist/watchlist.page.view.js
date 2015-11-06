define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        Common = require('/js/common.js'),
        template = 'watchList.page.nunj.html';

    var WatchListModel = Backbone.Model.extend({

        urlRoot : function () {
            return Common.UMOVIE_API_BASE_URL + 'watchlists';
        },

        parse : function(data) {
            return {
                movies: data.movies
            };
        }
    });

    return Backbone.View.extend({

        render: function(options) {
            var self = this;

            var watchList = new WatchListModel({id: options.id});

            watchList.fetch().done(function(data) {
                console.log(data.movies);

                var html = Nunjucks.render(template, {
                    watchList: {
                        title: data.name,
                        movies: data.movies
                    }
                });
                self.$el.html(html);
            });

            return this;
        }
    });

});
