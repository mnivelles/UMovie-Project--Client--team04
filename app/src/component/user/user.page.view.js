define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        Common = require('/js/common.js'),
        template = 'user.page.nunj.html';

    return Backbone.View.extend({

        initializeWithId: function(id) {
            console.log(id);
            this.render();
        },

        render: function() {
            var html = Nunjucks.render(template, {
                media:{
                    friends: [
                        'john',
                        'bob',
                        'alphonse'
                    ]
                }
            });
            this.$el.html(html);

            this.changePageTitleWith('User');

            return this;
        }
    });
});
