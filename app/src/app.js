// voir http://coenraets.org/blog/2013/06/building-modular-web-applications-with-backbone-js-and-requirejs-sample-app/

require.config({

    baseUrl: '/js/',

    paths: {
        app: '/js'/*,
        tpl: '/js/tpl'*/
    },

    map: {
        '*': {
            //'app/models/employee': 'app/models/memory/employee'
        }
    }
});

require(['router'], function (Router) {
    var router = new Router();
    Backbone.history.start({
        pushState: true,
        root: '/'
    });

    // Correction : évite l'utilisation de #/new (etc)
    // de http://artsy.github.io/blog/2012/06/25/replacing-hashbang-routes-with-pushstate/
    $(document).on("click", "a[href^='/']", function(event) {
        var href, passThrough, url;
        href = $(event.currentTarget).attr('href');
        passThrough = href.indexOf('sign_out') >= 0;
        if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
            event.preventDefault();
            url = href.replace(/^\//, '').replace('\#\!\/', '');
            router.navigate(url, {
                trigger: true
            });
            return false;
        }
    });
});

_.extend(Backbone.View.prototype, {
    showElementWithId: function(id) {
        var isHiddenClass = 'hide'; // Provient de Materialize
        var element = document.getElementById(id);
        element.classList.remove(isHiddenClass);
    },

    showTrailer: function() {
        this.showElementWithId('media--trailer');
    }
});

