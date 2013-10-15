///////
// Ajax
///////

// Ajax is a means of loading data from a server without requiring a page
// reload. The acronym "AJAX" stands for "Asynchronous JavaScript And XML"
// but these days most Ajax requests load HTML or JSON instead of XML. Under
// the hood, Ajax requests are powered by XMLHttpRequest (aka XHR) objects.
//
// jQuery provides the $.ajax() method along with several convenience methods
// to make it easier to work with asynchronous requests.



// The "A" stands for asynchronous!
//
// Ajax requests run asynchronously, which means that even though the $.ajax()
// method returns immediately, the success callback won't fire until sometime
// in the future. That means that this function's return statement executes
// before the Ajax request completes, and thus the function returns undefined.
var getSomeData = function() {
  var data;

  $.ajax({
    url: "/data/people.json",
    dataType: "json",
    success: function(resp) {
      data = resp;
    }
  });

  return data;
};

$("#target").html("<h2 class=well>" + getSomeData().people[0].name + "</h2>");

// The solution in this case is to execute all code dependent on the Ajax
// request's response in the success callback.
var getSomeData = function(callback) {
  $.ajax({
    url: "/data/people.json",
    dataType: "json",
    success: function(resp) {
      callback(resp);
    }
  });
};

getSomeData(function(resp) {
  $("#target").html("<h2 class=well>" + resp.people[0].name + "</h2>");
});



// jQuery's $.ajax() method has a few different signatures. We can provide
// an options object that overrides the default Ajax settings.
//
// This options object lets us specify extra data we want to send, which HTTP
// method (GET, POST, etc) to use, what type of data we expect to receive, and
// how to react when the request succeeds or fails.
$.ajax({
  url: "/data/people.json",
  data: {count: 3},
  type: "GET",
  dataType: "json",
  success: function(resp) {
    $("#target").html("<h2 class=well>" + resp.people[0].name + "</h2>");
  },
  error: function(req, status, err) {
    console.error("Something went wrong! Status: %s (%s)", status, err);
  }
});

// We can also provide a URL, followed by an options object.
$.ajax("/data/people.json", {
  data: {count: 3},
  type: "GET",
  dataType: "json",
  success: function(resp) {
    $("#target").html("<h2 class=well>" + resp.people[0].name + "</h2>");
  },
  error: function(req, status, err) {
    console.error("Something went wrong! Status: %s (%s)", status, err);
  }
});

// If we don't need to override any of the default Ajax settings, we can
// just specify the url, and omit the options object.
$.ajax("/data/people.json");

// Technically, you don't even need to specify the url. In that case it just
// uses the current page url. But this probably isn't very useful to you.
$.ajax();

// If you want to see how jQuery determines the default Ajax settings, look
// at the jQuery source! If you want to see (or modify) the current default
// Ajax settings, use the $.ajaxSetup() method. A warning: if you change
// these defaults, you change them GLOBALLY for all Ajax requests!
$.ajaxSetup({dataType: "text"});



// jQuery provides a number of Ajax convenience methods that are basic
// wrappers around the $.ajax() method.

// The $.get() method accepts a url, optional data object, optional success
// handler, and optional data type.
$.get("/data/people.json", {count: 3}, function(resp) {
  console.log("Response", resp);
});

// It's basically just a shorter way of writing this:
$.ajax("/data/people.json", {
  data: {count: 3},
  type: "GET",
  success: function(resp) {
    console.log("Response", resp);
  }
});

// The $.post() method is just like the $.get() method but explicitly
// specifies a type of "POST" (HTTP method)
$.post("/data/save", {name: "Bocoup"}, function(resp) {
  console.log("Response", resp);
}, "json");

// The $.getJSON() method is just like the $.get() method but explicitly
// specifies a dataType of "json"
$.getJSON("/data/people.json", {count: 3}, function(resp) {
  console.log("Response", resp);
});

