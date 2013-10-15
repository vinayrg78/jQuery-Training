////////////
// Templates
////////////

// By itself, data doesn't usually look very interesting.
$.ajax("/data/people.json").done(function(resp) {
  $("#target").html("<pre>" + JSON.stringify(resp) + "</pre>");
});



// One way to make this data look more interesting is to use JavaScript to
// dynamically build page HTML based on patterns in the data object.
//
// A common approach is to iterate over the data, creating one or more DOM
// nodes for each item. Building page HTML like this is VERY SLOW.
$.ajax("/data/people.json").done(function(resp) {
  var list = $("<ul/>");
  $.each(resp.people, function(index, person) {
    var li = $("<li class=well/>").appendTo(list);
    $("<h2/>").html(person.name).appendTo(li);
    $("<p/>").html(person.bio).appendTo(li);
  });
  $("#target").html(list);
});



// A significantly faster way to do this is to build an HTML string through
// concatenation, creating a single DOM node at the very end.
//
// Note that while this approach is much faster than creating explicit DOM
// nodes for each element, it is prone to errors if properties have unescaped
// HTML. What would happen if person.name was "John Q. Public</li>"?
$.ajax("/data/people.json").done(function(resp) {
  var html = "";
  $.each(resp.people, function(index, person) {
    html += "<li class=well><h2>" + person.name + "</h2>" +
      "<p>" + person.bio + "</p></li>";
  });
  $("#target").html("<ul>" + html + "</ul>");
});



// Either way, we can modify this approach a little by using the $.map()
// method, which not only iterates but returns an array that can be joined.
$.ajax("/data/people.json").done(function(resp) {
  var htmls = $.map(resp.people, function(person) {
    return "<li class=well><h2>" + person.name + "</h2>" +
      "<p>" + person.bio + "</p></li>";
  });
  $("#target").html("<ul>" + htmls.join("") + "</ul>");
});



// How might we go about implementing a very rudimentary templating system?
// This only handles single instances of "name" and "bio", but it's a start.
$.ajax("/data/people.json").done(function(resp) {
  var tmpl = "<li class=well><h2>{{name}}</h2><p>{{bio}}</p></li>";
  var htmls = $.map(resp.people, function(person) {
    return tmpl.replace("{{name}}", person.name).replace("{{bio}}", person.bio);
  });
  $("#target").html("<ul>" + htmls.join("") + "</ul>");
});



// We could break out our templating code into a function and then generalize
// it to do global replacements as well as support dynamic {{whatever}}
// properties using a regular expression.
function template(tmpl, obj) {
  // Replace "{{foo}}" in tmpl string with value obj[foo].
  return tmpl.replace(/\{\{(.*?)\}\}/g, function(s, key) {
    return obj[key];
  });
}

$.ajax("/data/people.json").done(function(resp) {
  var tmpl = "<li class=well><h2>{{name}}</h2><p>{{bio}}</p></li>";
  var htmls = $.map(resp.people, function(person) {
    return template(tmpl, person);
  });
  $("#target").html("<ul>" + htmls.join("") + "</ul>");
});



// While we could keep going down this route, fortunately other people have
// already done the hard work for us. For example, the "Underscore.js" library
// includes a _.template() method, which accepts a template string and a
// data object.
$.ajax("/data/people.json").done(function(resp) {
  var tmpl = "<li class=well><h2><%= name %></h2><p><%= bio %></p></li>";
  var htmls = $.map(resp.people, function(person) {
    return _.template(tmpl, person);
  });
  $("#target").html("<ul>" + htmls.join("") + "</ul>");
});



// Instead of compiling the template for each person, the Underscore.js
// template function can also compile it once, up-front, for a noticeable
// performance boost.
$.ajax("/data/people.json").done(function(resp) {
  var tmpl = "<li class=well><h2><%= name %></h2><p><%= bio %></p></li>";
  var tmplFn = _.template(tmpl);
  var htmls = $.map(resp.people, function(person) {
    return tmplFn(person);
  });
  $("#target").html("<ul>" + htmls.join("") + "</ul>");
});



// And instead of iterating over all people with jQuery, the iteration can
// actually be handled inside the template, simplifying the JavaScript.
$.ajax("/data/people.json").done(function(resp) {
  var tmpl = "<ul><% _.each(people, function(person) { %>" +
    "<li class=well><h2><%= person.name %></h2><p><%= person.bio %></p></li>" +
    "<% }); %></ul>";
  var tmplFn = _.template(tmpl);
  var html = tmplFn(resp);
  $("#target").html(html);
});



