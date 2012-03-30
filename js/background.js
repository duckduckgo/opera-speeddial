windows.addEventListener('load', function() {

    // Get a random topic from Wikipedia

    function getQuery() {
        
        $.getJSON("http://en.wikipedia.org/w/api.php?"
            {
                action: "query",
                list: "random",
                rnnamespace: "0",
                rnlimit: "1",
                format: "json"
            },
            function(data) {
                return data.query.random.title;
            });
    }

    // Insert the query into the DOM

    function writeQuery(title) {
        
        $("#searchBox").val() = title;
        
        return 0;
    }

    // Update the Speed Dial link 
    
    function updateLink(title) {
        
        if (opera.contexts.speeddial) {
            var url = "http://duckduckgo.com/?q=" + encodeURIComponent(title);
            var sd = opera.contexts.speeddial;

            sd.url = url;

            return 0;
        }

        return 1;

    }
    
    var title = getQuery();
    writeQuery(title);
    updateLink(title);

}, false);
