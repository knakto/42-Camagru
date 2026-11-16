export default function AuthLayout(content="") {
  return `
  <section id="root" class="w-screen h-screen bg-black flex">
    <section id="page" class="w-full h-screen bg-white">
      <main id="content" class="flex w-full h-full justify-center items-center">
        ${content}
      </main>
    </section>
  </section>
  `;
}
