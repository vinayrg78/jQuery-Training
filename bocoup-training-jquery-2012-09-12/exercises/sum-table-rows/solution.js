$(function() {

  // Iterate over all tables.
  $("table").each(function() {
    var table = $(this);
    // Start with an array to hold all of the column sums. We won't know
    // the length of this array (and thus the number of sums to initialize)
    // until we start iterating over a table row.
    var sums = [];
    // Get all rows.
    var rows = table.find("tr");
    // Iterate over all table rows.
    rows.each(function() {
      // Iterate over all table cells in this row.
      $(this).children().each(function(index) {
        // If the index doesn't exist in the sums array, initialize this
        // column's sum.
        if (!(index in sums)) {
          sums[index] = 0;
        }
        // Add this table cell's text, coerced to a number, to this
        // column's sum.
        sums[index] += Number( $(this).text() );
      });
    });
    // Generate the html for the sums row to be added to the table.
    var sumHtml = "<tr><td class=sum>" + sums.join("</td><td class=sum>") + "</td></tr>";
    // Append new row HTML after the last existing row in this table.
    rows.last().after(sumHtml);
  });

});
