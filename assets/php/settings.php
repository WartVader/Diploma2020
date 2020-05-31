<?php
    define('HOST', 'localhost');
    define('USER', 'root');
    define('PASSWORD', '');
    define('DB', 'diplom');
    //define('DBanother', 'my_db');

    $connection = mysqli_connect(HOST, USER, PASSWORD, DB);
    $salt = "This is site was made by Ilfat Use_aev 2020";

    if(!$connection)
        exit(mysql_error());
?>