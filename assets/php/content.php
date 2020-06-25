<?php
function AddContent()
{
    include('settings.php');
    $kpID = mysqli_real_escape_string($connection, $_POST['data']['filmId']);
    $title = mysqli_real_escape_string($connection, $_POST['data']['nameRu']);
    $titleEng = mysqli_real_escape_string($connection, $_POST['data']['nameEn']);
    $premiereWorld = mysqli_real_escape_string($connection, $_POST['data']['premiereWorld']);
    $premiereRu = mysqli_real_escape_string($connection, $_POST['data']['premiereRu']);
    $description = mysqli_real_escape_string($connection, $_POST['data']['description']);
    $genres = mysqli_real_escape_string($connection, $_POST['fullGenres']);
    $ageLimit = mysqli_real_escape_string($connection, $_POST['data']['ratingAgeLimits']);
    $poster = mysqli_real_escape_string($connection, $_POST['data']['posterUrl']);
    $imdb_rating = mysqli_real_escape_string($connection, $_POST['rating']['ratingImdb']);
    $kp_rating = mysqli_real_escape_string($connection, $_POST['rating']['rating']);
    $country = mysqli_real_escape_string($connection, $_POST['fullCountries']);
    $time = mysqli_real_escape_string($connection, $_POST['data']['filmLength']);
    $type = mysqli_real_escape_string($connection, $_POST['data']['type']);

    $sql = "INSERT INTO `contents` 
    (`id`, `kp_id`, `title`, `title_eng`, `premiereWorld`, `premiereRu`, `description`, `genres`, `age_limit`, 
    `poster`, `imdb_rating`, `kp_rating`, `country`, `time`, `type`) 
    VALUES 
    ('', '$kpID', '$title', '$titleEng', '$premiereWorld', '$premiereRu', '$description', '$genres', '$ageLimit', 
    '$poster', '$imdb_rating', '$kp_rating', '$country', '$time', '$type');";

    mysqli_query($connection, $sql)  or die(mysqli_error($connection));

    return true;
}

function LoadContent($recomend = false)
{
    include('settings.php');
    //include_once('GetData.php');
    $type = $_POST['type'];
    if ($type == false) {
        $sql_contents = sprintf("SELECT * FROM `contents`");
    } else if ($type == 'serial') {
        $sql_contents = sprintf("SELECT * FROM `contents` WHERE `type`!='FILM'");
    } else if ($type == 'film') {
        $sql_contents = sprintf("SELECT * FROM `contents` WHERE `type`='FILM'");
    }
    $result = mysqli_query($connection, $sql_contents)  or die(mysqli_error($connection));
    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
    /* return $recomend; */
    if ($recomend == "true") {
        $id = $_COOKIE['id'];
        $i = 0;

        while ($i < count($row)) {
            $row[$i]["recPoints"] = 0;
            $genres = preg_split("/,\s/", $row[$i]['genres']);
            $j = 0;
            while ($j < count($genres)) {
                $sql = sprintf("SELECT `point` FROM `user_recomendation` WHERE `id_user` = $id AND `genre` = '$genres[$j]'");
                $result = mysqli_query($connection, $sql);
                $rowRec = mysqli_fetch_assoc($result);
                $row[$i]["recPoints"] += $rowRec['point'];

                $j++;
            }

            $i++;
        }
    }

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
