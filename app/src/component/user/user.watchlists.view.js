define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        template = 'user.watchlists.nunj.html',
        WatchLists = require('user.watchlists.model');

    return Backbone.View.extend({

        render : function(id){
            var self = this;
            var watchlists = new WatchLists(id);
            watchlists.fetch({
                success : function(result) {
                    var collection = result.toJSON();
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
