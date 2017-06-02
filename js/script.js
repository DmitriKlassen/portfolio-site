$(function () {
  // handle nav bar
  $("nav .container .hamburger").click(function(){
    $("nav").toggleClass("active");
  });

  // handle animation from left to right
  for(i = 0; i < $("#banner svg path").length; i++){
    $("#banner svg path:nth-child(" + String(i + 1) + ")")
      .css("animation-delay", String((i) * .15) + "s");
  }

  // handle changing skills content
  $(".skill-gallery .icon-container").click(function() {
    $(".skill-gallery .icon-container").addClass("hidden");
    $(".head-skills .icon-container:nth-child(" + String($(this).index() + 1) + ")").addClass("visible");
    $(".skill-description .description-container:nth-child(" + String($(this).index() + 1) + ")").addClass("visible");
  });
  
  $(".head-skills .icon-container").click(function() {
    $(".skill-gallery .icon-container").removeClass("hidden");
    $(".head-skills .icon-container").removeClass("visible");
    $(".skill-description .description-container").removeClass("visible");
  });
});