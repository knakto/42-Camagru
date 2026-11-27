import AuthView from "./Auth/AuthView"
import ErrorView from "./Error/ErrorView";

class IndexViews
{
  constructor()
  {
    this.viewsParent = {
      auth: new AuthView(),
      err: new ErrorView(),
    }

    this.targetView = {
      login: this.viewsParent.auth.login.bind(this.viewsParent.auth),
      signup: this.viewsParent.auth.signup.bind(this.viewsParent.auth),
      forgot: this.viewsParent.auth.forgot.bind(this.viewsParent.auth),
      forgotPasswordSuccess: this.viewsParent.auth.forgotpasswordSuccess.bind(this.viewsParent.auth),
      verifyRequire: this.viewsParent.auth.verifyRequire.bind(this.viewsParent.auth),
      verifySuccess: this.viewsParent.auth.verifySuccess.bind(this.viewsParent.auth),
      verifyExpire: this.viewsParent.auth.verifyExpire.bind(this.viewsParent.auth),
      error404: this.viewsParent.err.error404.bind(this.viewsParent.err),
    }
  }

  setupView(view)
  {
    const callback = this.targetView[view]??null;
    if (callback != null)
      callback();
  }
}

const views = new IndexViews();

export default views;
