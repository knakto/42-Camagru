<?php declare(strict_types=1);

/*
 * ======= Database class ========
 * This is singleton design pattern
 *  - private __construct and __clone for only getInstance() can use it
 *  - static instances[] for store instance
 * Sercices databse
 *  -
 */

class Database {
  private function __clone():void { }
  public function __wakeup():void { throw new \Exception("Cannot unserialize a singleton."); }

  private static $instances = [];

  private function __construct() {
    $user = getenv("MYSQL_USER");
    $dbname = getenv("MYSQL_DATABASE");
    $password = getenv("MYSQL_PASSWORD");
    $host = "127.0.0.1";
    $charset = "utf8mb4";
    $dns = "mysql:dbname=$dbname;host=$host;charset=$charset";
    $options = [
      PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
      $pdo = new PDO($dns, $user, $password, $options);
    } catch (Exception $e){
      http_response_code(500);
      this->showError(e);
      exit(1);
    }
  }

  private function showError(Exception $e): void{
      echo "<pre>";
      echo json_encode([
        "status" => "error",
        "type" => get_class($e),
        "message" => $e->getMessage()
      ]);
      echo "</pre>";
  }

  static function getInstance (): Database {
    $cls = static::class;
    if (!isset(self::$instances[$cls])) {
      self::$instances[$cls] = new static();
    }

    return self::$instances[$cls];
  }

  //===================== Service =========================//

  private $pdo;
}
