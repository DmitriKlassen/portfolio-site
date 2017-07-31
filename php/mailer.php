<?php
  if($_SERVER["REQUEST_METHOD"] == "POST"){
    // post requests (good)
    $recipient = "dmitri@dmitriklassen.com";
    $secret = "6LcD3SgUAAAAAAQjVlLYNX6iQ_FJ-Lp-jxr8o9Uj";
    // remove whitespace from user inputs
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r", "\n"), array(" ", " "), $name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);
    $response = trim($_POST["g-recaptcha-response"]);

    // verify recaptcha
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $secret . "&response=" . $response);
    $response = json_decode($verify);

    // check recaptcha
    if($response->success){
      // check submission is intact
      if(empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)){
        http_response_code(400);
        echo "An error has occurred. Please ensure the form is complete and try again.";
        exit;
      }

      // build email
      $subject = "Portfolio Site Contact from $name";
      $emailContent = "Name: $name\n";
      $emailContent .= "Email: $email\n\n";
      $emailContent .= "Message: \n$message\n";

      // send email
      if(mail($recipient, $subject, $emailContent)){
        // message sent (good)
        http_response_code(200);
        echo "Thank you! Your message has been sent.";
      }else{
        // internal error (bad)
        http_response_code(500);
        echo "An error has occurred. Please refresh the page and try again. If the issue persists, please try again later or send your message to the email address below. Sorry for the inconvenience.";
      }
    }else{
        http_response_code(400);
        echo "reCAPTCHA error occurred. Please refresh the page and try again.";
    }
  }else{
    // not post request (bad). set 403 (forbidden)
    http_response_code(403);
    echo "An error has occurred. Please refresh the page and try again.";
  }
?>