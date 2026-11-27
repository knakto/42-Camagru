import controllers from "../controllers/IndexControllers";

export default class Router {
  constructor(){
    this.defaultPage = controllers.login;
    this.routePath = [
      {path: "/login",      auth:false, callback:controllers.login},
      {path: "/signup",     auth:false, callback:controllers.signup},
      {path: "/forgot",     auth:false, callback:controllers.forgot},
      // {path: "/forgot",     auth:false, callback:this.modules.AuthModule},
      // {path: "/home",       auth:false, callback:this.modules.HomeModule},
      // {path: "/user",       auth:false, callback:this.modules.ProfilesModule},
      // {path: "/preference", auth:true,  callback:this.modules.PreferencesModule},
    ];

    this.backwardHandle();
  }

  backwardHandle()
  {
    window.addEventListener("popstate", async () => {
      const callback = await this.selecpath(window.location.pathname);

      callback.init();
    });
  }

  historyHandle(path, type)
  {
    if (type == "normal")
      history.pushState({}, "", path);
    else
      history.replaceState({}, "", path);
  }

  async navigate(path, type="normal")
  {
    const url = new URL(path, window.location.origin);
    this.historyHandle(url.href, type);
    const callback = await this.selecpath(url.pathname);
    callback.init();
  }

  async authCheck()
  {
    // const response = await this.modules.Api.get("/is-auth");
    // if (!response.ok)
    //   return false;
    return true;
  }

  async selecpath(path)
  {
    for (const e of this.routePath){
      if (path == e.path)
      {
        if (e.auth)
          if (!await this.authCheck())
            return this.defaultPage;
        return e.callback;
      }
    };
    return this.defaultPage;
  }
}
