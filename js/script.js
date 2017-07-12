// function to change text (may be used for cool transitions later)
function changeText(selector, newText){
  $(selector).html(newText);
}

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

  // array for all tab content
  var tabs = [
    "I am a website developer currently looking for a team to be a part of and learn from. Feel free to check out some of my skills with the above tabs.",
    "With a strong understanding of HTML, I develop readable, well commented markup.",
    "Proficient in CSS and SASS, I turn concepts into websites, down to the finest details.",
    "Using JavaScript and JQuery, I turn great <i>looking</i> websites into great <i>feeling</i> websites with interactive elements.",
    "I use GIT for version control, ensuring I am always prepared for the worst.",
    "I have light experience with Angular 2, Node, PHP, SQL, MongoDB, Photoshop and more. I am ready to learn more about these or other technologies, should it be appropriate."
  ];

  // handle nav tab system
  $(".navbar .nav").click(function(){
    if(!$(this).hasClass("active")){
      $(".navbar .nav").removeClass("active");
      $(this).addClass("active");
      changeText("#skills .content p", tabs[$(this).index()]);
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
  var contact = $("#contact");
  var formMessages = $(".form-messages");

  contact.submit(function(e){
    e.preventDefault();

    var serialized = form.serialize();

    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: serialized

    }).done(function(res){
      formMessages.addClass("done");
      formMessages.removeClass("fail");

      formMessages.text(res);

      $("#name").val('');
      $("#email").val('');
      $("#message").val('');

    }).fail(function(data){
      formMessages.addClass("fail");
      formMessages.removeClass("done");

      if(data.responseText != ""){
        formMessages.text(data.responseText);
      }else{
        formMessages.text("An error has occured. Please try again later or send your message via email to the address below. Sorry for the inconvenience.");
      }
    });
  });
});