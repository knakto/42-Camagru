<?php 
require_once __DIR__ . '/../srcs/autoload.php';

use database\Query;


echo "<pre>";
echo password_hash("password123", PASSWORD_DEFAULT);
/* $queryparam = [ */
/*   "table" => ["users" => "u"], */
/*   "join" => ["settings" => "users.user_id = settings.user_id"], */
/*   "fields" => ["username" => "us", "email" => "eml"], */
/*   "where" => ["user_id = :id" => ["id" => 1]] */
/* ]; */
/**/
/* print_r($queryparam); */
/* Query::select($queryparam); */
/* echo "\n----------------------------------------------------------\n"; */
/**/
/* $queryparam = [ */
/*   "table" => "users",  */
/*   "set" => ["user_id" => 12, "username" => "kita"] */
/* ]; */
/* Query::insert($queryparam); */
/* echo "\n----------------------------------------------------------\n"; */
/**/
/* $queryparam = [ */
/*   "table" => "users",  */
/*   "set" => ["user_id" => 12, "username" => "kita"], */
/*   "where" => ["user_id = :id" => ["id" => 11]] */
/* ]; */
/* Query::update($queryparam); */

/* $query = [ */
/*   "table" => "users", */
/*   "set" => ["username" => "kita", "email" => "testmail"] */
/* ]; */
/**/
/* Query::insert($query); */

/* $query = [ */
/*   "table" => "users", */
/*   "set" => ["username" => "helllo waolrd", "email" => "somemail"], */
/*   "where" => "user_id = 10" */
/* ]; */
/**/
/* Query::update($query); */

/* $query = [ */
/*   "table" => "users", */
/*   "fields" => ["username", "email", "user_id"], */
/*   "where" => ["1" => []] */
/* ]; */
/**/
/* Query::select($query); */


echo "</pre>";
