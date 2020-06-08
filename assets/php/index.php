<?php
// 1) require конфига и других файлов
include_once('settings.php');
include_once('user.php');
include_once('content.php');
include_once('favorite.php');
include_once('rating.php');




// 2) проверка пользователя, если он вошел
session_start();

// 3) вызов конкретного метода
$method = $_GET['method'] ?? 'default';
switch ($method) {
    case 'addContent':
        $res = AddContent($_POST);
        break;
    case 'addToFv':
        $res = AddToFv($_POST);
        break;
    case 'exit':
        $res = UserExit();
        break;
    case 'getFvContent':
        $res = GetFvContent($_POST);
        break;
    case 'getUserInfo':
        $res = GetUserInfo();
        break;
    case 'loadContent':
        $res = LoadContent();
        break;
    case 'loadMainContent':
        $res = LoadMainContent($_POST);
        break;
    case 'login':
        $res = Login($_POST);
        break;
    case 'registration':
        $res = Registration($_POST);
        break;
    case 'removeFv':
        $res = RemoveFv($_POST);
        break;
    case 'getFullRating':
        $res = GetFullRating($_POST['id']);
        break;
    case 'rateContent':
        $res = RateContent($_POST['id'], $_POST['rating']);
        break;
    case 'getUserRating':
        $res = GetUserRating($_POST['id']);
        break;
    case 'unrate':
        $res = Unrate($_POST['id']);
        break;
}

// 4) вывод данных
echo json_encode($res);
