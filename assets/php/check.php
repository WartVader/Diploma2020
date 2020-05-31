<?php
    $_POST = json_decode(file_get_contents('php://input'));
    $login = $_POST->login;
    include_once('settings.php');
    $sql_login = sprintf("SELECT * FROM users WHERE login = '$login'");
    $result = mysqli_query($connection, $sql_login);
    $row = mysqli_fetch_assoc($result);
    if ($row)
        echo false;
    else    
        echo true;
    /* if ($row)
        $_POST->{'login'} = true;
    else    
        $_POST->{'login'} = false; */
    //echo json_encode($_POST);
    exit();
?>