<?php declare(strict_types=1);

require_once __DIR__ . '/user/controller.php';

var_dump($_SERVER['REQUEST_METHOD']);
var_dump($_POST);

$userCtr = new UserController();

echo $userCtr->getUser();