// The $.getScript() method is just like the $.get() method but explicitly
// specifies a dataType of "script"
$.getScript("/assets/js/test.js");

// And if you need to run JavaScript after your JavaScript, you can.
$.getScript("/assets/js/test.js", function() {
  $("#target h2").append("!!!").attr("class", "alert alert-success");
});

// You actually don't need to specify a success callback for any of the
// Ajax methods.
$.ajax("/data/people.json");
$.get("/data/people.json");
$.getJSON("/data/people.json");
$.post("/data/save", {name: "Bocoup"});



// But if you don't specify a success callback, how can you do something
// with the inevitable response? We already know that Ajax requests run
// asynchronously, so a success callback won't fire until sometime in the
// future.
//
// By that logic we know that this just doesn't make any sense. Because Ajax
// requests are asynchronous, the result simply can't be available here:
var result = $.get("/data/people.json");

// But Ajax requests DO return something. They return a jqXHR object. This
// object isn't the RESULT of the Ajax response (it can't be; that won't
// exist until some time in the future), but it is an object we can use.
var jqXHR = $.get("/data/people.json");

// For example, we can add callbacks to this object. Look familiar?
jqXHR.done(function(resp) {
  $("#target").html("<h2 class=well>" + resp.people[0].name + "</h2>");
});

jqXHR.fail(function(req, status, err) {
  console.log("Something went wrong! Status: %s (%s)", status, err);
});

// These methods are chainable, as well. They can be called synchronously,
// before the Ajax request completes as well as asynchronously, after the
// Ajax request completes.
//
// A jqXHR object is an object that will either have already been resolved
// (success) or rejected (error), or will be resolved or rejected at some
// point in the future.
var onSuccess = function(resp) {
  $("#target").html("<h2 class=well>" + resp.people[0].name + "</h2>");
};

var onError = function(req, status, err) {
  console.error("Something went wrong! Status: %s (%s)", status, err);
};

$.get("/data/gonna-fail.json").done(onSuccess).fail(onError);

// We can specify as many success handlers as we want, using the .done()
// method, as many error handlers as we want, using the .fail() method, and
// a single success (and optional error) handler using the .then() method.
var req = $.get("/data/people.json");
req.done(onSuccess1, onSuccess2);
req.fail(onError1, onError2, onError3);
req.done(onSuccess3);
req.then(onSuccess4, onError4);

// If we want to specify a handler that runs whether or not the request
// succeeds or fails, we can use the .always() method.
req.always(onSuccessOrError);



// Regardless of the syntax we use when specifying success or fail handlers,
// it's often annoying when we have to do something upon the successful
// completion of multiple Ajax requests. In this example, the templates
// request isn't even started until the data request completes.
var doSomething = function(data, tmpl) {
  var d = $("<pre class=well/>").text(JSON.stringify(data));
  var t = $("<pre class=well/>").text(tmpl);
  $("#target").empty().append("<h3>data</h3>", d, "<h3>tmpl</h3>", t);
};

$.get("/data/person.json").done(function(data) {
  $.get("/templates/person.tmpl").done(function(tmpl) {
    // This code executes once both requests have resolved.
    doSomething(data, tmpl);
  });
});

// It would be much better if the two requests could be made concurrently,
// but if we wanted to manage that ourselves, it would be a pain.
var dataDone, tmplDone;
var checkDone = function() {
  if (dataDone != null && tmplDone != null) {
    // This code executes once both requests have resolved.
    doSomething(dataDone, tmplDone);
  }
};

$.get("/data/person.json").done(function(data) {
  dataDone = data;
  checkDone();
});

$.get("/templates/person.tmpl").done(function(tmpl) {
  tmplDone = tmpl;
  checkDone();
});

