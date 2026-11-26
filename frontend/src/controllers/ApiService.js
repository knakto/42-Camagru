class ApiError extends Error {
    constructor(message, status, errors = null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errors = errors;
    }
}

class Api {
  constructor(){
    this.url = "http://localhost:8443/api/v1"; 
  }
  async get(enpoint, payload={}){
    let response;
    let data;

    try{
      response = await fetch(this.url.concat(enpoint), {
        method: 'GET',
        ...payload
      });
    }catch{
      throw new ApiError("Unable to connect to server", response.status);
    }

    try {
      data = await response.json();
    } catch {
      throw new ApiError("Invalid server response", response.status);
    }


    if (!response.ok) {
      throw new ApiError(
        data.message || "request failed.",
        response.status,
        data.error
      );
    }

    return data;
  }

  async post(enpoint, payload = {}){
    let response;
    let data;

    try{
      response = await fetch(this.url.concat(enpoint), {
        method: 'POST',
        ...payload
      });
    }catch{
      throw new ApiError("Unable to connect to server", response.status);
    }

    try {
      data = await response.json();
    } catch {
      throw new ApiError("Invalid server response", response.status);
    }


    if (!response.ok) {
      throw new ApiError(
        data.message || "request failed.",
        response.status,
        data.error
      );
    }

    return data;
  }

  async login(data)
  {
    try{
      return await this.post(`/login`, {body:data});
    }catch(e) { throw e; }
  }

  async resendVerification()
  {
    try{
      await this.post(`/reset-token`);
    }catch(e) { throw e; }
  }

  async register({username, email, password})
  {
    try{
      return await this.post(`/register`, {username:username, email:email, password:password});
    }catch(e)
    {
      return e.message;
    }
  }

  async verifyEmail(data)
  {
    try{
      const params = new URLSearchParams({ verify_token: data });
      await this.get(`/verify-token?${params}`);
    }catch(e) { throw e; }
  }
}

const api = new Api();

export default api;
