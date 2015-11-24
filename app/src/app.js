// voir http://coenraets.org/blog/2013/06/building-modular-web-applications-with-backbone-js-and-requirejs-sample-app/

require.config({

    baseUrl: '/js/',

    config: {
        moment: {
            noGlobal: true
        }
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'backbone'
        },
        nunjucks: {
            exports: 'nunjucks'
        },
        materialize: {
            deps: [
                'jquery'
            ]
        },
        'jquery.cookie': {
            deps: [
                'jquery'
            ]
        }
    },

    paths: {
        backbone: 'lib/backbone',
        jquery: 'lib/jquery',
        'jquery.cookie': 'lib/jquery.cookie',
        materialize: 'lib/materialize.amd',
        nunjucks: 'lib/nunjucks-slim',
        slick: 'lib/slick',
        underscore: 'lib/lodash', // superset of underscore with more updates
        bluebird: 'lib/bluebird',
        moment: 'lib/moment-with-locales'
    }
});

require(['jquery', 'underscore', 'backbone', 'router', 'materialize', '/js/helper.view.js', 'jquery.cookie'],
    function ($, _, Backbone, Router, Materialize) {

    var router = new Router();

    router.on('route', function() {
        $(document).scrollTop(0);
    });

    Backbone.history.start({
        pushState: true,
        root: '/'
    });


    // Correction : évite l'utilisation de #/new (etc)
    // de http://artsy.github.io/blog/2012/06/25/replacing-hashbang-routes-with-pushstate/
    $(document).on('click', 'a[href^=\'/\']', function (event) {
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

