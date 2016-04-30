
googleApiClientReady = function() {
    gapi.client.setApiKey('YOUR_YOUTUBE_API_KEY');
};


function youtubeSearch(q, callback) {
    gapi.client.load('youtube', 'v3', function() {

        var request = gapi.client.youtube.search.list({
            q: q,
            part: 'snippet',
            fs:'0'
        });

        request.execute(function(response) {
            var videoId = response.result.items[0].id.videoId;
            callback('https://www.youtube.com/embed/' + videoId+ '/rel=0?&fs=0');
        });
    });
}


