<?php
    session_start();
    include_once('settings.php');
    /* mysqli_query($connection, "INSERT INTO `fv_content`(id_user, id_content) 
    VALUES (1, (int)$_POST["id"])")  or die(mysqli_error($connection)); */
    $id_user = $_SESSION['id'];
    $id_content = (int)$_POST['id'];
    mysqli_query($connection, "DELETE FROM `fv_contents` 
    WHERE `id_user` = $id_user AND `id_content` = $id_content")  or die(mysqli_error($connection)); 
    echo "true";
?>