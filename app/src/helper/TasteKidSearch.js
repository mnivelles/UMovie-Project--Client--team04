define(function(require){

    'use strict';

    var Common = require('/js/common.js');

    return {
        searchSimilar : function(query, callback){
            var apiKey = Common.TASTEKID_API_KEY;
            var baseURL = "https://tastekid.com/api/similar?type=movie&k=" + apiKey + "&q=";
            var URI = baseURL + encodeURIComponent(query);

            $.ajax({
                url : URI,
                type : 'GET',
                crossDomain : true,
                dataType: 'jsonp',
                success: function(data){
                    callback(data.Similar.Results);
                },
                error : function(data){
                    console.log('error calling taste kid api');
                    callback([]);
                }
            });
        }
    };
});
