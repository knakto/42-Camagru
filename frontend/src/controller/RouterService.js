import AuthModule from "../controllers/AuthModule.js";
import HomeModule from "../controllers/HomeModule.js";
import PreferencesModule from "../controllers/PreferencesModule.js";
import ProfilesModule from "../controllers/ProfilesModule.js"

class Route {
  constructor(){
    this.modules = {
      AuthModule: new AuthModule(),
      HomeModule: new HomeModule(),
      ProfilesModule: new ProfilesModule(),
      PreferencesModule: new PreferencesModule(),
    }
    this.defaultPage = this.modules.AuthModule;
    this.routePath = [
      {path: "/login",      auth:false, callback:this.modules.AuthModule},
      {path: "/signup",     auth:false, callback:this.modules.AuthModule},
      {path: "/forgot",     auth:false, callback:this.modules.AuthModule},
      {path: "/home",       auth:false, callback:this.modules.HomeModule},
      {path: "/user",       auth:false, callback:this.modules.ProfilesModule},
      {path: "/preference", auth:true,  callback:this.modules.PreferencesModule},
    ];

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
    await callback.init();
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

const router = new Route();

export default router;
