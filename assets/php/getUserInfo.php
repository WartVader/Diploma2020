<?php
    session_start();

    $answer['id'] = $_COOKIE['id'];
    $answer['login'] = $_COOKIE['login'];
    $answer['username'] = $_COOKIE['username'];
    echo json_encode($answer);
?>