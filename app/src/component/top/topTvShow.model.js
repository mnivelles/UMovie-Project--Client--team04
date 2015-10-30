define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    var tvShowBaseUrl = '/tv-shows/';

    return Backbone.Model.extend({
        parse : function(data) {
            var img = _.where(data['im:image'], {attributes: {
                height: "100"
            }
            })[0]['label'];
            var tvShow = {
                title: data['im:collection']['im:name']['label'],
                img: img,
                url: tvShowBaseUrl + data['id']['attributes']['im:id']
            };
            return tvShow;
        }
    });
});
