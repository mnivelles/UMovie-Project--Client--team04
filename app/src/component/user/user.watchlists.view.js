define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        Nunjucks = require('nunjucks'),
        template = 'user.watchlists.nunj.html',
        WatchListCollection = require('/js/watchList.collection.js');

    return Backbone.View.extend({

        render : function(id){
            var self = this;
            var watchListCollection = new WatchListCollection();
            watchListCollection.fetch({
                success : function(result) {
                    var collection = _.filter(result.models, function(element) {
                        var owner = element.get('owner');
                        if (owner) {
                            return owner.id == id;
                        }
                        return false;
                    });
                    var collectionSorted = _.map(_.sortBy(collection, function (watchList) {
                        return watchList.get('title').toLowerCase();
                    }), function (watchList) {
                        var watchListJSON = watchList.toJSON();
                        watchListJSON.showIsOwner = false;
                        return watchListJSON;
                    });

                    var html = Nunjucks.render(template, {
                        watchListCollection: collectionSorted
                    });
                    self.$el.html(html);
                }
            });

            return this;
        }
    });
});
