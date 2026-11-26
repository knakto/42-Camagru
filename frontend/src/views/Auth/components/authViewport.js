import Logo from "/logo.png";

export default function authViewport(){
  const content = `
    <div class="w-full sm:w-150 xl:w-300 h-screen sm:h-200 bg-white border-2 border-gray-200 rounded-xl overflow-hidden flex flex-row">

      <div class="w-full xl:w-1/2 h-full flex-shrink-0 bg-white border-gray-200 border-r-2 flex justify-center items-center">
        <div id="authViewport" class="w-full max-w-md overflow-hidden">
        </div>
      </div>

      <div id="picture" class="hidden xl:flex justify-center items-center p-14 w-full">
        <img src="${Logo}" alt=""/>
      </div>

    </div>
  `;

  return content;
}

