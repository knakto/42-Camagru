export default function ResetPasswordForm() {
    return `
      <form id="reset-password-form" class="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-8 font-sans">

        <div class="mb-2 text-center">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                Reset your password
            </h2>

            <p class="mt-2 text-sm font-normal leading-relaxed text-gray-500">
                Create a new password for your account. Make sure it's secure and easy to remember.
            </p>
        </div>

        <div class="flex flex-col gap-2">
            <label for="new-password" class="text-sm font-medium text-gray-700">
                New password
            </label>

            <input
                type="password"
                id="new-password"
                name="new_password"
                placeholder="Enter your new password"
                autocomplete="new-password"
                minlength="8"
                required
                class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >

            <p class="text-xs font-normal text-gray-400">
                Use at least 8 characters.
            </p>
        </div>

        <div class="flex flex-col gap-2">
            <label for="confirm-password" class="text-sm font-medium text-gray-700">
                Confirm new password
            </label>

            <input
                type="password"
                id="confirm-password"
                name="confirm_password"
                placeholder="Confirm your new password"
                autocomplete="new-password"
                required
                class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
            <p
                id="password-error"
                class="hidden text-xs text-red-500"
                aria-live="polite"
            ></p>
        </div>

        <button
            type="submit"
            class="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
            Reset password
        </button>

        <p class="text-center text-sm font-normal text-gray-500">
            Remember your password?

            <button
                type="button"
                data-target="login"
                class="font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
                Sign in
            </button>
        </p>

      </form>
    `;
}

