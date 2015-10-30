define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore');;

    var tvShowBaseUrl = '/tv-shows/';

    var idRegExp = /id([0-9]*)/;

    return Backbone.Model.extend({
        parse : function(data) {
            var img = _.where(data['im:image'], {attributes: {
                height: "100"
            }
            })[0]['label'];
            var collectionId = data['im:collection']['link']['attributes']['href'].match(idRegExp)[1];
            var tvShow = {
                title: data['im:collection']['im:name']['label'],
                img: img.replace("100x100", "200x200"),
                url: tvShowBaseUrl + collectionId
            };
            return tvShow;
        }
    });
});
