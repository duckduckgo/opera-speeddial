window.addEventListener('load', function() {

    function getQuery() {

        var title = "testing";
    
        $("#searchBox").val(title);

        if (opera.contexts.speeddial) {
            var url = "http://duckduckgo.com/?q=" + encodeURIComponent(title);
            var sd = opera.contexts.speeddial;

            sd.url = url;
        }
    
        return 0;
    }

    getQuery();

}, false);
