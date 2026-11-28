import services from "../services/IndexServices";

export default class SignupModel
{
  constructor()
  {
  }
  
  async signup(form)
  {
    if (!this.passwordValidate(form))
      return "failed";

    try{
      const formData = new FormData(form);
      await services.api.register(formData);
      return "success";
    }catch (e)
    {
      if (e.message == "Username already exists")
        this.error(form, "username", "Username already exists");
      else if (e.message == "Email already exists")
        this.error(form, "email", "Email already exists");
      else
        this.error(form, "submit", "Something went wrong");
      return "failed";
    }
  }

  passwordValidate(form)
  {
    const data = new FormData(form);

    if (data.has('password') && data.has('confirm-password'))
    {
      const password = data.get('password');
      const cfmPassword = data.get('confirm-password');
      const isValidLength = password.length >= 8;
      const isHaveSpecial = /[^a-zA-Z0-9]/.test(password);
      const isHaveNumber = /[0-9]/.test(password);
      const isHaveUppercase = /[A-Z]/.test(password);
      const isHaveLowercase = /[a-z]/.test(password);

      if (password !== cfmPassword)
        this.error(form, "password", "Please enter same password.");
      else if (!isValidLength)
        this.error(form, "password", "Password must be at least 8 characters long.");
      else if (isHaveSpecial)
        this.error(form, "password", "Password must not contain special characters.");
      else if (!isHaveNumber)
        this.error(form, "password", "Password must contain at least 1 number characters.");
      else if (!isHaveUppercase)
        this.error(form, "password", "Password must contain at least 1 upper characters.");
      else if (!isHaveLowercase)
        this.error(form, "password", "Password must contain at least 1 lower characters.");
      else
        return true;
    }
    else
      this.error(form, "password", "Please enter password and confirm password.");
    return false;
  }

  error(form, on, message)
  {
    const target = {
      username: "#username-error",
      email: "#email-error",
      password: "#password-error",
      submit: "#submit-error",
    };

    const reset = (t) => {
      const errorBlock = form.querySelector(t);
      errorBlock.textContent = "";
      errorBlock.classList.add("hidden");
    };

    reset(target['username']);
    reset(target['email']);
    reset(target['password']);
    reset(target['submit']);

    const errorBlock = form.querySelector(target[on]);
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
  }
}
