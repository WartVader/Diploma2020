<?php
    include_once('settings.php');
    //include_once('GetData.php');

    $sql_contents = sprintf("SELECT * FROM `contents`");
    $result = mysqli_query($connection, $sql_contents);
    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
    /* $i = 0;
    $fv_content = GetFvContent();
    while($i < count($fv_content))
    {
        if($row['id'] == $fv_content[$i]['id'])
        {
            $row['Like'] = true;
        }
        
        $i++;
    }  */
    echo json_encode($row);
?>