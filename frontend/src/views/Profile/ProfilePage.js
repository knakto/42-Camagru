import layouts from "../../controllers/LayoutsModule"
import PublicProfile from "./components/PublicProfile";

export default function ProfilePage()
{
  layouts.setLayout("main");
  const content = document.querySelector("#content");
  content.innerHTML = PublicProfile();
}
