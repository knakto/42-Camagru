import layouts from "../../controllers/LayoutsModule";
import PreferencesSidebar from "./components/PreferencesSidebar";
import UserPreferences from "./components/UserPreferences";

export default function PreferencesPage() {
  layouts.setLayout("main");
  document.querySelector("#sidebar").innerHTML = PreferencesSidebar();
  document.querySelector("#content").innerHTML = UserPreferences();
}
