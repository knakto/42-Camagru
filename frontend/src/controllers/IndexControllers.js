import LoginController from "./LoginController"
import SignupController from "./SignupController"
import EmailVeriftController from "./EmailVerifyController"
import ForgotController from "./ForgotController";

class IndexControllers
{
  constructor()
  {
    this.login = new LoginController();
    this.signup = new SignupController();
    this.email = new EmailVeriftController();
    this.forgot = new ForgotController();
  }
}

const controllers = new IndexControllers();

export default controllers;
