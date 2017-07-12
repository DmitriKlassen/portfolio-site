<?php
  if($_SERVER["REQUEST_METHOD"] == "POST"){
    // post requests (good)
    echo $_POST["name"];
  }else{
    // not post request (bad). set 403 (forbidden)
    http_response_code(403);
    echo "An error has occured. Please refresh the page and try again. Sorry for the inconvenience.";
  }
?>