<?php declare(strict_types=1);

require_once __DIR__ . '/model.php';

class UserController{
  private $user;

  function __construct()
  {
    $this->user = new User();
  }

  function getUser(): string {
    return (string)$this->user->getUsername();
  }
}
