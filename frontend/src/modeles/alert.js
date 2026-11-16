import { Alert } from "../components";

export function alertToScreen({message = "", duration = 3000, variant = "info", className = ""} = {}) {
  const toast = Alert({message: message, variant:variant, className:className});
  document.querySelector("#notiPlane").appendChild(toast);
  setTimeout(() => {
    toast.classList.add("hidden");

    toast.addEventListener("transitionend", () => {
      toast.remove();
    }, { once: true });
  }, duration);
}
