////////////
// Deferreds
////////////

// As seen in the jqXHR objects that Ajax methods, a Deferred object is an
// object that will either have already been resolved (success) or rejected
// (error), or will be resolved or rejected at some point in the future.
//
// Once we have a Deferred object,
var dfd = $.Deferred();

// We can bind callback(s) to execute when that Deferred is resolved,
dfd.done(function(data) {
  $("#target").html("<h2 class='alert alert-success'>Done: " + data + "</h2>");
});

// And then resolve that Deferred.
dfd.resolve("Awesome!");

// Note that even though any number of done or fail callbacks can be
// registered, both before and after a Deferred has been resolved or
// rejected, a Deferred can only ever be resolved or rejected once!
//
// So, given a new Deferred object,
var dfd = $.Deferred();

// We can also bind callback(s) to execute when a Deferred is rejected,
dfd.fail(function(data) {
  $("#target").html("<h2 class='alert alert-error'>Fail: " + data + "</h2>");
});

// And then reject that Deferred.
dfd.reject("Whoops!");



// In this example, when the "getDeferred" function is invoked, a new Deferred
// is created, set to resolve in one second, and is then returned. While this
// example is somewhat contrived, it serves to illustrate a point: that the
// mechanism that creates a Deferred is usually responsible for resolving or
// rejecting it.
var getDeferred = function() {
  var dfd = $.Deferred();
  setTimeout(function() { dfd.resolve("Delayed response!"); }, 1000);
  return dfd;
};

// If we get a Deferred object,
var myDeferred = getDeferred();

// And bind some callbacks to it, we'll see it resolve in one second.
myDeferred.done(function(data) {
  $("#target").html("<h2 class='alert alert-success'>Done: " + data + "</h2>");
}).fail(function(data) {
  $("#target").html("<h2 class='alert alert-error'>Fail: " + data + "</h2>");
});

// But because the raw Deferred is returned to us, we can resolve or reject
// it prematurely, which is bad!
myDeferred.reject("Whoops!");



// In this example, when the "getPromise" function is invoked, a new Deferred
// is created, set to resolve in one second, and then that Deferred's Promise
// is returned. A Promise object has all the callback-binding methods of its
// Deferred, but lacks the ability to resolve, reject or otherwise modify it.
//
// Think of a Promise as a "read-only" Deferred object.
var getPromise = function() {
  var dfd = $.Deferred();
  setTimeout(function() { dfd.resolve("Delayed response!"); }, 1000);
  return dfd.promise();
};

// Now, if we get a Promise object,
var myPromise = getPromise();

// And bind some callbacks to it, we'll see it resolve in one second.
myPromise.then(function(data) {
  $("#target").html("<h2 class='alert alert-success'>Done: " + data + "</h2>");
}, function(data) {
  $("#target").html("<h2 class='alert alert-error'>Fail: " + data + "</h2>");
});

// And nothing we do can resolve or reject it prematurely. In fact, Promise
// objects don't even have .resolve() or .reject() methods.
myPromise.reject("Whoops!");



// We can specify as many success handlers as we want, using the .done()
// method, as many error handlers as we want, using the .fail() method, and
// a single success (and optional error) handler using the .then() method.
var myPromise = getPromise();
myPromise.done(onSuccess1, onSuccess2);
myPromise.fail(onError1, onError2, onError3);
myPromise.done(onSuccess3);
myPromise.then(onSuccess4, onError4);

// If we want to specify a handler that runs whether or not the request
// succeeds or fails, we can use the .always() method.
myPromise.always(onSuccessOrError);



// Deferreds can be resolved or rejected with a single value or multiple
// values. And a custom "this" context value can be specified when using
// the .resolveWith() or .rejectWith() methods.
var yay = function(a, b, c) { console.log("yay", this, a, b, c); };
var nay = function(a, b, c) { console.error("nay", this, a, b, c); };
$.Deferred().then(yay, nay).resolve(1);
$.Deferred().then(yay, nay).reject(2, 3, 4);
$.Deferred().then(yay, nay).resolveWith(window, [5]);
$.Deferred().then(yay, nay).rejectWith(window, [6, 7, 8]);

