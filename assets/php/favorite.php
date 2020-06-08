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
    $id_user = $_SESSION['id'];
    $id_content = (int) $_POST['id'];
    mysqli_query($connection, "DELETE FROM `fv_contents` 
    WHERE `id_user` = $id_user AND `id_content` = $id_content")  or die(mysqli_error($connection));
    return true;
}
