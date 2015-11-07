define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        $ = require('jquery'),
        WatchListCollection = require('/js/watchList.collection.js'),
        template = 'watchList.index.page.nunj.html';

    return Backbone.View.extend({
        initialize: function() {
            this.watchListCollection = new WatchListCollection();
        },

        events: function() {
            return {

            }
        },

        render: function(options) {
            var self = this;

            this.watchListCollection = new WatchListCollection();

            this.watchListCollection.fetch({
                success: function(result) {
                    var collection = _.map(result.models, function(watchList) {
                        return watchList.toJSON();
                    });

                    var html = Nunjucks.render(template, {
                        watchListCollection: collection
                    });
                    self.$el.html(html);
                }
            });

            return this;
        }
    });

});
