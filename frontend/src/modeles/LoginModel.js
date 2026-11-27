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

  login(form)
  {
    console.log("login", form);
    return "success";
  }
}
