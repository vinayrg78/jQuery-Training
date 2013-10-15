$(function() {

  // Adding a "js" class the the html element is a common way to enable
  // JavaScript-specific CSS rules.
  $("html").addClass("js");

  // For each table header, append an icon.
  $("th").append("<i class='icon-minus'></i>");

  // When a thead is clicked,
  $("table").on("click", "thead", function(evt) {
    // Get the thead.
    var thead = $(this);
    // Get the following rbody.
    var tbody = thead.next();
    // Toggle the visibility of the tbody.
    tbody.toggle();
    // Determine which icon should be shown.
    var iconClass = tbody.is(":visible") ? "icon-minus" : "icon-plus";
    // Update the class attribute of the icon accordingly.
    thead.find("i").attr("class", iconClass);
  });

});
