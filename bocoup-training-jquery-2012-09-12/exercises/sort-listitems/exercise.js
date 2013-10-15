$(function() {

  // Your solution shouldn't unbind these event handlers!
  $("#content li").on("mouseenter mouseleave", function(evt) {
    $(this).toggleClass("hover", evt.type === "mouseenter");
  });

  // Your code goes here!

});
