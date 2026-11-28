<?php declare(strict_types=1); namespace email;

Use email\Email;

class SendMail
{
  private $sender;
  private $verifyUrl;

  function __construct()
  {
    $this->sender = "camagru.net";
    $this->verifyUrl = getenv("SERVER_URL").":".getenv("SERVER_PORT");
  }

  function sendingVerification(string $receiver, string $token):void
  {
    $verifyUrl = "$this->verifyUrl/verify?verify-token=$token";
    Email::from($this->sender)
      ->to($receiver)
      ->subject("Verify your Camagru email address")
      ->body("
        <div style='font-family: Arial, sans-serif; max-width: 500px; margin: auto;'>
            <h2>Welcome to Camagru!</h2>

            <p>
                Thank you for registering.
                Please verify your email address to activate your account.
            </p>

            <a href='$verifyUrl'
               style='display: inline-block; padding: 12px 24px;
                      background: #2563eb; color: white;
                      text-decoration: none; border-radius: 6px;'>
                Verify Email
            </a>

            <p style='margin-top: 24px; color: #666; font-size: 13px;'>
                This link will expire in 3 minutes.
            </p>

            <p style='color: #999; font-size: 12px;'>
                If you did not create an account, you can ignore this email.
            </p>
        </div>
        ")->send();
  }

  function sendingResetPassword(string $receiver, string $token):void
  {
    $resetUrl = "$this->verifyUrl/forgot?reset-token=$token";

    Email::from($this->sender)
      ->to($receiver)
      ->subject("Reset your Camagru password")
      ->body("
        <div style='font-family: Arial, sans-serif; max-width: 500px; margin: auto;'>
            <h2>Password Reset Request</h2>

            <p>
                We received a request to reset your Camagru account password.
                Click the button below to create a new password.
            </p>

            <a href='$resetUrl'
               style='display: inline-block; padding: 12px 24px;
                      background: #2563eb; color: white;
                      text-decoration: none; border-radius: 6px;'>
                Reset Password
            </a>

            <p style='margin-top: 24px; color: #666; font-size: 13px;'>
                This link will expire in 3 minutes.
            </p>

            <p style='color: #999; font-size: 12px;'>
                If you did not request a password reset, you can safely ignore this email.
                Your password will remain unchanged.
            </p>
        </div>
        ")->send();
  }
}
