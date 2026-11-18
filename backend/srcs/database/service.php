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
    $host = getenv("SERVER_HOST");
    $charset = "utf8mb4";
    $dns = "mysql:dbname=$dbname;host=$host;charset=$charset";
    $options = [
      PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
      $this->pdo = new PDO($dns, $user, $password, $options);
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

  /**
    * Fetch records from the database.
    *
    * @param string $query SQL query
    * @param array $var Query parameters
    * @return array
   */
  public function fetch(string $query, array $var = []):array|false {
    $stmt = $this->pdo->prepare($query . ";");
    $stmt->execute($var);
    $res = $stmt->fetch();
    return $res;
  }

  /**
    * Fetch all records from the database.
    *
    * @param string $query SQL query
    * @param array $var Query parameters
    * @return array
   */
  public function fetchAll(string $query, array $var = []):array|false {
    $stmt = $this->pdo->prepare($query . ";");
    $stmt->execute($var);
    $res = $stmt->fetchAll();
    return $res;
  }

  /**
   * Execute query
   *
   * @param string $query SQL query
   * @param array $var Query parameters
   */
  public function execute(string $query, array $var):void {
    $stmt = $this->pdo->prepare($query . ";");
    $stmt->execute($var);
  }
}
