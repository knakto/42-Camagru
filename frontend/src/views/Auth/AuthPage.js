import layouts from "../../controllers/LayoutsModule.js";
import authViewport from "./components/authViewport.js";
import AuthCard from "./components/AuthCard.js";
import ResetPasswordForm from "./components/ResetPasswordForm.js";
import EmailVerified from "./components/EmailVerified.js";
import EmailVerificationExpired from "./components/EmailVerificationExpired.js";

function showForm(type, viewport) {

  const track = viewport.querySelector("#track");

  const positions = {
    login: "-translate-x-1/3",
    signup: "-translate-x-2/3",
    forgot: "translate-x-0",
  };

  track.className = ` flex w-[300%] transition-transform duration-500 ease-in-out ${positions[type]} `;
}

function bindAuthEvent() {
  const viewport = document.querySelector("#authViewport");
  viewport.addEventListener("click", (event) => {
    const target = event.target.closest("[data-auth-view]");

    if (!target) return;

    event.preventDefault();
    showForm(target.dataset.authView, viewport);
  });
}

export default async function AuthPage() {
  layouts.setLayout('auth');
  document.querySelector("#content").innerHTML = authViewport();

  const params = new URLSearchParams(window.location.search);
  const reset_token = params.get("reset_token");
  const verified = params.get("verified");
  if (reset_token !== null)
    document.querySelector("#authViewport").innerHTML = ResetPasswordForm();
  else if (verified === "true")
    document.querySelector("#authViewport").innerHTML = EmailVerified();
  else if (verified === "false")
    document.querySelector("#authViewport").innerHTML = EmailVerificationExpired();
  else
    document.querySelector("#authViewport").innerHTML = AuthCard();
  bindAuthEvent();
}
