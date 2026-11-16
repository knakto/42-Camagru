import { alertToScreen } from "../modeles/alert.js";

export default class Notification {
  constructor() {
    const notiPlane = document.createElement('div');
    notiPlane.className = "h-screen w-110 fixed top-0 right-0 flex flex-col gap-2";
    notiPlane.id = "notiPlane";

    document.body.appendChild(notiPlane);
  }
  destructor() {
    const notiPlane = document.querySelector("#notiPlane");
    notiPlane.remove();
  }
  info({message} = {}){
    alertToScreen({
      message:message,
      variant: "info",
      className: "w-full h-20 px-20 py-12 transition-opacity duration-300 ease-in-out z-[9999]"});
  }
  success({message}){
    alertToScreen({
      message:message,
      variant: "success",
      className: "w-full h-20 px-20 py-12 transition-opacity duration-300 ease-in-out z-[9999]"});
  }
  warn({message}){
    alertToScreen({
      message:message,
      variant: "warning",
      className: "w-full h-20 px-20 py-12 transition-opacity duration-300 ease-in-out z-[9999]"});
  }
  error({message}){
    alertToScreen({
      message:message,
      variant: "error",
      className: "w-full h-20 px-20 py-12 transition-opacity duration-300 ease-in-out z-[9999]"});
  }
}
