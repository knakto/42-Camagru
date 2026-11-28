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
    const params = new URLSearchParams(window.location.search);

    if (params.has('reset-token'))
    {
      (async () => {
        const status = await this.model.resetTokenCheck(params.get('reset-token'));
        if (status === "success")
          this.initResetPassword(params.get('reset-token'));
      })();
      this.initResetExpired();
    }
    else
      this.initForgotPassword();
  }

  initResetSuccess()
  {
    views.setupView("resetSuccess");
    this.eventHandler("click", this.clickCallback, "#reset-success");
  }

  initResetExpired()
  {
    views.setupView("resetExpired");
    this.eventHandler("click", this.clickCallback, "#reset-expired");
  }

  initResetPassword(token)
  {
    views.setupView("reset");
    this.eventHandler("click", this.clickCallback, "#reset-password-form");
    this.resetSubmitHandler(token);
  }

  resetSubmitHandler(token)
  {
    const form = document.querySelector("#reset-password-form");
    if (!form)
      return ;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const status = await this.model.reset(form, token);
      if (status === "success")
        this.initResetSuccess();
      else if (status === "Token expired")
        this.initResetExpired();
    });
  }

  initForgotPassword()
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
      this.model.forgot(form);
      this.forgetPasswordSuccess();
    });
  }
}

