<?php declare(strict_types=1); namespace email;

/*
 * Email builder function start with Email::from() end with .send();
 */
class Email
{
  private $sender;
  private $receiver;
  private $subjects;
  private $html;
  private $result;
  private $error;

  private function __construct(string $sender)
  {
    $this->sender = $sender;
    $this->receiver = "";
    $this->subjects = "";
    $this->html = "";
    $this->result = "";
    $this->error = "";
  }

  public static function from(string $sender):Email
  {
    return new Email($sender);
  }

  public function to(string $receiver):Email
  {
    $this->receiver = $receiver;
    return $this;
  }

  public function subject(string $header):Email
  {
    $this->subjects = $header;
    return $this;
  }

  public function body(string $html):Email
  {
    $this->html = $html;
    return $this;
  }

  public function send():Email
  {
    $apiKey = getenv('RESEND_API_KEY') ?: 're_mock';
    $baseUrl = getenv('RESEND_BASE_URL') ?: 'https://api.resend.com';

    $payload = [
        "from" => $this->sender,
        "to" => [$this->receiver],
        "subject" => $this->subjects,
        "html" => $this->html
    ];

    $curl = curl_init("$baseUrl/emails");

    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer $apiKey",
            "Content-Type: application/json",
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 15,
    ]);

    $response = curl_exec($curl);
    $statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ($response === false) {
        $this->error = curl_error($curl);
        return $this;
    }

    $this->result = json_decode($response, true);

    if ($statusCode < 200 || $statusCode >= 300)
    {
      $this->error = $this->result['message'] ?? "Resend API error: $statusCode";
      return $this;
    }
    return $this;
  }
}
