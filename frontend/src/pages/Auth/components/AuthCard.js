import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";
import ForgotPasswordForm from "./ForgotPasswordForm.js";

export default function AuthCard() {
  const track = document.createElement('div');
  track.className = "flex w-[300%] transition-transform duration-300 ease-in-out -translate-x-1/3";
  track.id = "track";

  const login = LoginForm();
  const signup = SignupForm();
  const forgot = ForgotPasswordForm();

  [login, signup, forgot].forEach(form => {form.style.flex = "0 0 33.333333%";});
  track.append(forgot, login, signup);
  return track;
}
