define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        Common = require('/js/common.js'),
        UserModel = require('user.model'),
        template = 'user.page.nunj.html';

    return Backbone.View.extend({

        initializeWithId: function(id) {
            this.model = new UserModel({id: id});
            this.listenTo(this.model, 'change', this.render);
            this.model.fetch({data:{access_token:$.cookie(Common.LOGIN_TOKEN_COOKIE)}});
        },

        render: function() {
            var self = this;
            console.log(this.model.toJSON());
            var html = Nunjucks.render(template, {
                media:{
                    userInfo:{
                        email: self.model.get('email'),
                        name: self.model.get('name')
                    },
                    friends: self.model.get('following')
                }
            });
            this.$el.html(html);

            this.changePageTitleWith('User');

            return this;
        }
    });
});
