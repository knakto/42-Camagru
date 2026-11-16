import Post from "../pages/Home/components/Post.js";
import Icons from "/favicon.svg";

function feedLayout() {
  const layout = document.createElement('div');
  layout.className = "w-full h-full flex justify-center items-center";
  const feed = document.createElement('div');
  feed.id = "feed";
  feed.className = "w-250 shrink h-full bg-gray-100 flex flex-col gap-10 overflow-scroll overscroll-y-auto scrollbar-none items-center md:p-10";

  layout.appendChild(feed);

  return layout;
}

function addfeed(feed) {
  const sometext = `
  alskdjasldj
  alskdjasldjdjsadjksa
  defaultads
  alskdjasldjdjsadjksa
  alskdjasldjdjsadjksa
  alskdjasldjdjsadjksa
  alskdjasldjdjsadjksa

  alskdjasldjdjsadjksa

  alskdjasldjdjsadjksa
  alskdjasldj

  alskdjasldjdjsadjksad
  `;
  for (let i = 0; i < 200; i++){
    feed.appendChild(Post({image:Icons, caption: sometext}));
  }
}

export default function feed() {
  const feedView = feedLayout();
  const feed = feedView.querySelector("#feed");
  addfeed(feed);
  return feedView;
}
