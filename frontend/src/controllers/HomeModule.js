import HomePage from "../views/Home/HomePage.js";

export default class HomeModule 
{
  constructor()
  {
  }

  async showPage()
  {
    await HomePage();
  }
}
