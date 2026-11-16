export default function Post({userID = "Knakto2026", caption = "", image}) {
  const post = document.createElement('div');
  post.className = "w-full h-fit bg-gray-300 flex-shrink-0 flex justify-start items-center flex-col gap-2";
  const profile = document.createElement('a');
  profile.className = "w-full h-16 bg-gray-500 p-4";
  profile.textContent = userID;
  post.appendChild(profile);
  if (caption !== ""){
    const captionPlane = document.createElement('p');
    captionPlane.className = "w-full h-fit bg-gray-500 p-4";
    captionPlane.textContent = caption;
    post.appendChild(captionPlane);
  }
  const postImage = document.createElement("img");
  postImage.className = "object-contain w-full h-full";
  postImage.src = image;
  post.appendChild(postImage);
  return post;
}
