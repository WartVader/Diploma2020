<?php
function RateContent($id_content, $rating)
{
    $id_user = $_COOKIE['id'];
    include('settings.php');
    mysqli_query($connection, "INSERT INTO user_ratings(id_user, id_content, rating) 
        VALUES ('$id_user', '$id_content', '$rating')")  or die(mysqli_error($connection));
    return true;
}

function GetFullRating($id)
{
    include('settings.php');
    $contentID = $id;

    $sql_contents = sprintf("SELECT SUM(`rating`)/COUNT(`rating`) AS `users`, `imdb_rating` AS `imdb`
        FROM `user_ratings`, `contents`
        WHERE `id_content` = $contentID AND `id` = $contentID");
    $result = mysqli_query($connection, $sql_contents);
    $row = mysqli_fetch_assoc($result);
    return ($row);
}

function Unrate($id_content)
{
    session_start();
    include('settings.php');
    /* mysqli_query($connection, "INSERT INTO `fv_content`(id_user, id_content) 
    VALUES (1, (int)$_POST["id"])")  or die(mysqli_error($connection)); */
    $id_user = $_SESSION['id'];
    mysqli_query($connection, "DELETE FROM `user_ratings` 
    WHERE `id_user` = $id_user AND `id_content` = $id_content")  or die(mysqli_error($connection));
    return true;
}
