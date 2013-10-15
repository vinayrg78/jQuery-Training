$(function() {

  // Your solution shouldn't unbind these event handlers!
  $("#content li").on("mouseenter mouseleave", function(evt) {
    $(this).toggleClass("hover", evt.type === "mouseenter");
  });

  // Iterate over all lists.
  $("#content").find("ul, ol").each(function() {
    var list = $(this);
    // Get list items, as an array.
    var elems = list.children().get();
    // Sort the array, based on element .text() length.
    elems.sort(function(a, b) {
      return $(a).text().length - $(b).text().length;
    });
    // Append elements in sort order to the parent list, reordering them.
    list.append(elems);
  });

});
