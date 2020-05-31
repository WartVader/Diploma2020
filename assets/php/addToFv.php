<?php
    session_start();
    include_once('settings.php');
    /* mysqli_query($connection, "INSERT INTO `fv_content`(id_user, id_content) 
    VALUES (1, (int)$_POST["id"])")  or die(mysqli_error($connection)); */
    $id_user = $_SESSION['id'];
    $id_content = $_POST['id'];
    mysqli_query($connection, "INSERT INTO `fv_contents`(id_user, id_content) 
    VALUES ($id_user, '$id_content')")  or die(mysqli_error($connection)); 
    echo true;
?>