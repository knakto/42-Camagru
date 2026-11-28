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
}
