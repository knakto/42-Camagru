export default function EmailVerificationRequired() {
    return `
      <div id="email-required" class="flex w-full max-w-md flex-col items-center gap-5 rounded-2xl bg-white p-8 font-sans text-center">

        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-blue-600"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m3 7 9 6 9-6"/>
          </svg>
        </div>

        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            Verify your email
          </h2>

          <p class="mt-2 text-sm font-normal leading-relaxed text-gray-500">
            Please verify your email address before continuing.
            You won't be able to access Camagru until your email has been verified.
          </p>
        </div>

        <div class="w-full rounded-xl border border-blue-100 bg-blue-50 p-4 text-left">
          <p class="text-sm font-medium text-blue-800">
            Check your inbox
          </p>
          <p class="mt-1 text-xs leading-relaxed text-blue-600">
            We've sent you a verification link. Please check your inbox and spam folder.
          </p>
        </div>

        <button
          type="button"
          id="reverify"
          data-target="resend"
          class="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Click to send verification
        </button>
        <p
            id="reverify-error"
            class="hidden text-xs text-red-500"
            aria-live="polite"
        ></p>

        <p class="text-xs font-normal text-gray-400">
          Didn't receive the email? You can request a new verification link.
        </p>

        <button
          type="button"
          data-target="login"
          class="flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-blue-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15 19l-7-7 7-7M8 12h13"/>
          </svg>
          Back to sign in
        </button>


      </div>
    `;
}

