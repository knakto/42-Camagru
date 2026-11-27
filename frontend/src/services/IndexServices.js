import Api from "./ApiService";
import Layout from "./LayoutsService";
import Router from "./RouterService";

class IndexServices
{
  constructor()
  {
    this.api = new Api();
    this.layout = new Layout();
    this.router = new Router();
  }
}

const services = new IndexServices();

export default services;


