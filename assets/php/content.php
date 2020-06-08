<?php
function AddContent()
{
    include('settings.php');
    $kpID = mysqli_real_escape_string($connection, $_POST['filmId']);
    $title = mysqli_real_escape_string($connection, $_POST['nameRu']);
    $titleEng = mysqli_real_escape_string($connection, $_POST['nameEn']);
    $date = mysqli_real_escape_string($connection, $_POST['premiereWorld']);
    $description = mysqli_real_escape_string($connection, $_POST['description']);
    $genres = mysqli_real_escape_string($connection, $_POST['fullGenres']);
    $ageLimit = mysqli_real_escape_string($connection, $_POST['ratingAgeLimits']);
    $poster = mysqli_real_escape_string($connection, $_POST['posterUrl']);
    $imdb_rating = mysqli_real_escape_string($connection, $_POST['ratingImdb']);
    $kp_rating = mysqli_real_escape_string($connection, $_POST['rating']);
    $country = mysqli_real_escape_string($connection, $_POST['fullCountries']);
    $time = mysqli_real_escape_string($connection, $_POST['filmLength']);
    $type = mysqli_real_escape_string($connection, $_POST['type']);

    $sql = "INSERT INTO `contents` 
    (`id`, `kp_id`, `title`, `title_eng`, `date`, `description`, `genres`, `age_limit`, 
    `poster`, `imdb_rating`, `kp_rating`, `country`, `time`, `type`) 
    VALUES 
    ('', '$kpID', '$title', '$titleEng', '$date', '$description', '$genres', '$ageLimit', 
    '$poster', '$imdb_rating', '$kp_rating', '$country', '$time', '$type');";

    mysqli_query($connection, $sql)  or die(mysqli_error($connection));

    return true;
}

function LoadContent()
{
    include('settings.php');
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
    return $row;
}

function LoadMainContent()
{
    session_start();
    include('settings.php');
    $id = $_POST['id'];
    $sql_contents = sprintf("SELECT * FROM `contents` WHERE `id`=$id");
    $result = mysqli_query($connection, $sql_contents);
    $row = mysqli_fetch_assoc($result);
    return ($row);
}
