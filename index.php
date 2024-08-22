<?php
// Remove the directory path we don't want
$request = str_replace(dirname($_SERVER['PHP_SELF']), '', $_SERVER['REQUEST_URI']);

// Split the path by '/'
$path = explode('/', $request);

// Remove empty elements
$path = array_filter($path);

// If the path is empty, serve the home page
if (empty($path)) {
    $page = 'home';
} else {
    // Get the last element of the path (filename)
    $page = end($path);
}

// Remove any query string
$page = strtok($page, '?');

// Remove .html if it's there
$page = str_replace('.html', '', $page);

// Check if the .html file exists
if (file_exists($page . '.html')) {
    include($page . '.html');
} else {
    // Handle 404 error
    header("HTTP/1.0 404 Not Found");
    include('404.html');
}
?>
