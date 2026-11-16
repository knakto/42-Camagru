export default class api {
  constructor(){
    this.url = "http://localhost:8443/api/v1"; 
  }
  async get(enpoint){
    const res = await fetch(url.concat(enpoint));
    return res;
  }
}
