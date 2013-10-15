$(function() {

  // Iterate over all table rows.
  $("tr").each(function() {
    var row = $(this);
    // Start with a sum of 0.
    var sum = 0;
    // Iterate over all table cells in this row.
    row.children().each(function() {
      // Add this table cell's text, coerced to a number, to the sum.
      sum += Number( $(this).text() );
    });
    // Append a new cell, containing the sum, to this row.
    row.append("<td class=sum>" + sum + "</td>");
  });

});
