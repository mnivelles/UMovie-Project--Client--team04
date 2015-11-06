define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore');

    var movieBaseUrl = '/movies/';

    return Backbone.Model.extend({
        parse : function(data) {
            var img = _.where(data['im:image'], {attributes: {
                height: '170'
            }
            })[0].label;
            return {
                title: data['im:name'].label,
                img: img.replace('170x170', '200x200'),
                url: movieBaseUrl + data.id.attributes['im:id']
            };
        }
    });
});
