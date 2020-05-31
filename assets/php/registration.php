<?php
    session_start();
    include_once('settings.php');
    $username = mysql_escape_string($_POST['username']);
    $login = mysql_escape_string($_POST['login']);
    $password = mysql_escape_string($_POST['password']);
    $r_password = mysql_escape_string($_POST['r_password']);
    if($password == $r_password)
    {

        mysqli_query($connection, "INSERT INTO users(id, username, login, password, role) 
        VALUES ('', '$username', '$login', '$password', 'user')")  or die(mysqli_error($connection));

        /* $sql_login = sprintf("SELECT * FROM `users` WHERE login = '$login'");
        $result = mysqli_query($connection, $sql_login);
        $row = mysqli_fetch_assoc($result);
        $password = md5($password.$salt.$login.$salt);
        if (!$row)
        {
                    
        }
        elseif($row){
            echo "exist";
        } */
    }
    else
    {   
        echo "password";
    }

    
?>

<?php
    //$_POST = json_decode(file_get_contents('php://input'));    
    include_once('settings.php');

    $username = mysql_escape_string($_POST['username']);
    $login = mysql_escape_string($_POST['login']);
    $password = mysql_escape_string($_POST['password']);
    
    $password = md5($password.$salt.$login.$salt);

    mysqli_query($connection, "INSERT INTO users(id, username, login, password, role) VALUES ('', '$username', '$login', '$password', 'user')")  or die(mysqli_error($connection));
    echo true;
?>