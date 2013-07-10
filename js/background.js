opera.isReady(function(){
window.addEventListener('load', function() {
  function setText() {
    $.getJSON('https://en.wikipedia.org/w/api.php?callback=?', {
      action: "query",
      list: "random",
      rnnamespace: 0,
      rnlimit: 1,
      redirects: 1,
      format: "json"
    }, function(data) {
      title = data.query.random[0].title;
      $.getJSON('https://api.duckduckgo.com/?callback=?', {
        q: title,
        format: "json",
        no_redirect: 1,
        skip_disambig: 1
      }, function(data) {
        abstract = data.AbstractText;
        if (abstract) {
          $("#header").html(title);
          $("#zci").html(abstract);
          setOperaContexts(title);
          $("#content").fadeIn('slow');
        } else setText();
      });
    });
  }
  function setOperaContexts(title) {
    if (opera.contexts.speeddial) {
      var url = "https://duckduckgo.com/?t=oen&q=" + title;
      var sd = opera.contexts.speeddial;
      sd.url = url;
      sd.title = "Search: " + title;
    }
  }
  setText();
  window.setInterval(function() {
    $("#content").fadeOut('slow', function() {
      setText();
    });
  }, 10000);
}, false);
});
