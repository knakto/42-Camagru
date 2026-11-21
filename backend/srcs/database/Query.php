<? declare(strict_types=1); namespace database;

use Exception;
use database\Database;
use PDO;
use function pcov\waiting;


class Query {

  private PDO     $pdo;
  private string  $statement;
  private array   $paramiters;
  private         $result;

  private const SELECT = "SELECT";
  private const INSERT = "INSERT";
  private const UPDATE = "UPDATE";
  private const DELETE = "DELETE";

  private const DESC  = "DESC";
  private const ASC   = "ASC";

  /**
   * @param string $type
   * @param array $query
   */
  private function __construct(string $type, array $query)
  {
    $this->pdo = Database::getInstance()->getPDO();
    $this->statement = "";
    $this->paramiters = [];
    $this->parseQuery($query, $type);
    $stmt = $this->pdo->prepare($this->statement);
    if (!empty($this->paramiters))
      $stmt->execute($this->paramiters);
    else
      $stmt->execute();
    $this->result = $stmt->fetchAll();
    echo $this->statement."\n";
    print_r($this->result);
  }

  /**
   *  @param array $query
   */
  private function parseSelect(array $query): string
  {
    $table = "";
    $fields = "";
    $join = "";
    $where = "";

    if (!(isset($query["table"]) 
      && isset($query["fields"])
      && isset($query["where"])))
      throw new Exception("Wrong select query.");
    if (is_array($query["table"]) && count($query["table"]) != 1)
      throw new Exception("Select only one table, Try use join.");

    if (is_string($query["table"]))
      $table = "`$query[table]`";
    else{
      foreach ($query["table"] as $key => $value){
        if (is_string($key))
          $table = "`$key` AS `$value`";
        else
          $table = "`$value`";
      }
    }

    if (is_string($query["fields"]))
      $fields = "$query[fields]";
    else
    {
      if (!is_array($query["fields"]))
        throw new Exception("Select use array to set fields.");

      $last_field = array_key_last($query["fields"]);
      foreach ($query["fields"] as $key => $value){
        if (is_string($key))
          $fields = $fields."$key AS `$value`";
        else
          $fields = $fields."$value";
        if ($last_field != $key)
          $fields = $fields.", ";
      }
    }

    if (!isset($query["where"]))
      throw new Exception("Select must have where for good practice.");
    if (is_string($query["where"]))
      $where = $query["where"];
    else{
      $where = array_key_first($query["where"]);
      $this->paramiters = array_first($query["where"]);
    }

    if (isset($query["join"]))
    {
      if (count($query["join"]) != 1)
        throw new Exception("Select only one table, Try use join.");
      if (!is_string(array_key_first($query["join"])))
        throw new Exception("Select join table must have tablename and condition.");

      $join = "JOIN `".array_key_first($query["join"])."` ON ".array_first($query["join"]);
    }

    /* echo "$table\n"; */
    /* echo "$fields\n"; */
    /* echo "$join\n"; */
    /* echo "$where\n"; */
    return self::SELECT." $fields FROM $table $join WHERE $where;";
  }

  /**
   *  @param array $query
   */
  private function parseInsert(array $query): string
  {
    $table = "";
    $fields = "";
    $values = "";

    if (!(isset($query["table"]) && isset($query["set"])))
      throw new Exception("Invalid INSERT query.");

    if (is_string($query["table"]))
      $table = "$query[table]";
    else if (is_array($query["table"]) && count($query["table"]) == 1)
      $table = "$query[table]";
    else
      throw new Exception("Wrong insert table type.");

    $last_set = array_key_last($query["set"]);
    foreach($query["set"] as $key => $value)
    {
      if (!is_string($key))
        throw new Exception("Insert must use string to set fields.");
      $fields = "$fields `$key`";
      if (!is_string($value))
        $values = "$values $value";
      else
        $values = "$values '$value'";
      if ($key != $last_set)
      {
        $fields = "$fields, ";
        $values = "$values, ";
      }
    }

    /* echo "$fields\n"; */
    /* echo "$values\n"; */
    /* echo "$table\n"; */
    return self::INSERT." INTO `$table`($fields) VALUES($values);";
  }

