import LoginForm from "../../components/Forms/LoginForm/LoginForm.js";
import SignupForm from "../../components/Forms/SignupForm/SignupForm.js";
import ForgotPasswordForm from "../../components/Forms/ForgotPasswordForm/ForgotPasswordForm.js";

function AuthCard() {
    const viewport = document.createElement("div");
    const track = document.createElement("div");

    viewport.className = `
        w-full max-w-md overflow-hidden
    `;

    const login = LoginForm();
    const signup = SignupForm();
    const forgot = ForgotPasswordForm();

    [login, signup, forgot].forEach(form => {form.style.flex = "0 0 33.333333%";});

    track.className = `
      flex w-[300%]
      transition-transform duration-300 ease-in-out
      -translate-x-1/3
    `;

    track.append(forgot, login, signup);
    viewport.append(track);

    function showForm(type) {
      const positions = {
        login: "-translate-x-1/3",
        signup: "-translate-x-2/3",
        forgot: "translate-x-0",
      };

      track.className = `
        flex w-[300%]
        transition-transform duration-500 ease-in-out
        ${positions[type]}
    `;
    }

    viewport.addEventListener("click", (event) => {
        const target = event.target.closest("[data-auth-view]");

        if (!target) return;

        event.preventDefault();
        showForm(target.dataset.authView);
    });

    return viewport;
}

export async function AuthPage() {
  const layout = await fetch("../../layouts/AuthLayout.html");
  console.log(layout);
  document.getElementById("app").innerHTML = await layout.text();

  const authBlock = document.getElementById("auth");
  console.log(authBlock);
  authBlock.append(AuthCard());
}

export default AuthPage;
