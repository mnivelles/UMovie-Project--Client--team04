define(function (require) {

    'use strict';


    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        usersTemplate = 'userResult.page.nunj.html',
        _ = require('underscore'),
        Users = require('search.users.model');


    return Backbone.View.extend({

        events: function() {
            return {
                'click .mediaSection--hideShowButton': 'toggleMediaSection',
            }
        },

        render: function (options){
            var self = this;
            self.searchString = options.searchString;
            var users = new Users(self.searchString);
            users.fetch({
                success : function(users) {
                    self.display(users);

                    $('.mediaSection--hideShowButton', self.el).click(function() {
                        self.toggleMediaSectionParentOfElement($(this));
                    });
                }
            });

            return this;
        },

        toggleMediaSection: function(event) {
            this.toggleMediaSectionParentOfElement($(event.currentTarget));
        },


        display : function(users) {
            var self = this;
            var html = Nunjucks.render(usersTemplate, { users : users.toJSON()} );
            self.$el.html(html);
        }
    });

});
