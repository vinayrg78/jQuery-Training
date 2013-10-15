/*!
 * Simple jQuery (1.5+) AJAX Mocking - v0.1.1 - 2012-08-17
 * http://benalman.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(a){function b(b){var c=b.dataType||"*",d,e=a.mockAjax.rules[c]||a.mockAjax.rules["*"]||[];return a.each(e,function(e,f){var g=b.url.match(f.re);if(g)return d={send:function(d,e){var h=f.response;a.isFunction(h)&&(h=h(g,b)),/^json/.test(c)&&typeof h!="string"&&(h=window.JSON?JSON.stringify(h):h+"");var i=a.mockAjax.options.delay;setTimeout(function(){e("200","success",{status:h})},a.isFunction(i)?i():i)},abort:a.noop},!1}),d}a.mockAjax=function(c,d){arguments.length===1&&(d=c,c="*");var e=a.mockAjax.rules[c];e||(e=a.mockAjax.rules[c]={},a.ajaxTransport(c==="*"?"+*":c,b)),a.each(d,function(a,b){e[a]={re:RegExp("^"+a+"$"),response:b}})},a.mockAjax.rules={},a.mockAjax.options={delay:function(){return Math.random()*250+50}}})(jQuery);

/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);

(function($) {

  $.widget("bocoup.codemirror", {
    _create: function() {
      var widget = this;
      var file = this.element.find("[href]").attr("href");
      var anchor = '<a href="' + file + '">' + file + '</a>';
      this.storageKey = "cm:" + location.pathname + "#" + file;

      var progress = $('<p class="alert alert-ok">Loading ' + anchor + ' source...</p>');
      this.element.html(progress);

      var editor = $('<div class="editor"/>');
      var buttons = $('<div class="buttons"/>');
      var reset = this._reset = $('<button class="btn reset">Revert to saved</button>');
      var exec = this._exec = $('<button class="btn btn-primary exec" disabled>Run selected</button>');
      var content = $('<div class="content"/>');
      var status = $('<div class="status"/>');
      var footer = $('<div class="footer">' + anchor + '</div>');
      this.content = content;
      this._status = status;
      buttons.append(reset).append(exec);
      editor.append(buttons).append(content).append(status).append(footer);

      exec.click( $.proxy(this, 'exec') );
      reset.click( $.proxy(this, 'reset') );

      this._loadSource(file).done(function(src) {
        widget.element.html(editor);
        widget._actuallyCreate(src);
      });
    },
    _setHeight: function() {
      var widget = this;
      var height = this.options.height;
      var win = $(window);
      var doc = $(document);
      if (height === "full") {
        win.resize(function() {
          widget.editor.setSize(null, "auto");
          var winH = win.height();
          var docH = doc.height();
          var widgetH = widget.content.height();
          widget.editor.setSize(null, winH - docH + widgetH);
        }).resize();
      } else if (height) {
        widget.editor.setSize(null, height);
      }
    },
    _loadSource: function(file) {
      var dfd = $.Deferred();
      $.ajax({url: file, dataType: "text"}).done(function(resp) {
        //setTimeout(function() {
          dfd.resolve(resp);
        //}, 500);
      });
      return dfd.promise();
    },
    _highlightLine: function() {
      if (this._hlline) {
        this.editor.setLineClass(this._hlline, null, null);
      }
      this._hlline = this.editor.setLineClass(this.editor.getCursor().line, null, "activeline");
    },
    _actuallyCreate: function(contents) {
      this.contents = contents;
      this.editor = CodeMirror(this.content.get(0), {
        value: "",
        mode: "javascript",
        lineNumbers: true,
        theme: "default",
        onCursorActivity: $.proxy(this, "_cmOnCursorActivity"),
        onScroll: $.proxy(this, "_cmOnScroll"),
        onChange: $.proxy(this, "_cmOnChange")
      });
      this._loadChanges();
      this._saveChanges();
      this._highlightLine();
      this._setHeight();
      window.editor = this.editor;
    },
    _cmOnCursorActivity: function() {
      this._highlightLine();
      this.editor.matchHighlight("CodeMirror-matchhighlight");
      this._saveChanges();
      var data = this._getEditorProps();
      this._exec.prop("disabled", !data.selection);
      this._trigger("select", null, {
        selection: data.selection,
        contents: this.editor.getSelection()
      });
    },
    _cmOnScroll: function() {
      this._saveChanges();
    },
    _cmOnChange: function(editor, changes) {
      this._showReset();
      this._saveChanges();
    },
    _showReset: function() {
      if (this.editor.getValue() !== this.contents) {
        this._reset.show();
      } else {
        this._reset.hide();
      }
    },
    _getEditorProps: function(mode) {
      if (mode === "defaults") {
        return {
          contents: this.contents,
          cursor: {line: 0, ch: 0},
          scroll: {x: 0, y: 0}
        };
      } else {
        return {
          contents: this.editor.getValue(),
          cursor: this.editor.getCursor(),
          selection: this.editor.somethingSelected() ? {
            from: this.editor.getCursor(true),
            to: this.editor.getCursor(false)
          } : false,
          scroll: this.editor.getScrollInfo()
        };
      }
    },
    _setEditorProps: function(props) {
      if ("contents" in props) { this.editor.setValue(props.contents); }
      if ("cursor" in props) { this.editor.setCursor(props.cursor); }
      if (props.selection) {
        this.editor.setSelection(props.selection.from, props.selection.to);
      }
      if ("scroll" in props) { this.editor.scrollTo(0, props.scroll.y); }
    },
    _loadChanges: function() {
      var json = localStorage.getItem(this.storageKey);
      var data = json ? JSON.parse(json) : this._getEditorProps("defaults");
      this._setEditorProps(data);
      this.focus();
    },
    _saveChanges: function() {
      var data = this._getEditorProps();
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    },
    reset: function() {
      localStorage.removeItem(this.storageKey);
      var props = this._getEditorProps();
      this._loadChanges();
      delete props.contents;
      this._setEditorProps(props);
      this.success("Editor content reverted.")
    },
    focus: function() {
      this.editor.focus();
    },
    exec: function() {
      if (!this.editor.somethingSelected()) {
        this._error(new Error("No code selected."));
        return;
      }
      var src = this.editor.getSelection();
      function jQueryObjAsString(obj) {
        var parts = obj.map(function() {
          if (this.outerHTML) {
            return this.outerHTML.replace(/^(<[^>]+>)[\s\S]*(<[^>]+>)$/, "$1...$2");
          } else {
            return this.nodeName;
          }
        }).get();
        return "[" + $("<div/>").text(parts.join(", ")).html() + "]";
      }
      try {
        // Eval globally so things are available in the console.
        var result = (0,eval)(src);
        if (result instanceof $) {
          this.success("Result: " + jQueryObjAsString(result), result);
        } else {
          this.success("Result: " + result, result);
        }
      } catch (err) {
        this._error(err);
      } finally {
        this.focus();
      }
    },
    error: function(msg, orig) {
      this.status("error", String(msg));
      console.error(orig || msg);
    },
    info: function(msg, orig) {
      this.status("info", msg);
      console.info(orig || msg);
    },
    success: function(msg, orig) {
      this.status("success", msg);
      console.log(orig || msg);
    },
    status: function(mode, msg) {
      if (msg == null) {
        this._status.empty();
        return;
      }
      var status = $('<div class="alert alert-' + mode + '"/>').html(msg);
      status.hide().appendTo(this._status).fadeIn(250);
      var id;
      status.on("mouseenter", function() {
        clearTimeout(id);
      }).on("mouseleave", function(evt, delay) {
        id = setTimeout(function() {
          status.fadeOut(250, function() {
            $(this).remove();
          });
        }, delay | 1000);
      }).trigger("mouseleave", [3000]);
    },
    _error: function(err) {
      this.error(err);
      this._trigger("error", null, err);
    }
  });

  $(function() {
    if (location.protocol === "file:") { return; }

    var containers = $(".cm");
    if (containers.length === 0) { return; }

    var base = "../../assets/lib/codemirror2/";

    $("head").append($.map([
      "lib/codemirror.css",
      "theme/ambiance.css"
    ], function(filepath) {
      return '<link rel="stylesheet" href="' + base + filepath + '">';
    }).join(""));

    $("head").append($.map([
      "lib/codemirror.js",
      "lib/util/searchcursor.js",
      "lib/util/match-highlighter.js",
      "mode/javascript/javascript.js"
    ], function(filepath) {
      return '<script src="' + base + filepath + '"></script>';
    }).join(""));

    containers.codemirror({height: containers.length === 1 ? "full" : 300});

    CodeMirror.keyMap.basic["Cmd-Enter"] = function() {
      containers.codemirror("exec");
    };
  });

}(jQuery));


jQuery(function($) {
  // Make target element resettable with a button.
  var target = $("#target");
  if (target.length === 0) { return; }

  var parent = $(".target-hidden, body").eq(0);
  var cm = $(".cm");
  var resetButton = $(".reset-target");
  var toggleButton = $(".toggle-target");
  var resetSel = resetButton.attr("rel") || "#target";
  var toggleSel = toggleButton.attr("rel") || "#target";
  var defaultHtml = $(resetSel).html();

  var reset = function(evt) {
    $(resetSel).html(defaultHtml);
    cm.codemirror("focus");
  };
  if (window.CodeMirror) {
    CodeMirror.keyMap.basic["Cmd-Backspace"] = reset;
  }
  resetButton.on("click", function(evt) {
    evt.preventDefault();
    reset();
  });

  $(toggleSel).addClass("toggle-target-elem");

  var lsKey = location.pathname + "#toggle-target";
  toggleButton.on("click", function(evt) {
    evt.preventDefault();
    parent.toggleClass("target-hidden");
    var hidden = parent.hasClass("target-hidden");
    localStorage.setItem(lsKey, String(hidden));
  });

  var hidden = JSON.parse(localStorage.getItem(lsKey));
  if (!window.CodeMirror) {
    parent.removeClass("target-hidden");
  } else if (hidden != null) {
    parent.toggleClass("target-hidden", hidden);
  }

  // Force the window to resize periodically, so examples don't have to
  // tell codemirror to resize itself.
  (function loopy() {
    $(window).resize();
    setTimeout(loopy, 100);
  }());
});

(function($) {

  var init = $.fn.init;
  var defaultContext;

  // Specify an element id to make that element the new default context
  // element for jQuery selections.
  $.defaultContext = function(id) {
    if (!id) {
      // Revert.
      $.fn.init = init;
      return;
    }
    // Store the default context element.
    defaultContext = document.getElementById(id);
    // Override jQuery.
    $.fn.init = function(selector, context, rootjQuery) {
      // Get a jQuery object with the specified arguments.
      var obj = new init(selector, context, rootjQuery);
      // If the jQuery object has a selector, the selector wasn't the
      // context object, and the context wasn't specified...
      if (obj.selector && selector !== "#" + id && context == null) {
        // Return a jQuery object with our default context specified.
        return new init(selector, defaultContext, rootjQuery);
      }
      // Otherwise, return the normal jQuery object.
      return obj;
    };
  };

}(jQuery));

// Simulating the server... on the client!
var mockedAjax = (function() {
  var exports = {};
  var fakeData = [];

  exports.init = function() {
    if (typeof Faker === 'undefined') { return; }
    for (var i = 0; i < 1000; i++) {
      fakeData.push(Faker.Helpers.userCard());
    }
  };

  exports.dataSearch = function(matches) {
    var query = matches[1];
    if (!query) { return {results: []}; }
    var results = _.filter(fakeData, function(item) {
      var possibles = [item.name, item.email, item.company.name];
      return _.any(possibles, function(p) {
        return p.toLowerCase().match(query.toLowerCase());
      });
    });
    return {results: results};
  };

  return exports;
}());


