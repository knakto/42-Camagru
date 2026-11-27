export default function EmailVerified() {
    return `
      <div id="email-verified" class="flex w-full max-w-md flex-col items-center gap-5 rounded-2xl bg-white p-8 font-sans text-center">

        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-green-600"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 13l4 4L19 7"/>
          </svg>
        </div>

        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            Email verified!
          </h2>

          <p class="mt-2 text-sm font-normal leading-relaxed text-gray-500">
            Your email address has been successfully verified.
            You can now sign in to your account and start using Camagru.
          </p>
        </div>

        <button
          type="button"
          data-target="login"
          class="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Go to sign in
        </button>

      </div>
    `;
}

