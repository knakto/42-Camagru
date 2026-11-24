<?php

function response(int $code, mixed $response = ""):void {
  http_response_code($code);
  if (!empty($response))
    echo json_encode($response);
  session_write_close();
  exit;
}

\spl_autoload_register(function (string $className) {
	$file = __DIR__ . '\\' . $className . '.php';
	$file = \str_replace('\\', DIRECTORY_SEPARATOR, $file);
	if (\file_exists($file)) {
		require $file;
	}
});
