<?php declare(strict_types=1); namespace user;

use Exception;
use database\Query;

class User {

  private function __construct()
  {
  }

  // link stack overflow `https://stackoverflow.com/questions/2040240/php-function-to-generate-v4-uuid`
  public static function uuid():string {
      $uuid = array(
        'time_low'  => 0,
        'time_mid'  => 0,
        'time_hi'  => 0,
        'clock_seq_hi' => 0,
        'clock_seq_low' => 0,
        'node'   => array()
      );

      $uuid['time_low'] = mt_rand(0, 0xffff) + (mt_rand(0, 0xffff) << 16);
      $uuid['time_mid'] = mt_rand(0, 0xffff);
      $uuid['time_hi'] = (4 << 12) | (mt_rand(0, 0x1000));
      $uuid['clock_seq_hi'] = (1 << 7) | (mt_rand(0, 128));
      $uuid['clock_seq_low'] = mt_rand(0, 255);

      for ($i = 0; $i < 6; $i++) {
        $uuid['node'][$i] = mt_rand(0, 255);
      }

      $uuid = sprintf('%08x-%04x-%04x-%02x%02x-%02x%02x%02x%02x%02x%02x',
        $uuid['time_low'],
        $uuid['time_mid'],
        $uuid['time_hi'],
        $uuid['clock_seq_hi'],
        $uuid['clock_seq_low'],
        $uuid['node'][0],
        $uuid['node'][1],
        $uuid['node'][2],
        $uuid['node'][3],
        $uuid['node'][4],
        $uuid['node'][5]
      );

      return $uuid;
    }


  public static function addUser():void {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (empty($username) || empty($email) || empty($password))
      response(400);
    try{
      $user_id = self::uuid();
      $query = [
        "table" => "users",
        "set" => [
          "user_id" => $user_id,
          "username" => $username,
          "email" => $email,
          "password" => password_hash($password, null),
          /* "status" => "active", */
          "verify_token" => self::uuid()
        ]
      ];
      Query::insert($query);

      $query = [
        "table" => "settings",
        "set" => [ "user_id" => $user_id ]
      ];
      Query::insert($query);
    }catch(Exception $e)
    {
      if (str_starts_with($e->getMessage(), "SQLSTATE[23000]:"))
        response(409);
      else
        response(500);
    }
  }

  public static function login():void {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (empty($email) || empty($password))
      response(400);

    try{
      $query = [
        "table" => "users",
        "fields" => ["email", "password", "user_id", "status"],
        "where" => [ "email = :email" => ["email" => $email]]
      ];
      $res = array_first(Query::select($query)->get());
      echo "<pre>";
      echo password_hash($password, null);
      echo "\n";
      echo print_r($res);
      echo "</pre>";
      if (!password_verify($password, $res['password']))
        throw new Exception("Incorrect password.");
      if ($res['status'] != 'active')
        response(200, ["status" => "pending"]);

      $_SESSION['user_id'] = $res['user_id'];
      response(200, ["status" => "success"]);
    }catch(Exception $e)
    {
      if (str_starts_with($e->getMessage(), "Incorrect password."))
        response(403);
      else
        response(500, $e->getMessage());
    }
  }
}
