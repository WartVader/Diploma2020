<?php
function Recomend($id)
{
    include("settings.php");

    $sql = sprintf("SELECT * FROM `user_recomendation` WHERE `id_user`=$id");
    $result = mysqli_query($connection, $sql);
    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);

    return ($row);
}

function AddToRecomend()
{
    include("settings.php");

    $id = $_COOKIE['id'];
    $genre = $_POST['genre'];
    $point = $_POST['point'];
    mysqli_query($connection, "INSERT INTO `user_recomendation`(`id_user`, `genre`, `point`) 
        VALUES ('$id', '$username', '$login', '$password', 'user')")  or die(mysqli_error($connection));
    $sql = sprintf("SELECT SUM() FROM `user_recomendation` GROUP BY `genre` WHERE `id_user`=$id");
    $result = mysqli_query($connection, $sql);
    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);

    return ($row);
}
