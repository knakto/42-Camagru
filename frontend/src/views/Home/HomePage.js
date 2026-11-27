import layouts from "../../controllers/LayoutsService.js";


function Sidebar(){
  return `
    <aside class="w-full h-full bg-white flex flex-col p-6">

      <div class="hidden xl:flex items-center justify-between mb-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold">
            C
          </div>
          <span class="text-xl font-bold text-gray-900">Camagru</span>
        </div>

        <button class="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
          Menu
        </p>

        <a class="flex items-center gap-3 px-4 py-3 rounded-xl bg-black text-white font-medium">
          <span>⌂</span>
          Home
        </a>

        <a class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
          <span>▣</span>
          Explore
        </a>

        <a class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
          <span>♡</span>
          Favorites
        </a>

        <a class="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100">
          <span>▤</span>
          My Posts
        </a>
      </div>

      <div class="mt-auto border-t border-gray-200 pt-5">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
            K
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm text-gray-900">Kasichon</p>
            <p class="text-xs text-gray-500 truncate">@knakto</p>
          </div>
          <button class="text-gray-400">•••</button>
        </div>
      </div>

    </aside>
  `;
}



function Navbar(){
  return `
    <nav class="w-full h-full bg-white px-6 md:px-10 flex items-center justify-between">

      <div>
        <h1 class="text-xl font-bold text-gray-900">Explore</h1>
        <p class="text-xs text-gray-500">Discover amazing moments</p>
      </div>

      <div class="flex items-center gap-4">

        <div class="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl w-64">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path stroke-linecap="round" d="m21 21-4.35-4.35"/>
          </svg>
          <span class="text-sm text-gray-400">Search posts...</span>
        </div>

        <button class="relative w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
            <path stroke-linecap="round" d="M10 21h4"/>
          </svg>
          <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
          K
        </button>

      </div>
    </nav>
  `;
}


function Content(){
  return `
    <section class="w-full min-h-full bg-gray-50 px-5 md:px-10 py-8">

      <div class="max-w-5xl mx-auto">

        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900">Discover</h2>
          <p class="text-sm text-gray-500 mt-1">
            Explore what people are sharing today.
          </p>
        </div>

        <div class="flex gap-3 overflow-x-auto pb-5 mb-5">
          <button class="px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium whitespace-nowrap">
            All Posts
          </button>
          <button class="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm whitespace-nowrap">
            Photography
          </button>
          <button class="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm whitespace-nowrap">
            Nature
          </button>
          <button class="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-600 text-sm whitespace-nowrap">
            Lifestyle
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <article class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div class="flex items-center gap-3 p-4">
              <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                J
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900">John Doe</p>
                <p class="text-xs text-gray-400">2 hours ago</p>
              </div>
              <button class="text-gray-400">•••</button>
            </div>

            <div class="h-64 bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-200 flex items-center justify-center">
              <span class="text-7xl">🌅</span>
            </div>

            <div class="p-5">
              <div class="flex items-center gap-4 mb-3">
                <button class="text-gray-600 text-lg">♡</button>
                <button class="text-gray-600 text-lg">♧</button>
              </div>
              <p class="text-sm font-semibold text-gray-900">128 likes</p>
              <p class="text-sm text-gray-600 mt-2">
                <span class="font-semibold text-gray-900">John Doe</span>
                Beautiful sunset today!
              </p>
              <p class="text-xs text-gray-400 mt-3">View all 24 comments</p>
            </div>
          </article>

          <article class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div class="flex items-center gap-3 p-4">
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                S
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900">Sarah Smith</p>
                <p class="text-xs text-gray-400">5 hours ago</p>
              </div>
              <button class="text-gray-400">•••</button>
            </div>

            <div class="h-64 bg-gradient-to-br from-blue-200 via-cyan-100 to-teal-200 flex items-center justify-center">
              <span class="text-7xl">🏞️</span>
            </div>

            <div class="p-5">
              <div class="flex items-center gap-4 mb-3">
                <button class="text-gray-600 text-lg">♡</button>
                <button class="text-gray-600 text-lg">♧</button>
              </div>
              <p class="text-sm font-semibold text-gray-900">86 likes</p>
              <p class="text-sm text-gray-600 mt-2">
                <span class="font-semibold text-gray-900">Sarah Smith</span>
                Nature is the best therapy.
              </p>
              <p class="text-xs text-gray-400 mt-3">View all 12 comments</p>
            </div>
          </article>

        </div>
      </div>
    </section>
  `;
}

import { CreatePost, CreatePostEventBinding } from "./components/CreatePost.js";



export async function HomePage() {
  layouts.setLayout("main");

  // this is mocup only
  const content = document.querySelector("#content");
  const sidebar = document.querySelector("#sidebar");
  const nav = document.querySelector("#navbar");

  content.innerHTML = CreatePost();
  CreatePostEventBinding();

  // content.innerHTML = Content();

  sidebar.innerHTML = Sidebar();
  nav.innerHTML = Navbar();
}

export default HomePage;

