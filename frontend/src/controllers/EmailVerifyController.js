import VerifyModel from "../modeles/VerifyModel";
import views from "../views/IndexViews";
import services from "../services/IndexServices";

export default class EmailVeriftController
{
  constructor()
  {
    this.model = new VerifyModel();
    this.clickCallback = {
      login: () => { services.router.navigate("/login")},
      resend: this.model.resend,
    };
  }

  init()
  {
    this.initVerifyRequire();
  }

  initVerifyRequire()
  {
    views.setupView("verifyRequire");
    this.eventHandler("click", this.clickCallback, "#email-required")
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

}

