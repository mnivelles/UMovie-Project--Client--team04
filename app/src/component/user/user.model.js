define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({
        defaults: function() {
            return {
                name: 'Nanashi',
                avatarUrl: '/image/default-square-avatar.png'
            }
        }
    });
});
