import LoginController from "./LoginController"
import SignupController from "./SignupController"
import EmailVeriftController from "./EmailVerifyController"
import ForgotController from "./ForgotController";
import { Error404 } from "./ErrorController";
import HomeController from "./HomeController";

class IndexControllers
{
  constructor()
  {
    this.login = new LoginController();
    this.signup = new SignupController();
    this.email = new EmailVeriftController();
    this.forgot = new ForgotController();

    this.home = new HomeController();

    this.error404 = new Error404();
  }
}

const controllers = new IndexControllers();

export default controllers;