// And we can further simplify our JavaScript by storing the template somewhere
// else. For example, we could store it in the page HTML like this:
//
// <script type="text/template" id="tmpl-person">
//   <ul>
//     <% _.each(people, function(person) { %>
//       <li class="well">
//         <h2><a href="<%= person.url %>"><%= person.name %></a></h2>
//         <p><%= person.bio %></p>
//       </li>
//     <% }); %>
//   </ul>
// </script>
//
// When you abstract your templates out of your JavaScript, it's much easier
// to have more complex templates! Also note that specifying a type other than
// "text/javascript" for a script element prevents the browser from parsing it.
//
// And then access that template and render it like this.
$.ajax("/data/people.json").done(function(resp) {
  var tmpl = $("#tmpl-person").text();
  var html = _.template(tmpl, resp);
  $("#target").html(html);
});



// Unfortunately, when we store our template in HTML, it gets loaded with
// every page load, so we can't take advantage of caching.
//
// Another option is to load our template via Ajax when needed, caching the
// response so we don't have to keep loading it. The reason this works is
// because the jqXHR object that getTemplate returns when a template isn't
// found "resolves" to the template value returned from the server.
//
// jQuery Deferred methods make this easy, because $.when() accepts any number
// of jQuery jqXHR objects, jQuery Deferred objects, or arbitrary values. And
// the .then() method takes a function that receives the jqXHR/Deferred object
// resolved value or, in the case of arbitrary values, the value itself.
var tmplCache = {};
var getTemplate = function(id) {
  if (id in tmplCache) {
    return tmplCache[id];
  } else {
    return $.ajax("/templates/" + id + ".tmpl").done(function(resp) {
      tmplCache[id] = resp;
    });
  }
};

$.ajax("/data/people.json").done(function(resp) {
  $.when(getTemplate("people")).then(function(tmpl) {
    var html = _.template(tmpl, resp);
    $("#target").html(html);
  });
});



// But because the $.when() method accepts any number of jQuery jqXHR
// objects, jQuery Deferred objects, or normal values, we can make both
// data object and template requests concurrently, resulting in less code!
var dataReq = $.ajax("/data/people.json");
var tmplOrAjax = getTemplate("people");

$.when(dataReq, tmplOrAjax).then(function(resp, tmpl) {
  var html = _.template(tmpl, resp[0]);
  $("#target").html(html);
});



// Taking this one step further, let's store the compiled template, not the
// template string in the template cache. There's a catch, however: the raw
// jqXHR object created by the Ajax request inside getTemplate shouldn't be
// returned directly, because it resolves to the template string value, and
// we need it to resolve to the compiled template. So, we use a jQuery
// Deferred object, which we can resolve explicitly with the correct value.
var tmplPromises = {};
var getTemplate = function(id) {
  var dfd = $.Deferred();
  if (id in tmplPromises) {
    dfd.resolve(tmplPromises[id]);
  } else {
    $.ajax("/templates/" + id + ".tmpl").done(function(resp) {
      tmplPromises[id] = _.template(resp);
      dfd.resolve(tmplPromises[id]);
    });
  }
  return dfd.promise();
};

var dataReq = $.ajax("/data/people.json");
var tmplPromise = getTemplate("people");

$.when(dataReq, tmplPromise).then(function(resp, tmplFn) {
  var html = tmplFn(resp[0]);
  $("#target").html(html);
});



// The previous example can be coded in a much more concise way, using the
// jQuery Deferred .pipe method, which chains off of one Deferred object,
// returning another Deferred object. This allows you to programmatically
// filter the resolution value.
var tmplPromises = {};
var getTemplate = function(id) {
  var tmplReq;
  if (!tmplPromises[id]) {
    tmplReq = $.ajax("/templates/" + id + ".tmpl");
    tmplPromises[id] = tmplReq.pipe(function(resp) {
      return _.template(resp);
    });
  }
  return tmplPromises[id];
};

var dataReq = $.ajax("/data/people.json");
var tmplPromise = getTemplate("people");

$.when(dataReq, tmplPromise).then(function(resp, tmplFn) {
  var html = tmplFn(resp[0]);
  $("#target").html(html);
});