// Using the $.when() method, we can create an object that behaves similarly
// to jqXHR objects, but for COMBINATIONS of Ajax requests.
//
// Just like Ajax methods return a jqXHR object that will be resolved or
// rejected when the Ajax request completes, the $.when() method creates a
// Deferred object that will be resolved or rejected when all the Deferred
// objects passed into it are resolved or rejected.
//
// In case you hadn't guessed already, jqXHR objects are Deferred objects,
// just with some extra Ajax-specific stuff.
var dataReq = $.get("/data/person.json");
var tmplReq = $.get("/templates/person.tmpl");

$.when(dataReq, tmplReq).then(function(data, tmpl) {
  // This code executes once both requests have resolved.
  doSomething(data[0], tmpl[0]);
});



// We can send data to the server with an Ajax request by setting the "data"
// property of the options object, or by specifying our data as the second
// argument to one of the convenience methods. For a GET request, this data
// will be appended to the URL as a query string; for a POST request, it will
// be sent as form data.
$.ajax({
  url: "/data/people.json",
  data: {count: 3}
});

// Specifying data as an object is usually preferred, as jQuery will
// automatically convert it into a params string for you.
$.get("/data/people.json", {count: 3});

// You can specify data as a string or as a query string in the url, though.
$.getJSON("/data/people.json", "count=3");
$.getJSON("/data/people.json?count=3");



// When working with forms, the .serialize() method can be used to generate
// data to be sent to the server from a specific form, or from a subset of
// form inputs. The .serialize() method ignores disabled elements. Also note
// that the action and method attributes are read from the form, which means
// they don't need to be hard-coded into the JavaScript.
$("form").on("submit", function(evt) {
  evt.preventDefault();

  var form = $(this);

  $.ajax({
    url: form.attr("action"),
    type: form.attr("method"),
    data: form.serialize(),
    dataType: "json"
  }).done(function(resp) {
    $("#target").html("<pre class=well>" + JSON.stringify(resp) + "</pre>");
  });
});



// There is one major caveat with Ajax. Because XHR isn't cross-domain (for
// security reasons), as much as you might want to get the raw HTML source
// of Google's homepage, you can't do this. And there's no way around this
// using XHR.
$.ajax("http://www.google.com/").done(function(resp) {
  console.log(resp);
});

// But this works: you can load "third party" cross-domain JavaScript into
// your page with the $.getScript() method. But getScript is Ajax, right?
$.getScript("https://raw.github.com/gist/3395475/test.js");

// When used cross-domain, the $.getScript() method actually doesn't use XHR
// but instead appends a script element to the page, which loads the script
// immediately, as if it had been included in the page HTML. This technique
// is also known as "script tag injection."
$("head").append('<script src="https://raw.github.com/gist/3395475/test.js"/>');

// And JSONP (aka "JSON with Padding" or "Cross-domain JSON") uses script tag
// injection under the hood to allow you to get JSON data cross-domain. Of
// course, there is a caveat: the third party JSON data provider has to
// provide support for JSONP; if they don't, it's not actually JSONP, and you
// can't use their data in your JavaScript.
//
// Just specify "jsonp" as the dataType, and it will usually just work.
var printKittens = function(resp) {
  var html = "";
  $.each(resp.results, function(index, tweet) {
    html += "<li>" + tweet.text + "</li>";
  });
  $("#target").html("<ul>" + html + "</ul>");
};

$.ajax({
  url: "http://search.twitter.com/search.json",
  data: {q: "kittens"},
  dataType: "jsonp"
}).done(printKittens);

// If your JSONP provider has a custom callback name, you can specify it as
// the value of the "jsonp" option.
$.ajax({
  url: "http://search.twitter.com/search.json",
  data: {q: "kittens"},
  dataType: "jsonp",
  jsonp: "callback"
}).done(printKittens);

// Finally, you can specify the callback name in the url. The syntax is a
// little odd, but it can help make your JSONP requests more concise. Note
// that this only works if you use the $.getJSON() method or you have also
// specified a dataType of "json" in the $.ajax() method.
$.getJSON(
  "http://search.twitter.com/search.json?callback=?",
  {q: "kittens"}
).done(printKittens);
