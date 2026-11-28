import services from "../../services/IndexServices";
import { Sidebar, Navbar, Content } from "./HomePage";

export default class HomeView
{
  constructor()
  {
  }

  home()
  {
    services.layout.setLayout('main');
    const content = document.querySelector("#content");
    const sidebar = document.querySelector("#sidebar");
    const nav = document.querySelector("#navbar");

    content.innerHTML = Content();
    sidebar.innerHTML = Sidebar();
    nav.innerHTML = Navbar();
  }
}
