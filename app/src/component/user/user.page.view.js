define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        Common = require('/js/common.js'),
        UserModel = require('user.model'),
        template = 'user.page.nunj.html';

    return Backbone.View.extend({

        events: {
            'click .friendsListContainer .unorderedWordList--item a': 'showUserPage',
            'click .followBtn': 'followUser'
        },

        initializeWithId: function(id) {
            this.model = new UserModel({id: id});
            this.listenTo(this.model, 'change', this.render);
            this.model.fetch({data:{access_token:$.cookie(Common.LOGIN_TOKEN_COOKIE)}});
        },

        render: function() {
            var self = this;
            var isNotCurrentUser = undefined;
            if(self.model.id != $.cookie(Common.CURRENT_USER_ID)) {
                isNotCurrentUser = true;
            }
            var html = Nunjucks.render(template, {
                media:{
                    title: 'User informations',
                    img: '/image/user_icon.png',
                    mainInformations: [
                        'Email : ' + self.model.get('email'),
                        'Name : ' + self.model.get('name')
                    ],
                    isNotCurrentUser: isNotCurrentUser,
                    friends: self.model.get('following') ? _.map(self.model.get('following'), function(friend) {
                        var result = friend.name + ' ( ' + friend.email + ' )';
                        return {
                            name: result,
                            data: friend._id.slice(0, -1) + 'a'
                        };
                    }) : undefined
                }
            });
            this.$el.html(html);

            this.changePageTitleWith('User');

            return this;
        },

        showUserPage: function(event) {
            var button = $(event.currentTarget);
            var query = button.attr('data-info');
            Backbone.history.navigate('/user/'+query, true);
        },

        followUser: function() {
            // TODO call api to add following using the token
        }
    });
});
