import AuthModule from "../controllers/AuthModule.js";
import HomeModule from "../controllers/HomeModule.js";
import Api from "./apis.js";

class Route {
  constructor(){
    this.modules = {
      Api: new Api(),
      AuthModule: new AuthModule(),
      HomeModule: new HomeModule(),
    }
    this.defaultPage = this.modules.AuthModule;
    this.routePath = [
      {path: "/auth",       auth:false, callback:this.modules.AuthModule},
      {path: "/home",       auth:false,  callback:this.modules.HomeModule},
      {path: "/verify",     auth:true,  callback:()=>null},
      {path: "/user",       auth:true,  callback:()=>null},
      {path: "/preference", auth:true,  callback:()=>null},
    ];

  }

  async navigate(path)
  {
    const callback = await this.selecpath(path);
    callback.showPage();
  }

  async authCheck()
  {
    const response = await this.modules.Api.get("/is-auth");
    if (!response.ok)
      return false;
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

const route = new Route();

export default route;
