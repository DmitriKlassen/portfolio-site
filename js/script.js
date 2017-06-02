$(function () {
  // apply before / after classes to panes
  $(".pane:first()").addClass("active");
  $(".pane:not(.active)").addClass("after");

  // variables for scroll event
  var canPane = true;
  var inScrollable = false;
  var paneDelay = 300; // how long a pane transition takes (should line up with css)

  // function called at start of pane transition
  function startLoad () {
    $(".pane.active svg path").css("animation-name", "draw");
  }

  // function called at end of pane transition
  function finishLoad () {
    $(".pane.before svg path").css("animation-name", "none");
    $(".pane.after svg path").css("animation-name", "none");
    canPane = true;
  }

  // initiate first pane
  $(".pane.active svg path").css("animation-name", "draw");

  // handle scroll event
  $("body").bind("mousewheel", function (e) {
    if (e.originalEvent.wheelDelta < 0) {
      console.log($(".scrollable:hover").length);
      if ($(".pane.after").length && canPane && $(".scrollable:hover").length == 0) {
        // change pane classes
        $(".pane.active").addClass("before");
        $(".pane.active").removeClass("active");
        $(".pane.after:first()").addClass("active");
        $(".pane.after:first()").removeClass("after");
        
        canPane = false;
        startLoad();
        setTimeout(function() {finishLoad ()}, paneDelay);
      }
    }
    else {
      console.log($(".scrollable:hover").length);
      if ($(".pane.before").length && canPane && $(".scrollable:hover").length == 0) {
        $(".pane.active").addClass("after");
        $(".pane.active").removeClass("active");
        $(".pane.before:last()").addClass("active");
        $(".pane.before:last()").removeClass("before");

        canPane = false;
        startLoad();
        setTimeout(function() {finishLoad ()}, paneDelay);
      }
    }
  });

  // handle animation from left to right
  for (i = 0; i < $(".pane").length; i++) {
    for (j = 0; j < $(".pane:nth-child(1) svg path").length; j++) {
      $(".pane:nth-child(" + String(i + 1) + ") svg path:nth-child(" + String(j + 1) + ")")
        .css("animation-delay", String((j) * .15) + "s");
    }
  }

  // handle changing skills content
  $(".skills .icon-container").click(function() {
    $(".skills .icon-container").addClass("hidden");
    $(".head-skills .icon-container:nth-child(" + String($(this).index() + 1) + ")").addClass("visible");
    $(".skill-description .description-container:nth-child(" + String($(this).index() + 1) + ")").addClass("visible");
  });
  
  $(".head-skills .icon-container").click(function() {
    $(".skills .icon-container").removeClass("hidden");
    $(".head-skills .icon-container").removeClass("visible");
    $(".skill-description .description-container").removeClass("visible");
  });
});