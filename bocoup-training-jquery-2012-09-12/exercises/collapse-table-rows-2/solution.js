$(function() {

  // Adding a "js" class the the html element is a common way to enable
  // JavaScript-specific CSS rules.
  $("html").addClass("js");

  // For each table header, append an icon.
  $("th").append("<i class='icon-minus'></i>");

  // Wrap the inside of each table cell to-be-animated with a div.
  $("tbody td").wrapInner("<div/>");

  // When a thead is clicked,
  $("table").on("click", "thead", function(evt) {
    // Get the thead.
    var thead = $(this);
    // Get the following tbody.
    var tbody = thead.next();
    // Get the wrapper divs.
    var divs = tbody.find("td").children();
    // Get the icon.
    var icon = thead.find("i");
    // If the divs are hidden,
    if (divs.is(":hidden")) {
      // Show the tbody.
      tbody.show();
      // Update the icon.
      icon.attr("class", "icon-minus");
    }
    // Stop any existing animation and start another. When done, execute
    // the callback.
    divs.stop().slideToggle(250, function() {
      // If the divs are hidden,
      if (divs.is(":hidden")) {
        // Hide the tbody.
        tbody.hide();
        // Update the icon.
        icon.attr("class", "icon-plus");
      }
    });
  });

});
