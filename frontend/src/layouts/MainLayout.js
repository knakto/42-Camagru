export default function MainLayout({
  content = "",
  sidebar = "",
  navbar = ""
} = {}) {
  return `
    <section id="root" class="w-screen h-screen bg-black flex flex-col-reverse xl:flex-row">
      <section id="sidebar" class="h-16 w-full xl:h-screen bg-white
      flex-shrink-0 xl:w-100 border-t-2 xl:border-r-2 border-gray-200 z-[10]">
        ${sidebar}
      </section>
      <section id="page" class="w-full h-screen bg-white">
        <nav id="navbar" class="w-full h-16 bg-white fixed top-0 left-0 xl:pl-100 border-b-2 border-gray-200">
          ${navbar}
        </nav>
        <main id="content" class="w-full h-full flex-shrink-1 pt-30 xl:pt-16">
          ${content}
        </main>
        <footer id="footer" class="w-full h-16 bg-white fixed bottom-0 left-0 xl:pl-100 border-t-2 border-gray-200 invisible md:visible flex-shrink-0">
          <div class="h-full w-full flex justify-end p-5 items-center">
            <p>&copy; 2026 Camagru 42</p>
          </div>
        </footer>
      </section>
    </section>
  `;
}
