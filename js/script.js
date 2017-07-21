// function to change text (may be used for cool transitions later)
function changeText(selector, newText){
  $(selector).html(newText);
}

$(function () {
  // handle mobile nav bar
  $("nav .container .hamburger").click(function(){
    $("nav").toggleClass("active");
  });

  // handle animation from left to right
  for(i = 0; i < $("#banner .name path").length; i++){
    $("#banner .name path:nth-child(" + String(i + 1) + ")")
      .css("animation-delay", String((i) * .15) + "s");
  }
  // use jquery to set animation delays for all banner elements so they will have no
  // delays set in ie and edge where neither the jquery nor the svg animations are supported
  $("#banner .logo path").css("animation-delay", "2.4s");
  $("#banner .logo #d path").css("animation-delay", "4.3s");
  $("#banner .logo #k2 path, #banner .logo #k3 path, #banner .logo #k4 path").css("animation-delay", "4.1s");
  $("#banner .logo #k1 path").css("animation-delay", "3.9s");
  $("#banner p").css("animation-delay", "4.5s");

  // array for all tab content
  var tabs = [
    "I am a website developer currently looking for a team to be a part of and learn from. Feel free to check out some of my skills with the tabs.",
    "With a strong understanding of HTML, I develop readable, well commented markup.",
    "Proficient in CSS and SASS, I turn concepts into websites, down to the finest details.",
    "Using JavaScript and JQuery, I turn great <i>looking</i> websites into great <i>feeling</i> websites with interactive elements.",
    "I use GIT for version control, ensuring I am always prepared for the worst.",
    "I have light experience with Angular 2, Node, PHP, SQL, MongoDB, Photoshop and more. I am ready to learn more about these or other technologies, should it be appropriate."
  ];

  // handle skills nav tab system
  $(".navbar .nav button").click(function(){
    if(!$(this).parent().hasClass("active")){
      $(".navbar .nav").removeClass("active");
      $(this).parent().addClass("active");
      changeText("#skills .content p", tabs[$(this).parent().index()]);
    }
  });

  // about more/less button
  $("#about button.more").click(function(){
    if($(this).hasClass("less")){
      $("#about .text:not(:nth-child(2))").css("display", "none");
      $(this).blur();
      $(this).removeClass("less");
      changeText("#about button p", "MORE");
    }
    else {
      $("#about p").css("display", "block");
      $(this).blur();
      $(this).addClass("less");
      changeText("#about button p", "LESS");
    }
  });

  // contact form
  var contact = $("#contact-form");
  var formMessages = $(".form-messages");

  contact.submit(function(e){
    e.preventDefault();

    // serialize form
    var serialized = contact.serialize();

    $.ajax({
      // ajax request
      type: "POST",
      url: "php/mailer.php",
      data: serialized

    }).done(function(res){
      // form success
      // change message style to success
      formMessages.addClass("done");
      formMessages.removeClass("fail");

      // output result message
      formMessages.html(res);

      // clear form
      $("#name").val('');
      $("#email").val('');
      $("#message").val('');
      grecaptcha.reset();
      $("#contact-form button p").text("SEND");

    }).fail(function(data){
      // form failure
      // change message style to failure
      formMessages.addClass("fail");
      formMessages.removeClass("done");

      // output error message if there is one
      if(data.responseText != ""){
        formMessages.html(data.responseText);
      }else{
        formMessages.text("An error has occurred. Please refresh the page and try again. If the issue persists, please try again later or send your message to the email address below. Sorry for the inconvenience.");
      }

      grecaptcha.reset();
      $("#contact-form button p").text("SEND");
    });
  });
});