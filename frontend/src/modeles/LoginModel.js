import services from "../services/IndexServices";

export default class LoginModel
{
  constructor()
  {
  }

  togglePassword(form)
  {
    const password = form.querySelector('#password');
    const checkbox = form.querySelector('#show-password');
    password.type = checkbox.checked ? "text" : "password";
  }

  async login(form)
  {
    let res;
    try{
      res = await services.api.login(new FormData(form));
      if (res.status == "pending")
        return "pending";
      else if (res.status == "success")
        return "success";
    }catch(e)
    {
      if (e.message == "Wrong email or password")
        this.error(form, "password", "The email or password you've entered is incorrect.");
      else
        this.error(form, "submit", "Something went wrong.");
      return "failed";
    }
  }

  error(form, on, message)
  {
    const target = {
      password: "#password-error",
      submit: "#submit-error",
    }

    const reset = (t) => {
      const errorBlock = form.querySelector(t);
      errorBlock.textContent = "";
      errorBlock.classList.add("hidden");
    };

    reset(target['password']);
    reset(target['submit']);

    const errorBlock = form.querySelector(target[on]);
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
  }
}
