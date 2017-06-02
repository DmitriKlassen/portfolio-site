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
});