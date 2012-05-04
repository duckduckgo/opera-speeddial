window.addEventListener('load', function() {

    function setTitle() {
        $.getJSON('http://en.wikipedia.org/w/api.php?callback=?',
            {
                action: "query",
                list: "random",
                rnnamespace: "0",
                rnlimit: "1",
                format: "json"
            },
            function(data) {
                title = data.query.random[0].title;
                $("#header").html(title);
                setAbstract(title);
                setOperaContexts(title);
            }
        );
    }

    function setAbstract(title) {
        $.getJSON('http://api.duckduckgo.com/?callback=?',
            {
                q: title,
                format: "json",
                no_redirect: 1,
                skip_disambig: 1,
            },
            function(data) {
                abstract = data.AbstractText;
                $("#zci").html(abstract);
            }
        );
    }

    function setOperaContexts(title) {    
        if (opera.contexts.speeddial) {
            var url = "http://duckduckgo.com/?q=" + title;
            var sd = opera.contexts.speeddial;

            sd.url = url;
        }
    }

    setTitle();

}, false);
