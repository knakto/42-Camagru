import AuthModel from "../modeles/AuthModel.js";
import AuthPage from "../views/Auth/AuthPage.js";
import api from "./ApiService.js";
import router from "./RouterService.js";

export default class AuthModule
{
  constructor() { this.model = new AuthModel(); }

  async showPage()
  {
    await AuthPage();
    await this.handleLoginForm();
    await this.handleSignupSubmit();
    await this.handleResendVerification();
    await this.switchAuthForm();
    await this.handleVerifyEmail();
  }

  async handleVerifyEmail()
  {
    const params = new URLSearchParams(window.location.search);
    if (params.has("verify-token"))
    {
      const token = params.get("verify-token");
      try{
        await api.verifyEmail(token);
        this.model.showForm("emailVerified");
      }catch(e)
      {
        if (e.message == "Token expired")
          this.model.showForm("emailExpired");
        else
        {
          this.model.showForm("login");
        }
      }
    }
  }

  /**
   * This function call for change Authmethod like Forgot, Login, and Signin
   * this hidden 3 Authmethod that can come from queryUrl only.
   */
  async switchAuthForm()
  {
    const viewport = document.querySelector("#authViewport");
    viewport.addEventListener("click", (event) => {
      const target = event.target.closest("[data-auth-view]");

      if (!target) return;

      event.preventDefault();
      this.model.showForm(target.dataset.authView);
    });
  }

  async handleLoginForm()
  {
    await this.handleLoginSubmit();
    this.model.handleTogglePassword("#login-password");
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

      let res;
      try{
        res = await api.login(new FormData(form));
        if (res.status == "pending")
          this.model.showForm("emailRequired");
        else if (res.status == "success")
          router.navigate("/home");
      }catch(e)
      {
        if (e.message == "Wrong email or password")
          this.model.showLoginError("The email or password you've entered is incorrect.");
        else
          this.model.showLoginError("Something went wrong.");
      }
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

      const formData = new FormData(form);
      
      const validated = this.model.validatePassword(formData.get("password"), formData.get("confirm_password"));

      if (validated.validate_ok == false){
        this.model.showSignupPasswordError(validated.message);
      }

      this.model.showForm("login");
    });
  }

  async handleResendVerification() {
    const resendButton = document.querySelector("#reverify");
    const COOLDOWN = 60 * 1000;
    resendButton.addEventListener("click", async (event) => {
      event.preventDefault();

      try {
        await api.resendVerification();

        localStorage.setItem(
          "verification-cooldown",
          Date.now() + COOLDOWN
        );

        this.model.startCooldown(
          resendButton,
          "verification-cooldown"
        );
      } catch (e) {
        this.model.showReVerifyError("Something went wrong.");
      }
    });
  }

}

