import layouts from "../../controllers/LayoutsService.js";
import AuthViewport from "./components/AuthViewport.js";
import AuthCard from "./components/AuthCard.js";

export default async function AuthPage() {
  layouts.setLayout('auth');
  document.querySelector("#content").innerHTML = AuthViewport();
  document.querySelector("#authViewport").innerHTML = AuthCard();
}
