import views from "../views/IndexViews";
import services from "../services/IndexServices";
import SignupModel from "../modeles/SignupModel";
import controllers from "./IndexControllers";

export default class SignupController
{
  constructor()
  {
    this.model = new SignupModel();
    this.clickCallback = {
      login: () => { services.router.navigate("/login")},
    };
  }

  init()
  {
    views.setupView("signup");
    this.eventHandler("click", this.clickCallback, "#signup-form");
    this.signupHandler();
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

  signupHandler()
  {
    const form = document.querySelector("#signup-form");
    if (!form)
      return ;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = this.model.signup(form);
      if (status === "success")
        controllers.email.init();
    });
  }
}
