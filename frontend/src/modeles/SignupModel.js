import services from "../services/IndexServices";

export default class SignupModel
{
  constructor()
  {
  }
  
  async signup(form)
  {
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
      console.log('status: ', e.status);
      return "failed";
    }
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
