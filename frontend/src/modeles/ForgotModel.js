import services from "../services/IndexServices";

export default class ForgotModel
{
  constructor()
  {
  }

  async forgot(form)
  {
    try{
      const formData = new FormData(form);
      await services.api.resetRequest(formData);
    }catch (e) { }
    return "success";
  }

  async reset(form, token)
  {
    if (!this.passwordValidate(form))
      return "failed";

    try{
      const formData = new FormData(form);
      formData.append("reset_token", token);
      await services.api.resetPassword(formData);
      return "success";
    }catch (e) {
      if (e.message == "Token expired")
        return "expired";
      else
        return "error";
    }
  }

  passwordValidate(form)
  {
    const data = new FormData(form);

    if (data.has('new_password') && data.has('confirm_password'))
    {
      const password = data.get('new_password');
      const cfmPassword = data.get('confirm_password');
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


  async resetTokenCheck(token)
  {
    try{
      const formData = new FormData();
      formData.append("reset_token", token);
      await services.api.resetTokenCheck(formData);
      return "success";
    }catch (e) {
      if (e.message == "Token expired")
        return "expired";
      else
        return "error";
    }
  }

  error(form, on, message)
  {
    const target = {
      password: "#password-error",
    }

    const reset = (t) => {
      const errorBlock = form.querySelector(t);
      errorBlock.textContent = "";
      errorBlock.classList.add("hidden");
    };

    reset(target['password']);

    const errorBlock = form.querySelector(target[on]);
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
  }
}
