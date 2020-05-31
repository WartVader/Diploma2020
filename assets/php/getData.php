<?php
    session_start();
    

    function GetFvContent(){
        include('settings.php');
        $id = $_COOKIE['id'];
        $sql_contents = sprintf("SELECT * FROM `fv_contents` WHERE `id_user`=$id");
        $result = mysqli_query($connection, $sql_contents);
        $fv_row = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
        $i = 0;
        $answer;
        while($i < count($fv_row))
        {
            $id = $fv_row[$i]['id_content'];
            $sql_contents = sprintf("SELECT `id`, `poster`, `title` FROM `contents` WHERE `id`= $id");
            $result = mysqli_query($connection, $sql_contents);
            $row = mysqli_fetch_assoc($result);
    
            $answer[$i]= $row['id'];
            //$answer[$i]['title'] = $row['title'];
            //$answer[$i]['poster'] = $row['poster'];
            
            $i++;
        }
        return $answer;
    }
    
?>