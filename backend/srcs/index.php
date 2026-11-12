<?php declare(strict_types=1);

require_once __DIR__ . '/user/controller.php';

echo "<pre>";
print_r($_SERVER);
print_r($_POST);
print_r($_GET);
echo "</pre>";

$userCtr = new UserController();

echo $userCtr->getUser();
