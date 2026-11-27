export default function ForgotPasswordSuccess() {
    return `
      <div class="flex w-full max-w-md flex-col items-center gap-5 rounded-2xl bg-white p-8 font-sans text-center">

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
            Check your email
          </h2>

          <p class="mt-2 text-sm font-normal leading-relaxed text-gray-500">
            We've sent a password reset link to the email address associated with your account.
            Please check your inbox to continue.
          </p>
        </div>

        <div class="w-full rounded-xl border border-blue-100 bg-blue-50 p-4 text-left">
          <p class="text-sm font-medium text-blue-800">
            Check your inbox
          </p>
          <p class="mt-1 text-xs leading-relaxed text-blue-600">
            Follow the instructions in the email to reset your password.
            Don't forget to check your spam folder.
          </p>
        </div>

        <button
          type="button"
          data-target="login"
          class="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Back to sign in
        </button>

        <p class="text-xs font-normal text-gray-400">
          Didn't receive the email? Check your spam folder or try again.
        </p>

      </div>
    `;
}

