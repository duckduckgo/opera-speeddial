windows.addEventListener('load', function() {

    var title = getQuery();
    writeQuery(title);
    updateLink(title);


    // Get a trending query

    function getQuery() {
        
        $.get("http://en.wikipedia.org/w/api.php", { action: "query", list: "random", rnnamespace: "0", rnlimit: "1"},
            function(data) {

                var xmlDoc = $.parseXML( data ),
                $xml = $( xmlDoc ),
                $title = $xml.find( "title" );

                return $title;
            });
    }

    // Insert the query into the DOM

    function writeQuery(title) {
        
        $("#searchBox").html() = title;
        
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
}, false);
