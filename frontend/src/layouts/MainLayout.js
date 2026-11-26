export default function MainLayout(){
  return `
    <section id="root" class="w-screen h-screen overflow-hidden bg-black flex flex-col-reverse xl:flex-row">

      <section id="sidebar" class="h-16 w-full xl:h-screen bg-white
      flex-shrink-0 xl:w-100 border-t-2 xl:border-t-0 xl:border-r-2 border-gray-200 z-[10]
      flex flex-col">

      </section>

      <section class="min-w-0 min-h-0 flex-1 h-screen bg-white flex flex-col overflow-hidden">

        <nav id="navbar" class="w-full h-16 flex-shrink-0 bg-white border-b-2 border-gray-200 z-20">

        </nav>

        <main id="content" class="w-full flex-1 min-h-0 overflow-y-auto">

        </main>

        <footer id="footer" class="w-full h-16 flex-shrink-0 bg-white border-t border-gray-200 invisible md:visible">
          <div class="h-full w-full flex justify-end px-6 items-center">
            <p class="text-xs font-medium text-gray-400 tracking-wide">
              &copy; 2026 Camagru <span class="mx-1">·</span> 42
            </p>
          </div>
        </footer>

      </section>
    </section>
  `;
}

