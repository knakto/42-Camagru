import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";
import ForgotPasswordForm from "./ForgotPasswordForm.js";
import ResetPasswordForm from "./ResetPasswordForm.js";
import EmailVerificationExpired from "./EmailVerificationExpired.js";
import EmailVerificationRequired from "./EmailVerificationRequired.js";
import EmailVerified from "./EmailVerified.js";

export default function AuthCard() {
  const track = document.createElement('div');
  track.className = "flex w-[700%] -translate-x-1/7";
  track.id = "track";
  
  track.innerHTML = `
          ${ForgotPasswordForm()}
          ${LoginForm()}
          ${SignupForm()} 
          ${ResetPasswordForm()}
          ${EmailVerificationExpired()}
          ${EmailVerificationRequired()}
          ${EmailVerified()}
  `;

  const login = track.querySelector("#login-form");
  const signup = track.querySelector("#signup-form");
  const forgot = track.querySelector("#forgot-password-form");
  const reset = track.querySelector("#reset-password-form");
  const emailExpired = track.querySelector("#email-expired");
  const emailRequired = track.querySelector("#email-required");
  const emailVerified = track.querySelector("#email-verified");

  [login, signup, forgot, reset, emailExpired, emailRequired, emailVerified].forEach(form => {form.style.flex = "0 0 14.285714%";});
  return track.outerHTML;
}
