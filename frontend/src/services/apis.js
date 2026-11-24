export default class api {
  constructor(){
    this.url = "http://localhost:8443/api/v1"; 
  }
  async get(enpoint){
    const response = await fetch(this.url.concat(enpoint));

    if (!response.ok) {
      throw new Error(`Get failed, Status: ${response.status}`);
    }

    const res = await response.json();
    return res;
  }

  async post(enpoint, payload = {}){
    const response = await fetch(this.url.concat(enpoint), {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Post failed, Status: ${response.status}`);
    }

    const res = await response.json();
    return res;
  }
}
