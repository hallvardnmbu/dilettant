<?php
$request = str_replace(dirname($_SERVER["PHP_SELF"]), "", $_SERVER["REQUEST_URI"]);

// Split the path by '/'
$path = explode("/", $request);

// Remove empty elements
$path = array_filter($path);

// If the path is empty, serve the home page
if (empty($path)) {
    $page = "kontakt.html";
} else {
    // Get the last element of the path (filename)
    $page = end($path);
}

// Check if the .html file exists
if (file_exists($page)) {
    include $page;
} else {
    include "kontakt.html";
}
?>
