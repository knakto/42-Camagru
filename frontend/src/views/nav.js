import Logo from "/logo.png";

export default function navbar() {
  const nav = document.createElement('div');
  nav.className = "w-full h-full flex justify-center xl:justify-start";
  
  const image = document.createElement('img');
  image.src = Logo;
  nav.appendChild(image);
  return nav;
}
