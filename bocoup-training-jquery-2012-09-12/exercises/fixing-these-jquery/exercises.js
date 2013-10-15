//////////////////////
// Fixing these jQuery
//////////////////////

// Each of the examples below illustrates one or more common jQuery
// anti-patterns. Your task is to "fix" each example, taking note of the
// instructions above each, keeping in mind best practices and the
// knowledge you have of the jQuery API.

// Remember: http://api.jquery.com/



// How can these selectors be improved?
$(".dogs #ellie").click(function() {
  console.log("Ellie is the best dog");
});

$("table#sales tbody tr td").hover(function() {
  $(this).toggleClass("active");
});



// How can this event handler be better written?
$("a").click(function() {
  console.log( $(this).prop("id") );
  return false;
});



// How can these examples be rewritten to utilize the .on method's
// ability to accept multiple event types at the same time?
$("a").mouseenter(function(evt) {
  $(this).addClass("hover");
}).mouseleave(function(evt) {
  $(this).removeClass("hover");
});

$("input").focus(function(evt) {
  $(this).addClass("focused");
}).blur(function(evt) {
  $(this).removeClass("focused");
});



// How can this code be rewritten to avoid unnecessary selections?
$("li span").addClass("enabled");
$("li span").css("backgroundColor", "red");

$("li span a").on("click", function(evt) {
  evt.preventDefault();
  console.log( $(this).attr("href") );
});

$("#toggle").on("click", function() {
  $("li span.enabled").removeClass("enabled");
});



// How can the following examples be rewritten to avoid calling .each?
$("div").each(function() {
  $(this).addClass("highlight");
});

$("li").each(function() {
  $(this).html( $(this).html() + ", bro" );
});

$("ul, ol").each(function() {
  $(this).find("li:first").addClass("highlight");
});



// How can this be optimized?
var myDiv = $("<div/>").appendTo($("body"));
myDiv.html("Teh awesomest div");
myDiv.addClass("omgomg");
myDiv.prop("id", "because-a-class-just-isnt-enough");
myDiv.click(function() {
  console.log("unicorns! unicorns!");
});



// What's a better approach than setting inline styles on elements?
$("ul li").css({
  border: "3px solid red",
  background: "yellow"
});



// Without knowing anything except what can be implied by reading this
// code, how would you improve this example?
$("table")
  .find("tr:eq(0)").prop("id", "row0").find("td").addClass("even").parent().parent()
  .find("tr:eq(1)").prop("id", "row1").find("td").addClass("odd").parent().parent()
  .find("tr:eq(2)").prop("id", "row2").find("td").addClass("even").parent().parent()
  .find("tr:eq(3)").prop("id", "row3").find("td").addClass("odd").parent().parent()
  .find("tr:eq(4)").prop("id", "row4").find("td").addClass("even").parent().parent()
  .find("tr:eq(5)").prop("id", "row5").find("td").addClass("odd").parent().parent()
  .find("tr:eq(6)").prop("id", "row6").find("td").addClass("even").parent().parent()
  .find("tr:eq(7)").prop("id", "row7").find("td").addClass("odd");



// How can these examples be rewritten to reduce repetition? Remember, DRY =
// Don't Repeat Yourself (and WET = Write Everything Twice). Can any other
// improvements can be made?
var lastClicked;

$(".foo").click(function() {
  lastClicked = $(this);
});

$("<div/>").appendTo("#software").on("click", function() {
  lastClicked = $(this);
});

$("#click-me").on("click", function() {
  console.log("the last clicked thing was", lastClicked);
});



// What about this example?
var tallest = 0;

$(".col").each(function() {
  if ($(this).height() > tallest) {
    tallest = $(this).height();
  }
});

$(".col").css("height", tallest + "px");

$("#click-me").on("click", function() {
  $(".col").each(function() {
    if ($(this).height() > tallest) {
      tallest = $(this).height();
    }
  });

  $(".col").css("height", tallest + "px");
});
