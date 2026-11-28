export default function ResetPasswordSuccess() {
    return `
      <div id="reset-success" class="flex w-full flex-col items-center gap-5 px-6 py-8 font-sans text-center">

        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-green-600"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5 12.5l4.5 4.5L19 7"/>
          </svg>
        </div>

        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            Password reset successful
          </h2>

          <p class="mt-2 text-sm font-normal leading-relaxed text-gray-500">
            Your password has been successfully updated.
            You can now sign in using your new password.
          </p>
        </div>

        <div class="w-full rounded-xl border border-green-100 bg-green-50 p-4 text-left">
          <p class="text-sm font-medium text-green-800">
            You're all set!
          </p>
          <p class="mt-1 text-xs leading-relaxed text-green-600">
            Your account is secure with your new password.
          </p>
        </div>

        <button
          type="button"
          data-target="login"
          class="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Back to sign in
        </button>

      </div>
    `;
}

