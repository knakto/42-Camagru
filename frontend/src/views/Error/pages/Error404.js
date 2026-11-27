export default function NotFoundPage() {
    return `
      <div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-6 font-sans text-center">

        <div class="relative">
          <h1 class="text-[120px] font-black leading-none tracking-tighter text-blue-600 sm:text-[180px]">
            404
          </h1>
          <div class="absolute -right-3 -top-3 h-4 w-4 rounded-full bg-blue-200"></div>
        </div>

        <h2 class="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Page not found
        </h2>

        <p class="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 sm:text-base">
          The page you're looking for doesn't exist
          or may have been moved.
        </p>

        <div class="mt-10 flex items-center gap-2">
          <div class="h-2 w-2 rounded-full bg-blue-600"></div>
          <span class="text-xs font-bold tracking-[0.25em] text-gray-400">
            CAMAGRU
          </span>
        </div>

      </div>
    `;
}