  /**
   *  @param array $query
   */
  private function parseUpdate(array $query): string
  {
    $table = "";
    $where = "";
    $set = "";

    if (!(isset($query["table"]) && isset($query["set"]) && isset($query["where"])))
      throw new Exception("Invalid update query.");

    if (is_string($query["table"]))
      $table = "$query[table]";
    else if (is_array($query["table"]) && count($query["table"]) == 1)
      $table = "$query[table]";
    else
      throw new Exception("Wrong update table type.");

    if (!isset($query["where"]))
      throw new Exception("Update must have where for good practice.");
    if (is_string($query["where"]))
      $where = $query["where"];
    else{
      $where = array_key_first($query["where"]);
      $this->paramiters = array_first($query["where"]);
    }

    $last_set = array_key_last($query["set"]);
    foreach($query["set"] as $key => $value)
    {
      if (!is_string($key))
        throw new Exception("Insert must use string to set fields.");
      if (!is_string($value))
        $set = "$set `$key` = $value";
      else
        $set = "$set `$key` = '$value'";
      if ($key != $last_set)
        $set = "$set, ";
    }
    /* echo "$table\n"; */
    /* echo "$where\n"; */
    /* echo "$set\n"; */
    /* print_r($this->paramiters); */
    return self::UPDATE." `$table` SET $set WHERE $where;";
  }


  /**
   *  @param array $query
   */
  private function parseDelete(array $query): string
  {
    $table = "";
    $where = "";

    if (!(isset($query["table"]) && isset($query["where"])))
      throw new Exception("Invalid delete query.");

    if (is_string($query["table"]))
      $table = "$query[table]";
    else if (is_array($query["table"]) && count($query["table"]) == 1)
      $table = "$query[table]";
    else
      throw new Exception("Wrong delete table type.");

    if (!isset($query["where"]))
      throw new Exception("Delete must have where for good practice.");
    if (is_string($query["where"]))
      $where = $query["where"];
    else{
      $where = array_key_first($query["where"]);
      $this->paramiters = array_first($query["where"]);
    }

    /* echo "$table\n"; */
    /* echo "$where\n"; */
    /* print_r($this->paramiters); */
    return self::DELETE." FROM `$table` WHERE $where;";
  }

  /**
   *  @param array $query
   *  @param string $type
   */
  private function parseQuery(array $query, string $type):void
  {
    $res = "";
    switch ($type)
    {
    case self::SELECT:
      $res = $this->parseSelect($query);
      break ;
    case self::INSERT:
      $res = $this->parseInsert($query);
      break ;
    case self::UPDATE:
      $res = $this->parseUpdate($query);
      break ;
    case self::DELETE:
      $res = $this->parseDelete($query);
      break ;
    default:
      throw new Exception("worng method.");
    }
    $this->statement = $res;
  }

  /**
   *  @param array $query
   *  @param `[`
   *  @param `* "table" => ["users" => "alias"] | "users",`
   *  @param `* "fields" => ["username" => "alias"] | "username",`
   *  @param `* "where" => ["condition" => ["param1" => value, ...]],`
   *  @param `  "join" => ["settings" => "users.user_id = settings.user_id"],`
   *  @param `  "order" => "new | old"`
   *  @param `]`
   */
  public static function select(array $query):Query{
    return new Query(self::SELECT, $query);
  }

  /**
   *  @param array $query
   *  @param `[`
   *  @param `* "table" => ["users"] | "users",`
   *  @param `* "set" => ["field" => "value"]`
   *  @param `]`
   */
  public static function insert(array $query):Query{
    return new Query(self::INSERT, $query);
  }

  /**
   *  @param array $query
   *  @param `[`
   *  @param `* "table" => ["users"] | "users",`
   *  @param `* "set" => ["field" => "value"]`
   *  @param `* "where" => ["user_id = :id" => ["id" => 12]]`
   *  @param `]`
   */
  public static function update(array $query):Query{
    return new Query(self::UPDATE, $query);
  }

  /**
   *  @param array $query
   *  @param `[`
   *  @param `* "table" => ["users"] | "users",`
   *  @param `* "where" => ["user_id = :id" => ["id" => 12]]`
   *  @param `]`
   */
  public static function delete(array $query):Query{
    return new Query(self::DELETE, $query);
  }
}
