import authViewport from "../../views/authViewport.js";
import AuthCard from "./components/AuthCard.js";

function showForm(type, viewport) {
  
  const track = viewport.querySelector("#track");

  const positions = {
    login: "-translate-x-1/3",
    signup: "-translate-x-2/3",
    forgot: "translate-x-0",
  };

  track.className = ` flex w-[300%] transition-transform duration-500 ease-in-out ${positions[type]} `;
}

function bindAuthEvent(viewport) {
  viewport.addEventListener("click", (event) => {
    const target = event.target.closest("[data-auth-view]");

    if (!target) return;

    event.preventDefault();
    showForm(target.dataset.authView, viewport);
  });
}

export async function AuthPage() {
  const authView = authViewport();
  const track = AuthCard();
  const viewportField = authView.querySelector("#authViewport");

  bindAuthEvent(viewportField);

  viewportField.replaceChildren(track);

  console.log(viewportField.innerHTML);
  document.querySelector("#app").replaceChildren(authView);
}

export default AuthPage;
