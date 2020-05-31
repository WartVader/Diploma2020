<?php
    session_start();
    include_once('settings.php');
    $id = $_COOKIE['id'];
    $fvID = $_POST['id'];
    if($fvID != null)
    {
        $sql_contents = sprintf("SELECT * FROM `fv_contents` WHERE `id_user`=$id AND `id_content`=$fvID");
        $result = mysqli_query($connection, $sql_contents);
        $row = mysqli_fetch_assoc($result);
        $id_content = $row['id_content'];
        $answer = "{id_content: '$id_content'}";
        echo json_encode($row);
    }
    else{
        $sql_contents = sprintf("SELECT * FROM `fv_contents` WHERE `id_user`=$id ORDER BY `id_content`");
        $result = mysqli_query($connection, $sql_contents);
        $fv_row = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
        $i = 0;
        $answer = false;
        while($i < count($fv_row))
        {
            $id = $fv_row[$i]['id_content'];
            $sql_contents = sprintf("SELECT `id`, `poster`, `title` FROM `contents` WHERE `id`= $id");
            $result = mysqli_query($connection, $sql_contents);
            $row = mysqli_fetch_assoc($result);
    
            $answer[$i]['id'] = $row['id'];
            $answer[$i]['title'] = $row['title'];
            $answer[$i]['poster'] = $row['poster'];
            
            $i++;
        }
        echo json_encode($answer);
    }
    
?>