import services from "./services/IndexServices.js";
import "./style.css";

services.router.navigate(window.location.pathname + window.location.search + window.location.hash);
