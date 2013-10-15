//////////////////////
// Fixing these jQuery
//////////////////////

// Each of the examples below illustrates one or more common jQuery
// anti-patterns. Your task is to "fix" each example, taking note of the
// instructions above each, keeping in mind best practices and the
// knowledge you have of the jQuery API.

// Remember: http://api.jquery.com/



// How can these selectors be improved?

// Answer: Usually, an id selector is specific enough, and any other selectors
// will just slow things down.
$("#ellie").click(function() {
  console.log("Ellie is the best dog");
});

// Answer: Like the previous example, usually an id selector is specific
// enough. Also, since td will always be inside tr which will always be inside
// tbody, specifying tr is redundant.
$("#sales tbody td").hover(function() {
  $(this).toggleClass("active");
});



// How can this event handler be better written?

// Answer: Instead of returning false, a better way to prevent the default
// action is to explicitly call .preventDefault() on the event object. This
// avoids any issues with stopping event propagation.
$("a").click(function(evt) {
  evt.preventDefault();
  console.log( $(this).prop("id") );
});

// Also, because the DOM element is available inside the event handler as
// "this" and properties can be accessed directly from DOM elements, do so!
$("a").click(function(evt) {
  evt.preventDefault();
  console.log(this.id);
});

// Finally, consider using event delgataion to bind one single event handler
// to a single parent element, instead of to each individual element. Either
// way, using the .on(type, fn) syntax allows you to specify a namespace for
// easier (and safer) event unbinding.
$("body").on("click", "a", function(evt) {
  evt.preventDefault();
  console.log(this.id);
});



// How can these examples be rewritten to utilize the .on method's
// ability to accept multiple event types at the same time?

// Answer: using multiple event types at once along with the .toggleClass()
// method, adding and removing classes in event handlers can be simplified.
$("a").on("mouseenter mouseleave", function() {
  $(this).toggleClass("active");
});

// Note, however, that because .toggleClass() just toggles blindly, it's
// possible for class toggling to get out of sync. Using the event object
// .type property, we can choose whether to add or remove the class.
$("a").on("mouseenter mouseleave", function(evt) {
  if (evt.type === "mouseenter") {
    $(this).addClass("active");
  } else {
    $(this).removeClass("active");
  }
});

// But the .toggleClass() method actually supports a second "state" argument
// that when true, adds the class, and when false, removes the class!
$("a").on("mouseenter mouseleave", function(evt) {
  $(this).toggleClass("active", evt.type === "mouseenter");
});

$("input").on("focus blur", function(evt) {
  $(this).toggleClass("focused", evt.type === "focus");
});



// How can this code be rewritten to avoid unnecessary selections?

// Storing a jQuery object in a variable can greatly reduce the number of
// document queries, which will improve performance. Using traversal or
// filtering methods on that object, instead of re-selecting everything from
// the document, can also improve performance.
var spans = $("li span");
spans.addClass("enabled");
spans.css("backgroundColor", "red");

spans.find("a").on("click", function(evt) {
  evt.preventDefault();
  console.log( $(this).attr("href") );
});

$("#toggle").on("click", function() {
  spans.filter(".enabled").removeClass("enabled");
});



// How can the following examples be rewritten to avoid calling .each?

// Answer: because built-in jQuery methods implicitly iterate, for basic
// tasks you usually don't need to call .each().
$("div").addClass("highlight");

// Instead of calling .each() to explicitly iterate when both getting and
// setting a value, use the "callback" method signature.
$("li").html(function(index, value) {
  return value + ", bro";
});

// Why iterate with .each() to find the first child of every list when the
// :first-child selector exists (and is super-fast)?
$("ul, ol").children(":first-child").addClass("highlight");



// How can this be optimized?

// Answer: for starters, the .appendTo() and similar methods accept a DOM
// element reference or a selector string. Passing a jQuery object will work
// but is redundant.
var myDiv = $("<div/>").appendTo("body");
myDiv.html("Teh awesomest div");
myDiv.addClass("omgomg");
myDiv.prop("id", "because-a-class-just-isnt-enough");
myDiv.click(function() {
  console.log("unicorns! unicorns!");
});

