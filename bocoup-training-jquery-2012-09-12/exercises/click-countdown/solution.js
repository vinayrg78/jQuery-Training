$(function() {

  $("button").on("click", function handler(evt) {
    // Prevent the default action (so the form doesn't submit).
    evt.preventDefault();
    var button = $(this);
    // Get the spans.
    var pluralSpan = button.find(".plural");
    var numSpan = button.find(".number");
    // Subtract one from the number (which also coerces it to a number).
    var num = numSpan.text() - 1;
    // Update the text in the document.
    numSpan.text(num);
    // Test the new, decremented, number's value.
    if (num === 0) {
      // If zero, disable the button.
      button.prop("disabled", true);
      // Unbind the event handler.
      button.off("click", handler);
      // Update the plural span text.
      pluralSpan.text("s");
    } else if (num === 1) {
      // If one, just update the plural span text.
      pluralSpan.text("");
    }
  });

});
