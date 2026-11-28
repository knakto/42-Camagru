<?php declare(strict_types=1); namespace user;

use email\SendMail;
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
      response(400, ["status" => "failed", "error" => "Bad request"]);

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $token = uuid();
    dbAddUser($username, $email, $password, $token, EXPIRE_TIME);
    $mail = new SendMail();
    $mail->sendingVerification($email, $token);
    response(201, ["status" => "created", "message" => "Create user success"]);
  }

  /**
   * @param $_POST['email']
   * @param $_POST['password']
   */
  public static function login():void {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!isset($email) || !isset($password))
      response(400, ["status" => "failed", "error" => "Bad request"]);

    $res = dbFindUserByEmail($email, ["password", "user_id", "status"]);
    if (!isset($res['password']))
      response(401, ["message" => "Wrong email or password"]);
    if (!password_verify($password, $res['password']))
      response(401, ["message" => "Wrong email or password"]);
    if ($res['status'] != 'active')
    {
      $_SESSION['email'] = $email;
      $_SESSION['password'] = $password;
      session_write_close();
      response(200, ["message" => "Login succeed but accout status pending", "status" => "pending"]);
    }

    $_SESSION['email'] = $email;
    $_SESSION['password'] = $password;
    $_SESSION['user_id'] = $res['user_id'];
    session_write_close();
    response(200, ["message" => "Login success", "status" => "success"]);
  }

  /**
   * @param $_GET['verify_token']
   */
  public static function verify():void {
    $token = $_GET['verify_token'] ?? "";
    $current_time = date('Y-m-d H:i:s');

    $res = dbFindUserByToken($token, "verify", ["user_id", "status"],
      ["verify_expired_at > :datetime" => ["datetime" => $current_time]]);
    if (empty($res))
    {
      $res = dbFindUserByToken($token, "verify", ["user_id", "status"]);
      if (!empty($res))
      {
        if ($res['status'] == "active")
          response(200, ["status" => "succeed", "message" => "Already verify"]);
      }
      response(401, ["status" => "failed", "message" => "Token expired"]);
    }
    dbUpdateUser($res['user_id'], ["status" => "active"]);
    response(200, ["status" => "succeed", "message" => "Verify success"]);
  }

  /**
   * @param $_POST['email']
   * @param $_POST['password']
   */
  public static function resetVerifyToken():void {
    $email = $_SESSION["email"];
    $password = $_SESSION["password"];

    if (!isset($email) || !isset($password))
      response(400, ["status" => "failed", "error" => "Bad request"]);

    $res = dbFindUserByEmail($email, ["password", "user_id"]);
    if (!isset($res['password']))
      response(200, ["status" => "failed"]);
    if (!password_verify($password, $res['password']))
      response(200, ["status" => "failed", "password" => $password, "email" => $email, "res" => $res]);

    $token = uuid();
    $expired_time = date('Y-m-d H:i:s', strtotime("+".EXPIRE_TIME." minutes"));
    dbUpdateUser($res['user_id'], ["verify_token" => $token, "token_expired_at" => $expired_time]);
    $mail = new SendMail();
    $mail->sendingVerification($email, $token);
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
      response(404, ["status" => "failed", "message" => "Not found"]);
    response(200, ["status" => "success", "data" => $res]);
  }

  public static function getUser(string $username = ""):void
  {
    if (empty($username))
      response(400, ["status" => "failed", "error" => "Bad request"]);
    $fields = ["username"];
    $where = ["status = :status" => ["status" => 'active']];
    $res = dbFindUserByName($username, $fields, $where);
    if (empty($res))
      response(400, ["status" => "failed", "error" => "Bad request"]);
    response(200, ["status" => "success", "data" => $res]);
  }

  public static function resetRequest():void
  {
    if (!isset($_POST['email']))
      response(400, ["status" => "failed", "error" => "Bad request"]);

    $email = $_POST["email"];
    $res = dbFindUserByEmail($email, ["user_id"]);
    if (empty($res))
      response(404, ["status" => "failed", "message" => "Not found"]);

    $token = uuid();
    $expired_time = date('Y-m-d H:i:s', strtotime("+".EXPIRE_TIME." minutes"));
    $res = dbUpdateUser($res['user_id'], ["reset_token" => $token, "reset_expired_at" => $expired_time]);
    $mail = new SendMail();
    $mail->sendingResetPassword($email, $token);
    response(200, ["status" => "success", "message" => "Sending request password token"]);
  }

  public static function resetPassword():void
  {
    if (!isset($_POST['reset_token']) || !isset($_POST['new_password']))
      response(400, ["status" => "failed", "error" => "Bad request"]);

    $token = $_POST['reset_token'];
    $password = $_POST['new_password'];
    $current_time = date('Y-m-d H:i:s');

    $res = dbFindUserByToken($token, "reset", ["user_id"],
      ["reset_expired_at > :datetime" => ["datetime" => $current_time]]);
    if (empty($res))
    {
      $check = dbFindUserByToken($token, "reset", ["user_id"]);
      if (empty($check))
        response(404, ["status" => "failed", "message" => "User not found"]);
      response(401, ["status" => "failed", "message" => "Token expired"]);
    }


    dbUpdateUser($res['user_id'], ["password" => password_hash($password, PASSWORD_DEFAULT), "reset_token" => uuid()]);
    response(200, ["status" => "success", "message" => "Reset password success"]);
  }

  public static function resetExpireCheck():void
  {
    if (!isset($_POST['reset_token']))
      response(400, ["status" => "failed", "error" => "Bad request"]);

    $token = $_POST['reset_token'];
    $current_time = date('Y-m-d H:i:s');

    $res = dbFindUserByToken($token, "reset", ["user_id"],
      ["reset_expired_at > :datetime" => ["datetime" => $current_time]]);
    if (empty($res))
    {
      $check = dbFindUserByToken($token, "reset", ["user_id"]);
      if (empty($check))
        response(404, ["status" => "failed", "message" => "User not found"]);
      response(401, ["status" => "failed", "message" => "Token expired"]);
    }
    response(200, ["status" => "success", "message" => "Token still usable"]);
  }
}
