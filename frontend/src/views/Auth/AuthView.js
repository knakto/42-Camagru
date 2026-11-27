import AuthViewport from "./components/AuthViewport";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import services from "../../services/IndexServices";
import EmailVerificationRequired from "./components/EmailVerificationRequired";
import EmailVerificationExpired from "./components/EmailVerificationExpired";
import EmailVerified from "./components/EmailVerified";
import ForgotPasswordSuccess from "./components/ForgotPasswordSuccess";

export default class AuthView
{
  constructor()
  {
  }

  templateAuthView()
  {
    services.layout.setLayout('auth');
    document.querySelector("#content").innerHTML = AuthViewport();
  }

  login()
  {
    this.templateAuthView();
    document.querySelector("#authViewport").innerHTML = LoginForm();
  }

  signup()
  {
    this.templateAuthView();
    document.querySelector("#authViewport").innerHTML = SignupForm();
  }

  forgot()
  {
    this.templateAuthView();
    document.querySelector("#authViewport").innerHTML = ForgotPasswordForm();
  }

  verifyRequire()
  {
    this.templateAuthView();
    document.querySelector("#authViewport").innerHTML = EmailVerificationRequired();
  }

  verifyExpire()
  {
    this.templateAuthView();
    document.querySelector("#authViewport").innerHTML = EmailVerificationExpired();
  }

  verifySuccess()
  {
    this.templateAuthView();
    document.querySelector("#authViewport").innerHTML = EmailVerified();
  }

  forgotpasswordSuccess()
  {
    this.templateAuthView();
    document.querySelector("#authViewport").innerHTML = ForgotPasswordSuccess();
  }
}
