//////////
// Effects
//////////



//////////////////////
// Hiding & Showing
//////////////////////

// Hide all elements.
$("p").hide();

// Show all elements.
$("p").show();

// Toggle visibility of all elements.
$("p").toggle();

// Hide all elements, using a fancy visual effect.
$("p").hide("slow");

// Show all elements, using a fancy visual effect.
$("p").show("fast");

// Toggle visibility of all elements, using a fancy visual effect.
$("p").toggle(2000);






////////////////////
// Instant vs Queued
////////////////////

// Why doesn't this do what you think it does...
$("li").hide("slow").show();

// While this does?
$("li").hide("slow").show("slow");

// Passing a callback to an animation method ensures that it executes after
// the animation completes.
$("li").hide("slow", function() {
  $(this).show();
});

// Specifying any duration, even 0, causes the method to be pushed onto the
// element's effects queue.
$("li").hide("slow").show(0);






///////////////////////
// Disabling Animations
///////////////////////

// Toggle all paragraphs, by fading.
$("p").toggle("slow");

// Disable all jQuery animations.
$.fx.off = true;

// Toggle all paragraphs, by fading. Except.. no fading!
$("p").toggle("slow");






////////////////////
// The Effects Queue
////////////////////

// Effects queues are per-element queues of effects methods.

// If you want to execute non-effects methods in a queue, you can do so
// using the .queue method.

$("p")
  .hide()
  .fadeIn(5000)
  .queue(function() {
    $(this)
      .css({color: "white", backgroundColor: "red"})
      .dequeue();                     // The jQuery pre-1.4 way.
  })
  .delay(1000)
  .queue(function(next) {
    $(this).css({color: "white", backgroundColor: "green"});
    next();                           // The jQuery 1.4+ way.
  });



// How would you queue up a rainbow of color changes with a
// half-second delay between each color change?
$(":header, p, li, img, :input, label").each(function() {
  var elem = $(this);
  var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

  $.each(colors, function(index, color) {
    // var i = 1000000; while (i--) {};
    elem.delay(500).queue(function(next) {
      elem.css("background-color", color);
      next();
    });
  });
});






///////////////////
// Animation Styles
///////////////////

// Fading

// Fade out all elements (at the default duration).
$("p").fadeOut();

// Fade in all elements (at the default duration).
$("p").fadeIn();

// Toggle visibility of all elements (at the default duration).
$("p").fadeToggle();

// Of course, a duration and callback can be passed.
$("p")
  .fadeOut("slow")
  .fadeIn(2000, function() {
    $(this).css("color", "red");
  });

// Fade all elements to a specified opacity.
$("p").fadeTo("slow", 0.5);



// Sliding

// Slide up all elements (at the default duration).
$("p").slideUp();

// Slide down all elements (at the default duration).
$("p").slideDown();

// Toggle visibility of all elements (at the default duration).
$("p").slideToggle();

// Of course, a duration and callback can be passed.
$("p")
  .slideUp("slow")
  .slideToggle(2000, function() {
    $(this).css("color", "red");
  });






////////////////////////////////////////////
// Fancy Animations with the .animate Method
////////////////////////////////////////////

// Set a few initial CSS properties.
$(":header").css({
  color: "blue",
  outline: "2px solid blue",
  opacity: 1
});

// Animate these properties to these values.
$(":header").animate(
  {
    opacity: "toggle",
    left: "+=50",
    height: "toggle"
  },
  // Over this duration.
  1000,
  // And when done, execute this callback.
  function() {
    $(this).css("color", "red");
  }
);






///////////////////////////////////////
// Stopping and Clearing Effects Queues
///////////////////////////////////////

// You can clear the effects queues on all selected elements, but the
// currently running effect animation will complete.
$("p").clearQueue();

// You can stop effect animations immediately.
$("p").stop();

// You can also clear the queue.
$("p").stop(true);

// And skip to the end of the current animation.
$("p").stop(true, true);

// Animations get queued, so...
$("li").hover(function() {
  $(this).animate({left: "+=20px"});
}, function() {
  $(this).animate({left: "-=20px"});
});

// Use .stop(true) to clear the queue, but...
$("li").hover(function() {
  $(this).stop(true).animate({left: "+=20px"});
}, function() {
  $(this).stop(true).animate({left: "-=20px"});
});

// Use .stop(true, true) to both clear the queue AND to jump the
// previous animation to the end.
$("li").hover(function() {
  $(this).stop(true, true).animate({left: "+=20px"});
}, function() {
  $(this).stop(true, true).animate({left: "-=20px"});
});

// By using absolute values, we no longer need to jump the previous
// animation to the end.
$("li").hover(function() {
  $(this).stop(true).animate({left: 20});
}, function() {
  $(this).stop(true).animate({left: 0});
});

// By experimenting with a combination of absolute values and the .stop
// method, we can come up with the best-looking visual effect.
$("li").hover(function() {
  $(this).stop(true).animate({left: 20});
}, function() {
  $(this).animate({left: 0});
});






///////////////////////
// Going a little Crazy
///////////////////////

// Iterate over a bunch of elements.
$(":header, p, li").each(function() {
  var elem = $(this);
  var copy = elem.clone().replaceAll(elem);
  var content = copy.text();

  // Set a completely made up CSS property on the element.
  copy.css({fakeProperty: 0})
    // Animate that property from the current value (0) to the new value (1).
    .animate({fakeProperty: 1}, {
      // Animate over a few seconds.
      duration: 3000,
      // Using a custom easing function.
      easing: "swing",
      // For each animation "tick" execute this function.
      step: function(pct) {
        copy.text(content.slice(0, Math.floor(content.length * pct)));
      },
      // When the animation is all done, replace the copy with the original!
      complete: function() {
        copy.replaceWith(elem);
      }
    });
});






/////////////////////////
// Animating Sequentially
/////////////////////////

// It's easy to animate a group of elements simultaneously...
$("li").hide().fadeIn(1000);

// But how would you animate those elements sequentially?
function next(elems) {
  // Fade in the first passed element.
  elems.eq(0).fadeIn(250, function() {
    // When the animation completes, pass all but the first
    // element back into `next`.
    next(elems.slice(1));
  });
}

// Call `next` with a collection of already-hidden elements.
next( $("li").hide() );

// Extra credit: Call `next` on every visible element and watch
// the DOM re-animate!
next( $(":visible").hide() );



// What if we wanted to make this into a plugin?
// https://gist.github.com/850322
jQuery.fn.seq = function seq(fn, done) {
  var elems = this;
  if (elems.length > 0) {
    fn.call(elems[0], function() {
      seq.call(elems.slice(1), fn, done);
    });
  } else if (done) {
    done();
  }
  return elems;
};

$(":visible").hide().seq(function(next) {
  $(this).fadeIn(250, next);
});
