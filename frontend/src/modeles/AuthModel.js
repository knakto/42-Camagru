import api from "../controllers/ApiService.js";

export class AuthModel {
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

  /**
   * This function call for change Authmethod like Forgot, Login, and Signin
   * this hidden 3 Authmethod that can come from queryUrl only.
   */
  async switchAuthForm()
  {
    const viewport = document.querySelector("#authViewport");
    viewport.addEventListener("click", (event) => {
      const target = event.target.closest("[data-auth-view]");

      if (!target) return;

      event.preventDefault();
      this.showForm(target.dataset.authView);
    });
  }
}

export class LoginModel
{

  async tryLogin(form)
  {
    let res;
    try{
      res = await api.login(new FormData(form));
      if (res.status == "pending")
        return "pending";
      else if (res.status == "success")
        return "success";
    }catch(e)
    {
      if (e.message == "Wrong email or password")
        this.showError("password","The email or password you've entered is incorrect.");
      else
        this.showError("submit","Something went wrong.");
    }
  }

  showError(on, message){
    const target = {
      password: "#login-password-error",
      submit: "#login-submit-error",
    }
    const errorBlock = document.querySelector(target[on]);
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
    if (on == "submit")
      this.showError("password", "");
  }

  handleTogglePassword()
  {
    const password = document.querySelector("#login-password");
    const checkbox = document.querySelector("#login-show-password");
    checkbox?.addEventListener("change", () => {
        password.type = checkbox.checked ? "text" : "password";
    });
  }

}

export class SignupModel
{
  async trySignup(form)
  {
    try{
      const formData = new FormData(form);
      console.log(formData);
      await api.register(formData);
      return "success";
    }catch (e)
    {
      if (e.message == "Username alrady exists")
        this.showError("username", "Username already exists");
      else if (e.message == "Email alreay exists")
        this.showError("email", "Email already exists");
      else
        this.showError("submit", "Something went wrong");
      return "failed";
    }
  }

  checkFormatPassword(password, cmfpassword)
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

  validatePassword(form)
  {
    const formData = new FormData(form);

    const validated = this.checkFormatPassword(
      formData.get("password"),
      formData.get("confirm_password"));

    if (validated.validate_ok == false){
      this.showError("password", validated.message);
      return false
    }
    return true
  }

  showError(on, message){
    const target = {
      username: "#signup-username-error",
      email: "#signup-email-error",
      password: "#signup-password-error",
      submit: "#signup-submit-error",
    };
    const errorBlock = document.querySelector(target[on]);
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
    if (on == "submit")
    {
      this.showError("username", "");
      this.showError("email", "");
      this.showError("password", "");
    }
  }
}

export class ForgotModel
{
}

export class EmailVerification
{
  showReVerifyError(message){
    const errorBlock = document.querySelector("#reverify-error");
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
  }
  
  startCooldown(button, key) {
    const endTime = Number(localStorage.getItem(key)) || 0;

    function update() {
      const remaining = Math.max(
        
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

  async tryResetToken()
  {
    try {
      const COOLDOWN = 60 * 1000;
      await api.resendVerification();

      localStorage.setItem(
        "verification-cooldown",
        Date.now() + COOLDOWN
      );

      this.startCooldown(
        resendButton,
        "verification-cooldown"
      );
    } catch (e) {
      this.showReVerifyError("Something went wrong.");
    }
  }

  async tryVerifyToken(token)
  {
    try{
      await api.verifyEmail(token);
      return "success";
    }catch(e)
    {
      if (e.message == "Token expired")
        return "expired";
      else
        return "error";
    }
  }
}
