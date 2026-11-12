export async function HomePage() {
  const layout = await fetch("../../layouts/MainLayout.html");
  document.getElementById("app").innerHTML = await layout.text();
}

export default HomePage;
