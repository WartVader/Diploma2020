<?php
function AddToFV()
{
    session_start();
    include('settings.php');
    /* mysqli_query($connection, "INSERT INTO `fv_content`(id_user, id_content) 
    VALUES (1, (int)$_POST["id"])")  or die(mysqli_error($connection)); */
    $id_user = $_COOKIE['id'];
    $id_content = $_POST['id'];
    mysqli_query($connection, "INSERT INTO `fv_contents`(id_user, id_content) 
    VALUES ($id_user, $id_content)")  or die(mysqli_error($connection));

    $sql_contents = sprintf("SELECT `genres` FROM `contents` WHERE `id`=$id_content");
    $result = mysqli_query($connection, $sql_contents);
    $row = mysqli_fetch_assoc($result);

    $id = $_COOKIE['id'];
    $genres = preg_split("/,\s/", $row['genres']);
    $point = 5;
    $i = 0;
    //var_dump($genres);
    while ($i < count($genres)) {

        $sql = sprintf("SELECT * FROM `user_recomendation` WHERE `id_user` = $id AND `genre` = '$genres[$i]'");
        $result = mysqli_query($connection, $sql);
        $row = mysqli_fetch_assoc($result);
        if ($row) {
            $sql = "
            UPDATE `user_recomendation`
            SET `point` = `point` + $point
            WHERE `id_user` = $id AND `genre` = '$genres[$i]'";
            $result = mysqli_query($connection, $sql) or die(mysqli_error($connection));
        } else {
            //echo mysqli_error($connection) . $sql;
            $sql = "
            INSERT INTO `user_recomendation`(`id_user`, `genre`, `point`) 
            VALUES ($id, '$genres[$i]', $point)";
            $result = mysqli_query($connection, $sql)  or die(mysqli_error($connection));
        }
        $i++;
    }

    return true;
}

function GetFvContent($POSTdata)
{
    session_start();
    include('settings.php');
    $id = $_COOKIE['id'];
    $fvID = $POSTdata['id'];
    if ($fvID != null) {
        $sql_contents = sprintf("SELECT * FROM `fv_contents` WHERE `id_user`=$id AND `id_content`=$fvID");
        $result = mysqli_query($connection, $sql_contents);
        $row = mysqli_fetch_assoc($result);
        $id_content = $row['id_content'];
        $answer = "{id_content: '$id_content'}";
        return ($row);
    } else {
        $sql_contents = sprintf("SELECT * FROM `fv_contents` WHERE `id_user`=$id ORDER BY `id_content`");
        $result = mysqli_query($connection, $sql_contents);
        $fv_row = mysqli_fetch_all($result, MYSQLI_ASSOC);

        $i = 0;
        $answer = false;
        while ($i < count($fv_row)) {
            $id = $fv_row[$i]['id_content'];
            $sql_contents = sprintf("SELECT `id`, `poster`, `title` FROM `contents` WHERE `id`= $id");
            $result = mysqli_query($connection, $sql_contents);
            $row = mysqli_fetch_assoc($result);

            $answer[$i]['id'] = $row['id'];
            $answer[$i]['title'] = $row['title'];
            $answer[$i]['poster'] = $row['poster'];

            $i++;
        }
        return ($answer);
    }
}

function RemoveFv()
{
    session_start();
    include('settings.php');
    /* mysqli_query($connection, "INSERT INTO `fv_content`(id_user, id_content) 
    VALUES (1, (int)$_POST["id"])")  or die(mysqli_error($connection)); */
    $id_user = $_COOKIE['id'];
    $id_content = $_POST['id'];
    $sql = "DELETE FROM `fv_contents` WHERE `id_user` = '$id_user' AND `id_content` = '$id_content'";
    mysqli_query($connection, $sql)  or die(mysqli_error($connection));

    $sql_contents = sprintf("SELECT `genres` FROM `contents` WHERE `id`=$id_content");
    $result = mysqli_query($connection, $sql_contents);
    $row = mysqli_fetch_assoc($result);

    $id = $_COOKIE['id'];
    $genres = preg_split("/,\s/", $row['genres']);
    $point = 5;
    $i = 0;
    //var_dump($genres);
    while ($i < count($genres)) {

        $sql = sprintf("SELECT * FROM `user_recomendation` WHERE `id_user` = $id AND `genre` = '$genres[$i]'");
        $result = mysqli_query($connection, $sql);
        $row = mysqli_fetch_assoc($result);
        if ($row['point'] >= 5) {
            $sql = "
            UPDATE `user_recomendation`
            SET `point` = `point` - $point
            WHERE `id_user` = $id AND `genre` = '$genres[$i]'";
            $result = mysqli_query($connection, $sql) or die(mysqli_error($connection));
        } else if (!$row) {
            //echo mysqli_error($connection) . $sql;
            $sql = "
            INSERT INTO `user_recomendation`(`id_user`, `genre`, `point`) 
            VALUES ($id, '$genres[$i]', 0)";
            $result = mysqli_query($connection, $sql)  or die(mysqli_error($connection));
        }
        $i++;
    }
    return true;
}
