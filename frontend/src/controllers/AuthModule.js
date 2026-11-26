import EmailVerificationRequired from "../views/Auth/components/EmailVerificationRequired.js";
import AuthModel from "../modeles/AuthModel.js";
import AuthPage from "../views/Auth/AuthPage.js";
import api from "./ApiService.js";

export default class AuthModule
{
  constructor() { this.model = new AuthModel(); }

  async showPage()
  {
    await AuthPage();
    await this.bindLoginSubmit();
    await this.bindSignupSubmit();
    await this.switchAuthForm();
  }

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

  /**
   * #expect request {email, password}
   * #expect response if code == 200 => {status: "succeed | pending"} else code == 401
   */
  async bindLoginSubmit()
  {
    const form = document.querySelector("#login-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      console.log(await api.login(data));
      const viewPort = document.querySelector("#authViewport");
      viewPort.innerHTML = EmailVerificationRequired();
    });
  }

  /**
   * #expect request {username, email, password}
   * #expect response code == 201
   * #then clean form and send to login
   */
  async bindSignupSubmit()
  {
    const form = document.querySelector("#signup-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      
      const validated = this.model.validatePassword(formData.get("password"), formData.get("confirm_password"));

      if (validated.validate_ok == false){
        this.model.showPasswordError(validated.message);
      }

      this.model.showForm("login");
    });
  }
}

