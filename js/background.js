window.addEventListener('load', function() {

    function setText() {

        // Get a random article title from Wikipedia
        $.getJSON('http://en.wikipedia.org/w/api.php?callback=?',
            {
                action: "query",
                list: "random",
                rnnamespace: 0,
                rnlimit: 1,
                redirects: 1,
                format: "json"
            },
            function(data) {
                
                title = data.query.random[0].title;

                // Get the ZCI abstract from DDG for the random title
                $.getJSON('http://api.duckduckgo.com/?callback=?',
                    {
                        q: title,
                        format: "json",
                        no_redirect: 1,
                        skip_disambig: 1,
                    },
                    function(data) {
                        abstract = data.AbstractText;

                        // If there was an abstract, replace the content
                        // and fade back in
                        //
                        // If not, try again

                        if (abstract){
                            $("#header").html(title);
                            $("#zci").html(abstract);
                            $("#content").fadeIn('slow');
                        }
                        else
                            setText();
                    }
                );

                // Change the title and URL (when clicked) of the Speed Dial box 
                setOperaContexts(title);
            }
        );
    }

    function setOperaContexts(title) {    
        if (opera.contexts.speeddial) {
            var url = "http://duckduckgo.com/?q=" + title;
            var sd = opera.contexts.speeddial;

            sd.url = url;
            sd.title = "Searched: " + title;
        }
    }

    // Get the first ZCI when the page loads
    setText();

    // Change the ZCI by fading out, replacing it, then fading back in
    // with the new constant at a constant interval

    window.setInterval(function() {
        $("#content").fadeOut('slow', function() {
            setText();
        });

    }, 10000);

}, false);
