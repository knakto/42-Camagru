<?php 
require_once __DIR__ . '/../srcs/autoload.php';

use route\Route;

/* switch ($url) */
/* { */
/* case "/register": */
/*   User::addUser(); */
/*   break; */
/* case "/login": */
/*   User::login(); */
/*   break; */
/* case "/logout": */
/*   authCheck(); */
/*   User::logout(); */
/*   break; */
/* case "/verify": */
/*   User::verify(); */
/*   break; */
/* case "/reset-token": */
/*   User::resetVerifyToken(); */
/*   break; */
/* default: */
/*   response(404); */
/* } */

Route::startRoute();
