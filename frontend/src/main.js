import services from "./services/IndexServices.js";
import "./style.css";

services.router.navigate(window.location.pathname + window.localStorage.search + window.localStorage.hash);
