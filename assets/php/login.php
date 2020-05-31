<?php
    session_start();

    include_once('settings.php');
    
    $login = $_POST['login'];
    $password = $_POST['password'];

    $sql_login = sprintf("SELECT * FROM users WHERE login = '$login'");
    $result = mysqli_query($connection, $sql_login);
    $row = mysqli_fetch_assoc($result);
    if (md5($password.$salt.$login.$salt) == $row['password']){
        $error = "";
        $_SESSION['id'] = $row['id'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['role'] = $row['role'];

        setcookie("id", $row['id'], time() + 259200, '/');
        setcookie("role", $row['role'], time() + 259200, '/');
        setcookie("login", $login, time() + 259200, '/');
        setcookie('username', $row['username'], time() + 259200, '/');//будет храниться всего 3 дня, но можно и больше, конечно
        
        echo true;
        //header("Location: index.php");
        //exit();
        
    }
    else {
        echo false;
    }
    
    
?>