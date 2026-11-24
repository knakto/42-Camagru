<?php declare(strict_types=1); namespace user;

use Exception;
require_once __DIR__ . "/UserService.php";
define("EXPIRE_TIME", "3");

class User {

  private function __construct()
  {
  }

  /**
   * @param $_POST['username']
   * @param $_POST['email']
   * @param $_POST['password']
   */
  public static function register():void {
    if (!isset($_POST['username']) || !isset($_POST['email']) || !isset($_POST['password']))
      response(400);

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    dbAddUser($username, $email, $password, EXPIRE_TIME);
    response(201);
  }

  /**
   * @param $_POST['email']
   * @param $_POST['password']
   */
  public static function login():void {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!isset($email) || !isset($password))
      response(400);

    $res = dbFindUserByEmail($email, ["password", "user_id", "status"]);
    if (!isset($res['password']))
      response(200, ["status" => "failed"]);
    if (!password_verify($password, $res['password']))
      response(200, ["status" => "failed"]);
    if ($res['status'] != 'active')
      response(200, ["status" => "pending"]);

    $_SESSION['user_id'] = $res['user_id'];
    session_write_close();
    response(200, ["status" => "success"]);
  }

  /**
   * @param $_GET['verify_token']
   */
  public static function verify():void {
    $token = $_GET['verify_token'] ?? "";
    $current_time = date('Y-m-d H:i:s');

    $res = dbFindUserByToken($token , ["user_id", "status"],
      ["token_expired_at > :datetime" => ["datetime" => $current_time]]);
    if (empty($res))
      response(200, ["status" => "failed", "message" => "Token expired."]);
    dbUpdateUser($res['user_id'], ["status" => "active"]);
    response(200, ["status" => "succeed"]);
  }

  /**
   * @param $_POST['email']
   * @param $_POST['password']
   */
  public static function resetVerifyToken():void {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!isset($email) || !isset($password))
      response(400);

    $res = dbFindUserByEmail($email, ["password", "user_id"]);
    if (!isset($res['password']))
      response(200, ["status" => "failed"]);
    if (!password_verify($password, $res['password']))
      response(200, ["status" => "failed", "password" => $password, "email" => $email, "res" => $res]);

    $expired_time = date('Y-m-d H:i:s', strtotime("+".EXPIRE_TIME." minutes"));
    dbUpdateUser($res['user_id'], ["verify_token" => uuid(), "token_expired_at" => $expired_time]);
    response(200, ["status" => "success"]);
  }

  /**
   * @param $_SESSION['user_id']
   */
  public static function logout(): void {
    session_destroy();
    response(200, ["status" => "success"]);
  }

  public static function getSelf():void
  {
    $fields = ["users.username", "users.email", "settings.notification_email"];
    $where = ["users.user_id = settings.user_id and users.status = :status" => ["status" => "active"]];
    $join = ["settings" => "settings.user_id = users.user_id"];
    $user_id = $_SESSION['user_id'] ?? "";
    $res = dbFindUserById($user_id, $fields, $where, $join);
    if (empty($res))
      response(404);
    response(200, ["status" => "success", "data" => $res]);
  }

  public static function getUser(string $username = ""):void
  {
    if (empty($username))
      response(400);
    $fields = ["username"];
    $where = ["status = :status" => ["status" => 'active']];
    $res = dbFindUserByName($username, $fields, $where);
    if (empty($res))
      response(404);
    response(200, ["status" => "success", "data" => $res]);
  }
}
