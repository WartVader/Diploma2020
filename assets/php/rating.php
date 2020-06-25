<?php
function RateContent($id_content, $rating)
{
    $id_user = $_COOKIE['id'];
    include('settings.php');
    mysqli_query($connection, "INSERT INTO user_ratings(id_user, id_content, rating) 
        VALUES ('$id_user', '$id_content', '$rating')")  or die(mysqli_error($connection));
    $rate = GetFullRating($id_content)["users"];

    mysqli_query($connection, "UPDATE contents 
        SET user_rating = $rate 
        WHERE id = $id_content;");
    return true;
}

function Unrate($id_content)
{
    session_start();
    include('settings.php');
    /* mysqli_query($connection, "INSERT INTO `fv_content`(id_user, id_content) 
    VALUES (1, (int)$_POST["id"])")  or die(mysqli_error($connection)); */
    $id_user = $_COOKIE['id'];
    mysqli_query($connection, "DELETE FROM `user_ratings` 
    WHERE `id_user` = $id_user AND `id_content` = $id_content")  or die(mysqli_error($connection));
    $rate = GetFullRating($id_content)["users"];
    if (!$rate)
        $rate = 0;
    mysqli_query($connection, "UPDATE contents 
        SET user_rating = $rate 
        WHERE id = $id_content;");
    return true;
}

function GetFullRating($id)
{
    include('settings.php');
    $contentID = $id;

    $sql_contents = sprintf("SELECT SUM(`rating`)/COUNT(`rating`) AS `users`, `imdb_rating` AS `imdb`, `kp_rating` AS `kp`
        FROM `user_ratings`, `contents`
        WHERE `id_content` = $contentID AND `id` = $contentID");
    $result = mysqli_query($connection, $sql_contents);
    $row = mysqli_fetch_assoc($result);
    return ($row);
}

function isRate($id_content)
{
    include('settings.php');
    $id_user = $_COOKIE['id'];
    $sql_contents = sprintf("SELECT `id_content`
        FROM `user_ratings`
        WHERE `id_content` = $id_content AND `id_user` = $id_user");
    $result = mysqli_query($connection, $sql_contents);
    $row = mysqli_fetch_assoc($result);
    if ($row)
        return true;
    else
        return false;
}
