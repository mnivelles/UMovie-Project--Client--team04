// source : https://github.com/ccoenraets/directory-backbone-bootstrap-require

define(function (require) {

    "use strict";

    var PageView   = require('component/page/page.view'),
        HomeView   = require('component/home/home.view'),

        $page = $('#page'),
        pageView = new PageView({el: $page}).render(),
        $content = $("#template-pageContent", pageView.el),
        homeView = new HomeView({el: $content});

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "edit/:id": "edit",
            "new": "edit"
        },

        home: function () {
            homeView.delegateEvents(); // delegate events when the view is recycled
            homeView.render();
            //shellView.selectMenuItem('home-menu');
        }

    });

});
