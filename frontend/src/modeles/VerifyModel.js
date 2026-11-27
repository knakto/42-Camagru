import services from "../services/IndexServices";

export default class VerifyModel
{
  constructor()
  {
  }

  async verify(token)
  {
    try{
      await services.api.verifyEmail(token);
      return "success";
    }catch(e)
    {
      if (e.message == "Token expired")
        return "expired";
      else
        return "error";
    }
  }

  async resend(form)
  {
    try {
      const resendButton = form.querySelector('#reverify');
      const COOLDOWN = 30 * 1000;
      await services.api.resendVerification();

      localStorage.setItem(
        "verification-cooldown",
        Date.now() + COOLDOWN
      );

      this.startCooldown(
        resendButton,
        "verification-cooldown"
      );
    } catch (e) {
      this.error(form, "Something went wrong.");
    }
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

  error(form, message)
  {
    const errorBlock = form.querySelector("#reverify-error");
    errorBlock.textContent = message;
    errorBlock.classList.toggle("hidden", !message);
  }
}
