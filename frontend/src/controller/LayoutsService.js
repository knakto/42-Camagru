import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

class LayoutModule {
  constructor()
  {
    this.layouts = [
      {name:"auth", callback:AuthLayout, bindEvent:this.authEvent},
      {name:"main", callback:MainLayout, bindEvent:this.nullEvent},
    ]
  }

  setLayout(layout)
  {
    const {callback, bindEvent} = this.selectLayout(layout);
    document.querySelector("#app").innerHTML = callback();
    bindEvent();
  }

  selectLayout(layout){
    for (const e of this.layouts)
    {
      if (e.name === layout)
        return {callback:e.callback, bindEvent:e.bindEvent};
    }
    return {callback:() => "layouts error.", bindEvent:this.nullEvent};
  }

  nullEvent()
  {
  }

  authEvent()
  {
    
  }
}

const layouts = new LayoutModule();

export default layouts;
