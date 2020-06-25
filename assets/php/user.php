<?php

function Registration()
{
    session_start();
    include('settings.php');
    $username = mysqli_real_escape_string($connection, $_POST['username']);
    $login = mysqli_real_escape_string($connection, $_POST['login']);
    $password = mysqli_real_escape_string($connection, $_POST['password']);
    $r_password = mysqli_real_escape_string($connection, $_POST['r_password']);
    if ($password == $r_password) {
        $password = password_hash($password, PASSWORD_BCRYPT);
        mysqli_query($connection, "INSERT INTO users(id, username, login, password, role) 
        VALUES ('', '$username', '$login', '$password', 'user')")  or die(mysqli_error($connection));

        $sql_login = sprintf("SELECT * FROM users WHERE login = '$login'");
        $result = mysqli_query($connection, $sql_login);
        $row = mysqli_fetch_assoc($result);

        $_SESSION['id'] = $row['id'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['role'] = $row['role'];

        setcookie("id", $row['id'], time() + 259200, '/');
        setcookie("role", $row['role'], time() + 259200, '/');
        setcookie("login", $login, time() + 259200, '/');
        setcookie('username', $row['username'], time() + 259200, '/'); //будет храниться всего 3 дня, но можно и больше, конечно
        return true;
    }
    return false;
}

function CheckReg()
{
    session_start();
    include('settings.php');
    $login = mysqli_real_escape_string($connection, $_POST['login']);
    $password = mysqli_real_escape_string($connection, $_POST['password']);
    $r_password = mysqli_real_escape_string($connection, $_POST['r_password']);

    $answer["login"] = true;
    $answer["password"] = true;

    $sql_login = sprintf("SELECT * FROM users WHERE login = '$login'");
    $result = mysqli_query($connection, $sql_login);
    $row = mysqli_fetch_assoc($result);

    if ($row != NULL) {
        $answer["login"] = false;
    }
    if ($password != $r_password) {
        $answer["password"] = false;
    }

    return $answer;
}


function Login()
{
    session_start();

    include('settings.php');

    $login = $_POST['login'];
    $password = $_POST['password'];

    $sql_login = sprintf("SELECT * FROM users WHERE login = '$login'");
    $result = mysqli_query($connection, $sql_login);
    $row = mysqli_fetch_assoc($result);
    if (password_verify($password, $row['password'])) {
        $error = "";
        $_SESSION['id'] = $row['id'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['role'] = $row['role'];

        setcookie("id", $row['id'], time() + 259200, '/');
        setcookie("role", $row['role'], time() + 259200, '/');
        setcookie("login", $login, time() + 259200, '/');
        setcookie('username', $row['username'], time() + 259200, '/'); //будет храниться всего 3 дня, но можно и больше, конечно

        return true;
        //header("Location: index.php");
        //exit();

    } else {
        return false;
    }
}

function GetUserInfo()
{
    $answer['id'] = $_COOKIE['id'];
    $answer['role'] = $_COOKIE['role'];
    $answer['login'] = $_COOKIE['login'];
    $answer['username'] = $_COOKIE['username'];
    return ($answer);
}

function GetUserRating($id_content)
{
    include('settings.php');
    $id_user = $_COOKIE['id'];
    $sql = "SELECT rating FROM `user_ratings` WHERE id_user = $id_user AND id_content = $id_content";
    $result = mysqli_query($connection, $sql)  or die(mysqli_error($connection));
    $row = mysqli_fetch_assoc($result);
    return $row;
}

function UserExit()
{
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
}

function isAdmin()
{
    if ($_COOKIE['role'] == "admin")
        return true;
    else
        return false;
}
