import NotFoundPage from "./pages/Error404";

export default class ErrorView
{
  constructor()
  {
  }

  error404()
  {
    document.querySelector("#app").innerHTML = NotFoundPage();
  }
}