// In addition, DOM manipulations of elements that are currently in the
// document are more expensive than those that are not attached to the
// document, so append element(s) to the document AFTER modifying them.
var myDiv = $("<div/>");
myDiv.html("Teh awesomest div");
myDiv.addClass("omgomg");
myDiv.prop("id", "because-a-class-just-isnt-enough");
myDiv.click(function() {
  console.log("unicorns! unicorns!");
});
myDiv.appendTo("body");

// Finally, jQuery supports a much more concise syntax for performing many
// manupulations while creating an element.
$("<div/>", {
  html: "Teh awesomest div",
  className: "omgomg",
  id: "because-a-class-just-isnt-enough",
  click: function() {
    console.log("unicorns! unicorns!");
  }
}).appendTo("body");



// What's a better approach than setting inline styles on elements?

// Answer: Instead of using .css() to set inline styles on an element,
// consider using CSS classes. With this CSS:
li.highlight {
  border: 3px solid red;
  background: yellow;
}
// This jQuery can enable (and disable) the visual style very quickly. Not
// only is it easier to disable styles when using classes, separating CSS
// and JavaScript into separate files simplifies maintenaince.
$("ul li").toggleClass("highlight");

// Taking it one step further, with a minor CSS change:
ul.highlight li {
  border: 3px solid red;
  background: yellow;
}
// This jQuery can enable (and disable) the visual style on every listitem
// even more efficiently because only the parent list(s) are modified.
$("ul").toggleClass("highlight");



// Without knowing anything except what can be implied by reading this
// code, how would you improve this example?

// Answer: there are many problems with this code. It's clear that the
// author wants to, for each row, set an indexed id property, and then add
// a class of even or odd to alternating rows. The author also seems to
// REALLY like chaining. For starters, explicit iteration can be used to
// set the id property and table cell class.
$("table tr").each(function(index) {
  var row = $(this);
  row.prop("id", "row" + index);
  row.children().addClass(index % 2 === 0 ? "even" : "odd");
});

// There's also a good change that with better CSS, the even and odd classes
// can go on the table rows, not the table cells.
$("table tr").each(function(index) {
  var row = $(this);
  row.prop("id", "row" + index);
  row.addClass(index % 2 === 0 ? "even" : "odd");
});

// Finally (and this isn't even a jQuery thing) but most modern browsers
// natively support the :nth-child(even) and :nth-child(odd) CSS selectors.
// If you really need to zebra-stripe table rows, do it in CSS and the
// browsers that don't support it just won't have stripes.
tr:nth-child(odd) {
  background-color: #eee;
}
// And your jQuery can use the "callback" signature of the .prop() method.
$("table tr").prop(function(index) {
  return "row" + index;
});



// How can these examples be rewritten to reduce repetition? Remember, DRY =
// Don't Repeat Yourself (and WET = Write Everything Twice). Can any other
// improvements can be made?

// Answer: the first two event handlers do the same thing, so why not use
// a function? Also, it's probably a good idea to be consistent when binding
// event handlers.
var lastClicked;
var updateLastClicked = function() {
  lastClicked = $(this);
};

$(".foo").on("click", updateLastClicked);
$("<div/>").appendTo("#software").on("click", updateLastClicked);

$("#click-me").on("click", function() {
  console.log("the last clicked thing was", lastClicked);
});



// What about this example?

// Answer: notice that the same code executes initially AND on click. A
// named function could be used to DRY this code up, making it significantly
// easier to maintain.
var tallest = 0;

var updateHeights = function() {
  $(".col").each(function() {
    if ($(this).height() > tallest) {
      tallest = $(this).height();
    }
  });

  $(".col").css("height", tallest + "px");
};
updateHeights();

$("#click-me").on("click", updateHeights);

// The trigger method can also be used to effectively do the same thing,
// since it executes all bound event handlers for the specified type on the
// selected elements.
var tallest = 0;

$("#click-me").on("click", function() {
  $(".col").each(function() {
    if ($(this).height() > tallest) {
      tallest = $(this).height();
    }
  });

  $(".col").css("height", tallest + "px");
});

$("#click-me").trigger("click");

// For bonus points, use chaining and a namespace to avoid triggering any
// other click event handlers that might be bound.
var tallest = 0;

$("#click-me").on("click.set-heights", function() {
  $(".col").each(function() {
    if ($(this).height() > tallest) {
      tallest = $(this).height();
    }
  });

  $(".col").css("height", tallest + "px");
}).trigger("click.set-heights");
