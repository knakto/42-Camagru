import layouts from "../../controllers/LayoutsService.js"
import PublicProfile from "./components/PublicProfile.js";

export default function ProfilePage()
{
  layouts.setLayout("main");
  const content = document.querySelector("#content");
  content.innerHTML = PublicProfile();
}
