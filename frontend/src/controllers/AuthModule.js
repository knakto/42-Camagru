//#####################################################
// AuthModule(Controller)
//=====================================================
// showPage():  entrypoint of page, show Html Css and
//              call handle binding eventHandler
// handleBasicEvent():  binding switchAuth handler,
//                      verification when have query,
//                      resend verification token
// handleLoginForm(): handle all event of Login Form
//
//#####################################################

import {AuthModel, LoginModel, SignupModel, EmailVerification} from "../modeles/AuthModel.js";
import AuthPage from "../views/Auth/AuthPage.js";
import router from "./RouterService.js";

export default class AuthModule
{
  constructor() {
    this.models = {
      auth: new AuthModel(),
      login: new LoginModel(),
      signup: new SignupModel(),
      email: new EmailVerification(),
    }
  }

  async showPage()
  {
    await AuthPage();
    await this.handleBasicEvent();
    await this.handleLoginForm();
    await this.handleSignupForm();
    await this.handleForgotForm();
  }

  async handleBasicEvent()
  {
    const authModel = this.models.auth;
    await authModel.switchAuthForm();
    await this.handleVerifyEmail();
    await this.handleResendVerification();
  }

  async handleLoginForm()
  {
    const loginModel = this.models.login;
    await this.handleLoginSubmit();
    loginModel.handleTogglePassword();
  }

  async handleSignupForm()
  {
    await this.handleSignupSubmit();
  }

  async handleForgotForm()
  {
  }

  /**
   * #expect request {email, password}
   * #expect response if code == 200 => {status: "succeed | pending"} else code == 401
   */
  async handleLoginSubmit()
  {
    const form = document.querySelector("#login-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

    const status = await this.models.login.tryLogin(form);
    if (status === "pending")
        this.models.auth.showForm("emailRequired");
    else if (status === "success")
        router.navigate("/home");
    });
  }

  /**
   * #expect request {username, email, password}
   * #expect response code == 201
   * #then clean form and send to login
   */
  async handleSignupSubmit()
  {
    const form = document.querySelector("#signup-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!this.models.signup.validatePassword(form))
        return
      const status = await this.models.signup.trySignup(form);
      if (status == "success")
        this.models.auth.showForm("emailRequired");
    });
  }

  async handleResendVerification() {
    const resendButton = document.querySelector("#reverify");
    resendButton.addEventListener("click", async (event) => {
      event.preventDefault();

      this.models.email.tryResetToken();
    });
  }

  async handleVerifyEmail()
  {
    const params = new URLSearchParams(window.location.search);
    if (params.has("verify-token"))
    {
      const token = params.get("verify-token");
      const status = await this.models.email.tryVerifyToken(token);
      if (status === "success")
        this.models.auth.showForm("emailVerified");
      else if (status === "expired")
        this.models.auth.showForm("emailExpired");
      else
        this.models.auth.showForm("login");
    }
  }
}

