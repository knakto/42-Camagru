import layouts from "../../controllers/LayoutsService.js";
import AuthViewport from "./components/AuthViewport.js";
import AuthCard from "./components/AuthCard.js";
import ResetPasswordForm from "./components/ResetPasswordForm.js";
import EmailVerified from "./components/EmailVerified.js";
import EmailVerificationExpired from "./components/EmailVerificationExpired.js";

export default async function AuthPage() {
  layouts.setLayout('auth');
  document.querySelector("#content").innerHTML = AuthViewport();

  const params = new URLSearchParams(window.location.search);
  const reset_token = params.get("reset_token");
  const verified = params.get("verified");
  if (reset_token !== null)
    document.querySelector("#authViewport").innerHTML = ResetPasswordForm();
  else if (verified === "true")
    document.querySelector("#authViewport").innerHTML = EmailVerified();
  else if (verified === "false")
    document.querySelector("#authViewport").innerHTML = EmailVerificationExpired();
  else
    document.querySelector("#authViewport").innerHTML = AuthCard();
}
