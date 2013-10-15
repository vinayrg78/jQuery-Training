if (location.protocol === "file:") {
  mockedAjax.init();
  $.mockAjax("*", {
    "/assets/js/test\\.js(\\?.*)?": "$(\"#target\").html(\"<h2 class=well>OMG AWESOME TEST JQUERYIES</h2>\");\n",
    "/data/people/ben\\.json(\\?.*)?": {
      "first": "Ben",
      "last": "Alman"
    },
    "/data/people/jory\\.json(\\?.*)?": {
      "first": "Jory",
      "last": "Burson"
    },
    "/data/people/rebecca\\.json(\\?.*)?": {
      "first": "Rebecca",
      "last": "Murphey"
    },
    "/data/people\\.json(\\?.*)?": {
      "people": [
        {
          "name": "Ben Alman",
          "url": "http://benalman.com/",
          "bio": "I'm a senior developer at @bocoup, creator of @gruntjs, and frequent contributor to @jquery. I also coined the term IIFE and play a mean funk bass."
        },
        {
          "name": "Rebecca Murphey",
          "url": "http://rmurphey.com",
          "bio": "Senior JS dev at Bocoup"
        },
        {
          "name": "Jory Burson",
          "url": "http://joryburson.com",
          "bio": "Enthusiastic about Open Web education at @bocoup. Lover of media, owls, fake mustaches, & you."
        }
      ]
    },
    "/data/person\\.json(\\?.*)?": {
      "name": "Ben Alman",
      "url": "http://benalman.com/",
      "bio": "I'm a senior developer at @bocoup, creator of @gruntjs, and frequent contributor to @jquery. I also coined the term IIFE and play a mean funk bass."
    },
    "/templates/people-detailed\\.tmpl(\\?.*)?": "<% if (people.length) { %>\n  <% _.each(people, function(person) { %>\n  <li class=\"result\">\n    <h2><%= person.name %></h2>\n    <a class=\"btn btn-primary like\"><i class=\"icon-thumbs-up icon-white\"></i> Like</a>\n    <a class=\"btn btn-danger remove\"><i class=\"icon-remove icon-white\"></i> Remove</a>\n    <dl class=\"dl-horizontal\">\n      <dt class=\"company\">Company</dt>\n      <dd><%= person.company.name %></dd>\n      <dt class=\"email\">Email</dt>\n      <dd><%= person.email %></dd>\n    </dl>\n  </li>\n  <% }); %>\n<% } else { %>\n  <li class=\"no-results\">No results found.</li>\n<% } %>\n",
    "/templates/people\\.tmpl(\\?.*)?": "<ul>\n  <% _.each(people, function(person) { %>\n    <li class=\"well\">\n      <h2><a href=\"<%= person.url %>\"><%= person.name %></a></h2>\n      <p><%= person.bio %></p>\n    </li>\n  <% }); %>\n</ul>",
    "/templates/person\\.tmpl(\\?.*)?": "<div class=\"well\">\n  <h2><%= name %></h2>\n  <p><%= bio %></p>\n</div>\n",
    "/data/search\\.json(?:\\?q=(.*))?": mockedAjax.dataSearch
  });
}