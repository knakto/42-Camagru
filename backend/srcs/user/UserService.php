<?php declare(strict_types=1); namespace user;

use database\Query;
use Exception;

// link stack overflow `https://stackoverflow.com/questions/2040240/php-function-to-generate-v4-uuid`
function uuid():string {
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

function dbAddUser(string $username, string $email, string $password, $expire):void
{
  try{
    $user_id = uuid();
    $query = [
      "table" => "users",
      "set" => [
        "user_id" => $user_id,
        "username" => $username,
        "email" => $email,
        "password" => password_hash($password, null),
        "verify_token" => uuid(),
        "token_expired_at" => date('Y-m-d H:i:s', strtotime("+$expire minutes"))
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
    $mysqlErrorCode = $e->errorInfo[1] ?? null;
    $mysqlErrorMessage = $e->errorInfo[2] ?? '';

    if ($mysqlErrorCode === 1062)
    {
      $message = "";
      if (str_contains($mysqlErrorMessage, 'email')) {
        $message = "Email already exists";
      }
      if (str_contains($mysqlErrorMessage, 'username')) {
        $message = "Username already exists";
      }
      response(409, ["message" => $message]);
    }
    else
      response(500, ["message", $e->getMessage()]);
  }
}

//["email", "password", "user_id", "status", "token_expired_at"],
function dbFindUserByEmail(string $email, array $fields): array
{
  try{
    $query = [
      "table" => "users",
      "fields" => $fields,
      "where" => [ "email = :email" => ["email" => $email]]
    ];
    $res = Query::select($query)->get();
    if (!empty($res))
      $res = array_first($res);
    return $res;
  }catch(Exception $e) { response(500, $e->getMessage()); }
}

//["user_id", "token_expired_at"],
function dbFindUserByToken(string $token, array $fields, array $where = []): array
{
  if (empty($where) || !is_string(array_key_first($where)))
    $where = [ "verify_token = :token" => ["token" => $token]];
  else
    $where = [ "verify_token = :token and ".array_key_first($where) => ["token" => $token] + array_first($where)];
  try{
    $query = [
      "table" => "users",
      "fields" => $fields,
      "where" => $where
    ];
    $res = Query::select($query)->get();
    if (!empty($res))
      $res = array_first($res);
    return $res;
  }catch(Exception $e) { response(500, $e->getMessage()); }
}

function dbFindUserById(string $id, array $fields, array $where = [], array $join = []): array
{
  if (empty($where) || !is_string(array_key_first($where)))
    $where = [ "user_id = :id" => ["id" => $id]];
  else if (empty($join))
    $where = [ "user_id = :id and ".array_key_first($where) => ["id" => $id] + array_first($where)];
  try{
    $query = [
      "table" => "users",
      "fields" => $fields,
      "where" => $where
    ];
    if (!empty($join))
      $query['join'] = $join;

    $res = Query::select($query)->get();
    if (!empty($res))
      $res = array_first($res);
    return $res;
  }catch(Exception $e) { response(500, $e->getMessage()); }
}

function dbFindUserByName(string $name, array $fields, array $where = [], array $join = []): array
{
  if (empty($where) || !is_string(array_key_first($where)))
    $where = [ "username = :name" => ["name" => $name]];
  else
    $where = [ "username = :name and ".array_key_first($where) => ["name" => $name] + array_first($where)];
  try{
    $query = [
      "table" => "users",
      "fields" => $fields,
      "where" => $where
    ];
    if (!empty($join))
      $query['join'] = $join;

    $res = Query::select($query)->get();
    if (!empty($res))
      $res = array_first($res);
    return $res;
  }catch(Exception $e) { response(500, $e->getMessage()); }
}

function dbUpdateUser(string $user_id, array $set):void
{
  try{
    $query = [
      "table" => "users",
      "set" => $set,
      "where" => [ "user_id = :id" => ["id" => $user_id]]
    ];
    Query::update($query)->get();
  }catch(Exception $e) { response(500, $e->getMessage()); }
}
