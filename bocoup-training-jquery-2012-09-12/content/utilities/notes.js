////////////
// Utilities
////////////


// jQuery provides two general-purpose iteration utilities.
//
// Use $.each when you just need to iterate over an array or object.
$.each(["cat", "bat", "rat"], function(index, item) {
  console.log(index, item);
});

$.each({good: true, bad: false}, function(prop, value) {
  console.log(prop, value);
});

// Use $.map when you need to iterate over an array and return another array.
var arr = $.map(["cat", "bat", "rat"], function(item, index) {
  return item.charAt(0).toUpperCase() + item.substr(1);
});

arr // What is arr?



// If you want to store data on elements, this approach can cause memory
// leaks in certain browsers. Avoid setting data on the element this way.
$("p:first")[0].myWidget = {state: true};

// If you use the provided .data() method however, jQuery will manage things
// and prevent memory leaks.
$("p:first").data("myWidget", {state: true});

// You can retrieve per-element data like this.
$("p:first").data("myWidget").state // true

// And remove per-element data thike this.
$("p:first").removeData("myWidget");

// Since jQuery 1.4.3, you can get all data set on an element.
$("p:first").data() // {myWidget: {state: true}}
$("p:first").data().myWidget.state = false;

// And jQuery 1.4.3+ can also utilize HTML5 data-attributes too, even going
// as far as to parse JSON out of attributes. Given this sample HTML:
// <div data-role='sample' data-options='{"name":"Bocoup"}'></div>
"div").data("role")         // "sample"
$("div").data("options").name // "Bocoup"



// You can clone and merge objects using the $.extend() method.
var obj = {a: [1,2,3], b: [4,5,6]};

// Shallow clone an object.
var shallowClone = $.extend({}, obj);

// Deep clone an object.
var deepClone = $.extend(true, {}, obj);

// Merge objects, preserving the original object.
var mergedObj = $.extend({}, obj, {b: true, c: false});

// Merge objects, modifying the original object.
$.extend(obj, {b: true, c: false});



// If you need to use jQuery along with another library that uses $, the
// $.noConflict() method forces jQuery to relinquish ownership of $, returning
// it to whatever it was before jQuery was loaded.
$.noConflict();

$ // whatever it was before (or undefined)

// If you pass true, jQuery relinquisheds ownership of both $ and jQuery, but
// returns a reference the the otherwise-no-longer-accessible jQuery function.
var myjQuery = $.noConflict(true);

$       // whatever it was before (or undefined)
jQuery  // whatever it was before (or undefined)

myjQuery("p"); // This works!



// The $.proxy() method allows you to lock a function context to a specific
// "this" value.
var name = "The window";
var obj = {
  name: "Bocoup",
  printMyName: function() {
    $("#target").html("<h2 class=well>" + this.name + "</h2>");
  }
};

obj.printMyName(); // logs "Bocoup"

// When a function isn't invoked as it's being dereferenced from an object,
// the "this" value inside that function is the global object (eg. window).
var whoops = obj.printMyName;
whoops() // "The window"

// With the $.proxy() method, you can bind the "this" value to an object,
// in one of two ways.
var reallyAwesome = $.proxy(obj, "printMyName");
reallyAwesome() // "Bocoup"

var justAsAwesome = $.proxy(obj.printMyName, obj);
justAsAwesome() // "Bocoup"

// This will log the name of the input when clicked, because jQuery sets the
// "this" value inside event handlers to the DOM element, and the element
// has a name property!
$("input[name='first']").click(obj.printMyName);

// This, on the other hand, will log "Bocoup" when clicked, because the "this"
// value is bound to obj!
$("input[name='last']").click( $.proxy(obj, "printMyName") );



// You can utilize the $.type() method to check types in a fool-proof way,
// despite how the typeof and instance operators work.
//
// Have you ever run into issues with typeof?
typeof 1                // "number"
typeof new Number(1)    // "object"
typeof {a: 1}           // "object"
typeof [2, 3]           // "object"

// Worry no more, jQuery has your back!
$.type(1)               // "number"
$.type(new Number(1))   // "number"
$.type({a: 1})          // "object"
$.type([2, 3])          // "array" Awesome!

// There are a few more specific type-related functions.
$.isArray([2, 3])       // true
$.isFunction($)         // true
$.isPlainObject({})     // true
