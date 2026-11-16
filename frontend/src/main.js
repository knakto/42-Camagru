import AuthPage from "./pages/Auth/AuthPage.js";
import HomePage from "./pages/Home/HomePage.js";
import "./style.css";

async function verify_permission(private_route) {
   await private_route()
}

async function serve_first_page() {
  await AuthPage();
}

async function route() {
  const path = window.location.pathname;

  switch (path){
    case "/":
      await serve_first_page();
      break;
    case "/auth":
      await AuthPage();
      break ;
    case "/home":
      await verify_permission(HomePage);
      break ;
    default: 
      document.getElementById("app").textContent = "404 Not Found";
      return ;
  }
}

route();
