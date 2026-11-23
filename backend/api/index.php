<?php 
require_once __DIR__ . '/../srcs/autoload.php';

use database\Query;
use user\User;

session_start();

/* echo "<pre>"; */
/* echo print_r($_SERVER); */
/* echo print_r($_POST); */
/* echo "<pre>"; */

function checkPermission():void
{
  if (!isset($_SESSION['user_id']))
    response(403, ["status" => 403, "message" => "User not login."]);
}

$url = $_SERVER['REQUEST_URI'];
$prefix = dirname($_SERVER['SCRIPT_NAME']);

if (str_starts_with($url, $prefix))
  $url = substr($url, strlen($prefix));
else 
  response(403);


switch ($url)
{
case "/user":
  checkPermission();
  break;
case "/register":
  User::addUser();
  break;
case "/login":
  User::login();
  break;
default:
  response(403);
}

/* echo "<pre>"; */
/* echo "$url\n"; */
/* print_r($_SERVER); */
/**/
/* echo "</pre>"; */
