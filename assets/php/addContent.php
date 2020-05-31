<?php
    include_once('settings.php');

    $imdbID = mysql_escape_string($_POST['imdbID']);
    $title = mysql_escape_string($_POST['Title']);
    $date = mysql_escape_string($_POST['Released']);
    $description = mysql_escape_string($_POST['Plot']);
    $poster = mysql_escape_string($_POST['Poster']);
    $imdb_rating = mysql_escape_string($_POST['imdbRating']);
    $actors = mysql_escape_string($_POST['Actors']);
    $country = mysql_escape_string($_POST['Country']);
    $time = mysql_escape_string($_POST['Runtime']);
    $type = mysql_escape_string($_POST['Type']);
    $writer = mysql_escape_string($_POST['Writer']);
    
    mysqli_query($connection, "INSERT INTO `contents` 
    (`id`, `imdb_id`, `title`, `date`, `description`, `poster`, `imdb_rating`, 
    `kp_rating`, `actors`, `country`, `time`, `type`, `writer`) 
    VALUES 
    (NULL, '$imdbID', '$title', '$date', '$description', '$poster', '$imdb_rating', 
    '', '$actors', '$country', '$time', '$type', '$writer');")  or die(mysqli_error($connection));

    echo true;
?>