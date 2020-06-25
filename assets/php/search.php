<?php
function SearchKP_name($name)
{

    $opts = [
        "http" => [
            "method" => "GET",
            "header" => "Content-type: application/x-www-form-urlencoded\r\n" .
                "X-API-KEY: cf1fb679-cc1c-43c2-ba84-36f615f6cec2\r\n"
        ]
    ];

    $context = stream_context_create($opts);

    $url = "http://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=" . urlencode("$name") . "&page=1";
    //echo $url;
    $result = json_decode(
        file_get_contents(
            $url,
            false,
            $context
        )
    );

    return $result;
}

function SearchKP_id($id)
{

    $opts = [
        "http" => [
            "method" => "GET",
            "header" => "Content-type: application/x-www-form-urlencoded\r\n" .
                "X-API-KEY: cf1fb679-cc1c-43c2-ba84-36f615f6cec2\r\n"
        ]
    ];

    $context = stream_context_create($opts);

    $url = "https://kinopoiskapiunofficial.tech/api/v2.1/films/$id?append_to_response=RATING";
    //echo $url;
    $result = json_decode(
        file_get_contents(
            $url,
            false,
            $context
        )
    );

    return $result;
}

function Search($name)
{
    include('settings.php');
    $result = mysqli_query($connection, "SELECT * FROM `contents` WHERE `title` LIKE '%$name%'");
    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);

    return $row;
}
