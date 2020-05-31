<?php
    session_start();
    session_destroy();
    unset($_COOKIE['id']);
    unset($_COOKIE['role']);
    unset($_COOKIE['login']);
    unset($_COOKIE['username']);
    setcookie('id', null, -1, '/'); 
    setcookie('role', null, -1, '/'); 
    setcookie('login', null, -1, '/'); 
    setcookie('username', null, -1, '/'); 
    echo $_COOKIE['id'];
    echo $_COOKIE['role'];
    echo $_COOKIE['login'];
    echo $_COOKIE['username'];
    header("Location: ../../index.html");
?>