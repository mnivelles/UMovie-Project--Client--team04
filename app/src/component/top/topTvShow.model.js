define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore');;

    var tvShowBaseUrl = '/tv-shows/';

    return Backbone.Model.extend({
        parse : function(data) {
            var img = _.where(data['im:image'], {attributes: {
                height: "170"
            }
            })[0]['label'];
            var tvShow = {
                title: data['im:name']['label'],
                img: img.replace("100x100", "200x200"),
                url: tvShowBaseUrl + data['id']['attributes']['im:id']
            };
            return tvShow;
        }
    });
});
