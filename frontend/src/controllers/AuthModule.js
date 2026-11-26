import AuthPage from "../views/Auth/AuthPage.js";
import EmailVerificationRequired from "../views/Auth/components/EmailVerificationRequired.js";
import api from "../services/Api.js";

export default class AuthModule
{
  constructor()
  {
  }

  async showPage()
  {
    await AuthPage();
    await this.bindLoginSubmit();
  }

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

  async bindSignSubmit()
  {
  }
}
