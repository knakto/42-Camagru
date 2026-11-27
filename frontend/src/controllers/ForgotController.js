import views from "../views/IndexViews";
import services from "../services/IndexServices";
import ForgotModel from "../modeles/ForgotModel";

export default class ForgotController
{
  constructor()
  {
    this.model = new ForgotModel();
    this.clickCallback = {
      login: () => { services.router.navigate("/login")},
    };
  }

  init()
  {
    views.setupView("forgot");
    this.eventHandler("click", this.clickCallback, "#forgot-password-form");
    this.forgotHandler();
  }

  forgetPasswordSuccess()
  {
    views.setupView("forgotPasswordSuccess");
    this.eventHandler("click", this.clickCallback, "#forgot-success");
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

  forgotHandler()
  {
    const form = document.querySelector("#forgot-password-form");
    if (!form)
      return ;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = this.model.forgot(form);
      if (status === "success")
        this.forgetPasswordSuccess();
    });
  }
}

