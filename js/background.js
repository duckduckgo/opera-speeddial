window.addEventListener('load', function() {

    $.getJSON('http://en.wikipedia.org/w/api.php?callback=?',
    {
        action: "query",
        list: "random",
        rnnamespace: "0",
        rnlimit: "1",
        format: "json"
    },
    function(data) {
    
        var title = "testing";
    
        $("#searchBox").val(title);

        if (opera.contexts.speeddial) {
            var url = "http://duckduckgo.com/?q=" + encodeURIComponent(title);
         var sd = opera.contexts.speeddial;

            sd.url = url;
        }

    });

}, false);
