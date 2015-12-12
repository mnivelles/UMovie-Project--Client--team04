define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        Common = require('/js/common.js'),
        UserModel = require('user.model'),
        WatchListsView = require('user.watchlists.view'),
        template = 'user.page.nunj.html';

    return Backbone.View.extend({

        events: {
            'click .friendsListContainer .unorderedWordList--item a': 'showUserPage',
            'click .followBtn': 'toggleFollowUser',
            'click .mediaSection--hideShowButton': 'toggleMediaSection'
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
                    title: self.model.get('name'),
                    img: '/image/user_icon.png',
                    mainInformations: [
                        'Email : ' + self.model.get('email')
                    ],
                    isNotCurrentUser: isNotCurrentUser,
                    friends: self.parseFriendsList()
                }
            });
            this.$el.html(html);
            this.changePageTitleWith('User');

            var watchlistsViews = new WatchListsView({el: self.$('.watchlistsContainer')});
            watchlistsViews.render(self.model.id);
            this.updateFollowingBtn();
            return this;
        },

        showUserPage: function(event) {
            var button = $(event.currentTarget);
            var query = button.attr('data-info');
            Backbone.history.navigate('/users/'+query, true);
        },

        toggleFollowUser: function() {
            var self = this;
            if(self.$('.followBtn').hasClass('unfollowBtn')){
                self.model.unFollow(function(){
                    self.updateFollowingBtn();
                });
            }
            else{
                this.model.follow(function(){
                    self.updateFollowingBtn();
                });
            }
        },

        toggleMediaSection: function(event) {
            this.toggleMediaSectionParentOfElement($(event.currentTarget));
        },

        parseFriendsList : function() {
            var self = this;
            if(self.model.get('following')){
                //to avoid getting old invalid entries
                var filterdList = _.filter(self.model.get('following'),function(friend){
                    return typeof(friend.id) != 'undefined';
                });

                var friendsList = _.map(filterdList, function(friend){
                    var result = friend.name;
                    return {
                        name: result,
                        data: friend.id
                    };
                });
                return friendsList;
            }
            return undefined;
        },

        updateFollowingBtn : function(){
            var self = this;
            var visitedUser = self.model.get('id');
            var loggedUser = $.cookie(Common.CURRENT_USER_ID);

            $.ajax({
                url : Common.getSecuredUrl('users/' + loggedUser, false),
                type : 'GET',
                contentType: 'application/json'
            }).done(function(user){
                if(_.findWhere(user.following, {id: visitedUser})){
                    self.$('.followBtn').removeClass('green').addClass('red').addClass('unfollowBtn');
                    self.$('.followBtnText').text('UNFOLLOW');
                }
                else{
                    self.$('.followBtn').removeClass('unfollowBtn').removeClass('red').addClass('green');
                    self.$('.followBtnText').text('FOLLOW');
                }
            });
        }
    });
});
