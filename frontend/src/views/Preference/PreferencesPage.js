import layouts from "../../controllers/LayoutsService.js";
import PreferencesSidebar from "./components/PreferencesSidebar.js";
import UserPreferences from "./components/UserPreferences.js";

export default function PreferencesPage() {
  layouts.setLayout("main");
  document.querySelector("#sidebar").innerHTML = PreferencesSidebar();
  document.querySelector("#content").innerHTML = UserPreferences();
}
