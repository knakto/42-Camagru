export default function EmailVerificationExpired() {
    return `
      <div class="flex w-full max-w-md flex-col items-center gap-5 rounded-2xl bg-white p-8 font-sans text-center">

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
            Verification link expired
          </h2>

          <p class="mt-2 text-sm font-normal leading-relaxed text-gray-500">
            This email verification link has expired.
            Please request a new verification link to verify your email address.
          </p>
        </div>

        <div class="w-full rounded-xl border border-amber-100 bg-amber-50 p-4 text-left">
          <p class="text-sm font-medium text-amber-800">
            Link no longer valid
          </p>
          <p class="mt-1 text-xs leading-relaxed text-amber-700">
            For security reasons, verification links are only valid for a limited time.
          </p>
        </div>

        <button
          type="button"
          class="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Request new verification link
        </button>

        <p class="text-xs font-normal text-gray-400">
          Already verified your email? You can sign in to your account.
        </p>

      </div>
    `;
}