// And callbacks can be bound AFTER the Deferred is resolved or rejected!
$.Deferred().resolve(1).then(yay, nay);
$.Deferred().reject(2, 3, 4).then(yay, nay);
$.Deferred().resolveWith(window, [5]).then(yay, nay);
$.Deferred().rejectWith(window, [6, 7, 8]).then(yay, nay);



// The .state() method can be used to get the state of a Deferred or Promise.
console.log( $.Deferred().resolve("yay").state() ); // "resolved"
console.log( $.Deferred().reject("nay").state() ); // "rejected"
console.log( $.Deferred().state() ); // "pending"



// The .pipe() method can be used to return a new Promise that filters the
// status and values of a Deferred through a function.
var dfd = $.Deferred();
var piped = dfd.pipe(function(value) {
  return 100 * value;
});

var list = $("<ul/>").appendTo($("#target").empty());
var printLine = function(str) {
  $("<li class=well/>").html(str).appendTo(list);
};

// Each of these Deferreds will print, individually, when resolved.
piped.done(printLine);
dfd.done(printLine);

// Resolve away!
dfd.resolve(5);

// Using the $.when() method, we can create an object that behaves similarly
// to Deferred objects, but for COMBINATIONS of Deferred objects.
//
// The $.when() method creates a Deferred object that is resolved or rejected
// when all the Deferred objects passed into it are resolved or rejected.
$.when(dfd, piped).then(function(dfdResult, pipedResult) {
  printLine("100 x " + dfdResult + " = " + pipedResult);
});



// The $.when() method accepts either jQuery Deferred objects or normal
// values. If a pending Deferred or Promise is passed in, $.when() will
// wait until it's been resolved or rejected. If it has already been
// resolved or rejected, $.when() will use the value it was resolved or
// rejected with.
//
// And if a normal non-Deferred value is passed in, it's treated as if it
// was a Deferred that had already been resolved with that value!
var dfd1 = $.Deferred().resolve("This");
var dfd2 = $.Deferred();
var value = "sentence ever!";

// Only once all Deferreds are resolved will this code execute.
$.when(dfd1.promise(), dfd2.promise(), value).then(function(a, b, c) {
  $("#target").html("<h2 class=well>" + a + b + c + "</h2>");
});

// This deferred gets resolved later.
dfd2.resolve(" is the best ");



// So, where might we use Deferreds? Let's say we need to fetch some data
// from a remote server (simulated here with setTimeout) and store it in a
// cache. Once it's in the cache, we shouldn't have to fetch it again. But
// since this code is going to be sometimes-asynchronous, we need to pass
// in a callback function to receive the value.
var cache = {};
var getThingSometimesAsync = function(id, callback) {
  if (id in cache) {
    callback(cache[id]);
  } else {
    $.ajax("/data/people/" + id + ".json").done(function(resp) {
      cache[id] = resp.first + " " + resp.last;
      callback(cache[id]);
    });
  }
};

var list = $("<ul/>").appendTo($("#target").empty());
var printLine = function(str) {
  $("<li class=well/>").html(str).appendTo(list);
};

// With callbacks, we can execute a single function when a value is returned.
getThingSometimesAsync("ben", printLine);
getThingSometimesAsync("rebecca", printLine);

printLine("This prints synchronously");



// But callbacks are limited. What if you want to bind multiple callbacks
// to a single action? What if you want to be able to execute code when
// multiple sometimes-asynchronous actions complete? What if you want to
// check the state of your action? Let's use deferreds!
var cache = {};
var getThingSometimesAsync = function(id, callback) {
  var dfd = $.Deferred();
  if (id in cache) {
    dfd.resolve(cache[id]);
  } else {
    $.ajax("/data/people/" + id + ".json").done(function(resp) {
      cache[id] = resp.first + " " + resp.last;
      dfd.resolve(cache[id]);
    });
  }
  return dfd.promise();
};

var list = $("<ul/>").appendTo($("#target").empty());
var printLine = function(str) {
  $("<li class=well/>").html(str).appendTo(list);
};

// Because we've used Deferreds, not only can we execute code when each
// Deferred is resolved...
var benReq = getThingSometimesAsync("ben").then(printLine);
var rebeccaReq = getThingSometimesAsync("rebecca").then(printLine);

// But also when multiple Deferreds are resolved!
$.when(benReq, rebeccaReq).then(function(ben, rebecca) {
  printLine(ben + ", " + rebecca);
});

printLine("This prints synchronously");
