<?php
    session_start();
    include_once('settings.php');
    $id = $_POST['id'];
    $sql_contents = sprintf("SELECT * FROM `contents` WHERE `id`=$id");
    $result = mysqli_query($connection, $sql_contents);
    $row = mysqli_fetch_assoc($result);
    echo json_encode($row);
?>