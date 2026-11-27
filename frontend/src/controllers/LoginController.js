import LoginModel from "../modeles/LoginModel";
import views from "../views/IndexViews";
import services from "../services/IndexServices";

export default class LoginController
{
  constructor()
  {
    this.model = new LoginModel();

    this.clickCallback = {
      forgotPassword: () => {services.router.navigate("/forgot")},
      signup: () => { services.router.navigate("/signup")},
    };

    this.changeCallback = {
      showPassword: this.model.togglePassword,
    }
  }

  init()
  {
    views.setupView("login");
    this.loginHandler();
    this.eventHandler("click", this.clickCallback, "#login-form");
    this.eventHandler("change", this.changeCallback, "#login-form");
  }

  eventHandler(onevent, callbackList, parent)
  {
    const form = document.querySelector(parent);
    if (!form)
      return ;

    form.addEventListener(onevent, (event) => {
      const target = event.target.closest("[data-target]");

      if (!target || !callbackList[target.dataset.target])
        return ;

      const callback = callbackList[target.dataset.target];
      event.preventDefault();
      callback(form, event);
    });
  }

  loginHandler()
  {
    const form = document.querySelector("#login-form");
    if (!form)
      return ;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = this.model.login(form);
      if (status === "success")
        services.router.navigate("/home");
    });
  }
}
