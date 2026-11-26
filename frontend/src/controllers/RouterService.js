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
      {path: "/auth",       auth:false, callback:this.modules.AuthModule},
      {path: "/home",       auth:false,  callback:this.modules.HomeModule},
      {path: "/user",       auth:false,  callback:this.modules.ProfilesModule},
      {path: "/preference", auth:true,  callback:this.modules.PreferencesModule},
    ];

  }

  historyHandle()
  {
    history.pushState({}, "", window.location.href);
  }

  async navigate(path)
  {
    this.historyHandle();
    const callback = await this.selecpath(path);
    await callback.showPage();
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
