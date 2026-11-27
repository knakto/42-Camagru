import AuthView from "./Auth/AuthView"

class IndexViews
{
  constructor()
  {
    this.viewsParent = {
      auth: new AuthView(),
    }

    this.targetView = {
      login: this.viewsParent.auth.login.bind(this.viewsParent.auth),
      signup: this.viewsParent.auth.signup.bind(this.viewsParent.auth),
      forgot: this.viewsParent.auth.forgot.bind(this.viewsParent.auth),
      forgotPasswordSuccess: this.viewsParent.auth.forgotpasswordSuccess.bind(this.viewsParent.auth),
      verifyRequire: this.viewsParent.auth.verifyRequire.bind(this.viewsParent.auth),
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
