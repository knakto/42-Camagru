export default function ResetExpired() {
    return `
      <div id="reset-expired" class="flex w-full flex-col items-center gap-5 px-6 py-8 font-sans text-center">

        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-amber-600"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="9"/>
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 7v5l3 2"/>
          </svg>
        </div>

        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            Reset link expired
          </h2>

          <p class="mt-2 text-sm font-normal leading-relaxed text-gray-500">
            This password reset link has expired and can no longer be used.
            Please request a new link to reset your password.
          </p>
        </div>

        <div class="w-full rounded-xl border border-amber-100 bg-amber-50 p-4 text-left">
          <p class="text-sm font-medium text-amber-800">
            Link no longer valid
          </p>
          <p class="mt-1 text-xs leading-relaxed text-amber-600">
            For security reasons, password reset links are only valid for a limited time.
          </p>
        </div>

        <button
          type="button"
          data-target="login"
          class="text-sm font-semibold text-gray-500 transition hover:text-gray-700"
        >
          Back to sign in
        </button>

      </div>
    `;
}

