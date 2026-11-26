export default class AuthModel {
  showForm(formType){
    const positions = {
      login: "-translate-x-1/3",
      signup: "-translate-x-2/3",
      forgot: "translate-x-0",
    };

    const track = document.querySelector("#track");
    track.className = ` flex w-[300%] transition-transform duration-500 ease-in-out ${positions[formType]} `;
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

  showPasswordError(message){
    const errorBlock = document.querySelector("#signup-password-error");
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
  }
}
