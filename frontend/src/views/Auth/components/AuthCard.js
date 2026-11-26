import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";
import ForgotPasswordForm from "./ForgotPasswordForm.js";

export default function AuthCard() {
  const track = document.createElement('div');
  track.className = "flex w-[300%] transition-transform duration-300 ease-in-out -translate-x-1/3";
  track.id = "track";
  
  track.innerHTML = `
          ${ForgotPasswordForm()}
          ${LoginForm()}
          ${SignupForm()} `;

  const login = track.querySelector("#login-form");
  const signup = track.querySelector("#signup-form");
  const forgot = track.querySelector("#forgot-password-form");

  [login, signup, forgot].forEach(form => {form.style.flex = "0 0 33.333333%";});
  return track.outerHTML;
}
