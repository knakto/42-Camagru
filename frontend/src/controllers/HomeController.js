import views from "../views/IndexViews";

export default class HomeController
{
  constructor()
  {
  }

  init()
  {
    views.setupView("home");
  }
}
