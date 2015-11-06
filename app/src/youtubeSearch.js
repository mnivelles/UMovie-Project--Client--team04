
googleApiClientReady = function() {
    gapi.client.setApiKey('AIzaSyC2-tNBEPJZvz-nU562gJ7LH4N29-jRHMg');
};

function youtubeSearch(q, callback) {
    gapi.client.load('youtube', 'v3', function() {

        var request = gapi.client.youtube.search.list({
            q: q,
            part: 'snippet'
        });

        request.execute(function(response) {
            var videoId = response.result.items[0].id.videoId;
            callback('https://www.youtube.com/embed/' + videoId);
        });
    });
}
