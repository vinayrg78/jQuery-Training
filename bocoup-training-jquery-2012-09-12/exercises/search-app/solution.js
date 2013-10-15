$(function() {

  var search, tmpl;

  var results = $("#results");
  var liked = $("#liked");

  // Handle form submit.
  $("#searchForm").on("submit", function(event) {
    event.preventDefault();

    var form = $(this);
    var query = form.find("[name='q']").val();

    // If the query is empty or a search is in-progress, abort.
    if (search || /^\s*$/.test(query)) { return; }

    // Replace the current results content with a placeholder.
    results.html("<li>Searching...</li>");

    // If a template hasn't already been fetched, fetch it.
    if (!tmpl) { tmpl = $.get("/templates/people-detailed.tmpl"); }

    // Make a search request.
    search = $.getJSON("/data/search.json", {q: query});

    // When we have the template and search results...
    $.when(tmpl, search).then(function(tmpl, data) {
      // Build object with people property.
      var html = _.template(tmpl[0])({people: data[0].results});

      // Render view.
      results.html(html);

      // No longer making a request.
      search = null;
    });
  });

  // Like a person.
  results.on("click", "a.like", function(event) {
    event.preventDefault();

    var result = $(this).closest(".result");
    var name = result.find("h2").text();

    // Remove any existing "no results" listitem.
    liked.find(".no-results").remove();

    // Create and append a new listitem. Template?
    $("<li/>").text(name).appendTo(liked);
  });

  // Remove a person.
  results.on("click", "a.remove", function(event) {
    event.preventDefault();
    $(this).closest(".result").remove();
  });

});
