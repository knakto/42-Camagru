<?php declare(strict_types=1); namespace route;

use user\User;

class Route {
  private       $prefixUrl;
  private       $routeUrl;
  private       $inputUrl;
  private       $requestMethod;

  // array query and data input
  private       $get;
  private       $post; 

  public const GET    = "GET";
  public const POST   = "POST";
  public const PUT    = "PUT";
  public const DELETE = "DELETE";

  /**
   * Define route
   * @property "path" => [method, requred_auth, class_callback, function_callback],
   */
  public const routePath = [
    "/health"       => [self::GET , false, Route::class, "health"],
    "/register"     => [self::POST, false, User::class , "register"],
    "/login"        => [self::POST, false, User::class , "login"],
    "/logout"       => [self::POST, true , User::class , "logout"],
    "/verify-token" => [self::GET , false, User::class , "verify"],
    "/reset-token"  => [self::POST, false, User::class , "resetVerifyToken"],
    "/user"         => [self::GET , false, User::class , "getSelf"],
    "/user/{name}"  => [self::GET , false, User::class , "getUser"],
  ];

  private function getPrefixUrl(): string
  {
    if (!isset($_SERVER['SCRIPT_NAME']))
      response(400);
    $prefix = dirname($_SERVER['SCRIPT_NAME']);
    return $prefix;
  }

  private function substrPrefix(): string
  {
    if (!isset($_SERVER['DOCUMENT_URI']))
      response(400);

    $url = $_SERVER['DOCUMENT_URI'];
    if (str_starts_with($url, $this->prefixUrl))
      $url = substr($url, strlen($this->prefixUrl));
    else 
      response(400, ["message" => "Wrong prefix path"]);
    return $url;
  }

  private function getMethod(): string
  {
    if (!isset($_SERVER['REQUEST_METHOD']))
      response(400);
    $method = $_SERVER['REQUEST_METHOD'];
    return $method;
  }

  private function __construct()
  {
    session_start();

    $this->prefixUrl = $this->getPrefixUrl();
    $this->inputUrl = $this->substrPrefix();
    $this->requestMethod = $this->getMethod();
    $this->post = $_POST;
    $this->get = $_GET;

    if (isset($_GET['DEBUG']) || isset($_POST['DEBUG']))
    {
      print_r($_SERVER);
      print_r($_POST);
      echo "Prefix: ", $this->prefixUrl, "\n";
      echo "Input: ", $this->inputUrl, "\n";
      print_r($this->post);
      print_r($this->get);
      print_r($_SESSION);
    }
  }

  private static function health():void 
  {
    response(200, ["status" => "healthy"]);
  }

  public static function startRoute():void
  {
    $instance = new Route();
    $route = $instance->parseRoute();
    if (isset($route['param']))
      $route['callback']($route['param']);
    else
      $route['callback']();
  }

  private function authCheck():void {
    if (!isset($_SESSION['user_id']))
      response(401);
  }

  /**
   * @return array ["callback" => callback_function, optional "param" => "param"]
   */
  private function parseRoute():array
  {
    // find /path/{something}
    $regexFindParam = "/\{[^{}]+\}$/";
    // startwith /... and end with /something
    $regexCheckValidUrlWithParam = "#^/.+[^/]$#";
    // param will be 0-9 a-z A-Z and - or _ only
    $regexCheckValidParam = "#^[a-zA-Z0-9_-]+$#";

    foreach(self::routePath as $route => $prop)
    {
      if ($route == $this->inputUrl && $this->requestMethod == $prop[0])
      {
        if ($prop[1] == true)
          $this->authCheck();
        return ["callback" => $prop[2]."::".$prop[3]];
      }
      else if (preg_match($regexFindParam, $route))
      {
        $pureRoute = dirname($route);
        $pureUrl   = dirname($this->inputUrl);
        if ($pureRoute == $pureUrl && $this->requestMethod == $prop[0]
          && preg_match($regexCheckValidUrlWithParam, $this->inputUrl)
          && preg_match($regexCheckValidParam, basename($this->inputUrl))
        )
        {
          $param = basename($this->inputUrl);
          if ($prop[1] == true)
            $this->authCheck();
          return ["callback" => $prop[2]."::".$prop[3], "param" => $param];
        }
      }
    }
    response(404);
  }
}
