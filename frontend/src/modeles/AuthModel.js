export default class AuthModel {
  showForm(formType){
    const positions = {
      forgot: "translate-x-0",
      login: "-translate-x-1/7",
      signup: "-translate-x-2/7",
      resetPassword: "-translate-x-3/7",
      emailExpired: "-translate-x-4/7",
      emailRequired: "-translate-x-5/7",
      emailVerified: "-translate-x-6/7",
    };

    const track = document.querySelector("#track");
    track.className = ` flex w-[700%] ${positions[formType]} `;
  }

  validatePassword(password, cmfpassword)
  {
    const passwordRules = [
      {test: /[a-z]/, message: "Must contain at least one lowercase letter"},
      {test: /[A-Z]/, message: "Must contain at least one uppercase letter"},
      {test: /[0-9]/, message: "Must contain at least one number"},
      {test: /^.{8,}$/, message: "Must be at least 8 characters long"},
    ];
    
    if (password !== cmfpassword)
      return {validate_ok: false, message: "Please enter same password."};

    for (const rule of passwordRules)
    {
      if (!rule.test.test(password))
        return {validate_ok: false, message: rule.message};
    }

    return {validate_ok: true};
  }

  showSignupPasswordError(message){
    const errorBlock = document.querySelector("#signup-password-error");
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
  }

  showSignupUsernameError(message){
    const errorBlock = document.querySelector("#signup-username-error");
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
  }

  showSignupEmailError(message){
    const errorBlock = document.querySelector("#signup-email-error");
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
  }

  showLoginError(message){
    const errorBlock = document.querySelector("#login-password-error");
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
  }

  handleTogglePassword(id)
  {
    const password = document.querySelector(id);

    password.addEventListener("pointerdown", () => {
      password.type = "text";
    });

    password.addEventListener("pointerup", () => {
      password.type = "password";
    });

    password.addEventListener("pointerleave", () => {
      password.type = "password";
    });
  }

  showReVerifyError(message){
    const errorBlock = document.querySelector("#reverify-error");
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
  }
  
  startCooldown(button, key) {
    const endTime = Number(localStorage.getItem(key)) || 0;

    function update() {
      const remaining = Math.max(
        0,
        Math.ceil((endTime - Date.now()) / 1000)
      );

      if (remaining <= 0) {
        clearInterval(timer);
        button.disabled = false;
        button.textContent = "Resend verification";
        localStorage.removeItem(key);
        return;
      }

      button.disabled = true;
      button.textContent = `Resend (${remaining}s)`;
    }

    if (endTime <= Date.now()) {
      button.disabled = false;
      button.textContent = "Resend verification";
      return;
    }

    update();

    const timer = setInterval(update, 1000);
  }

}
