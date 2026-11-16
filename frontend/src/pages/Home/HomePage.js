import MainLayout from "../../layouts/MainLayout.js";
import feed from "../../views/feed.js";
import navbar from "../../views/nav.js";

export async function HomePage() {
  document.querySelector("#app").innerHTML = MainLayout();
  const content = document.querySelector("#content");
  const sidebar = document.querySelector("#sidebar");
  const nav = document.querySelector("#navbar");

  content.replaceChildren(feed());
  nav.replaceChildren(navbar());
}

export default HomePage;

