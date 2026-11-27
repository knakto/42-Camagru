export default function SignupForm() {
    return `
    <form id="signup-form" class="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-8 font-sans">

        <div class="mb-2 text-center">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                Create an account
            </h2>
            <p class="mt-2 text-sm font-normal leading-relaxed text-gray-500">
                Join us and get started today
            </p>
        </div>

        <div class="flex flex-col gap-2">
            <label for="username" class="text-sm font-medium text-gray-700">
                Username
            </label>
            <input
                type="text"
                id="signup-username"
                name="username"
                placeholder="Choose a username"
                autocomplete="username"
                minlength="3"
                maxlength="30"
                required
                class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
            <p
                id="signup-username-error"
                class="hidden text-xs text-red-500"
                aria-live="polite"
            ></p>
        </div>

        <div class="flex flex-col gap-2">
            <label for="signup-email" class="text-sm font-medium text-gray-700">
                Email address
            </label>
            <input
                type="email"
                id="signup-email"
                name="email"
                placeholder="example@gmail.com"
                autocomplete="email"
                required
                class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
            <p
                id="signup-email-error"
                class="hidden text-xs text-red-500"
                aria-live="polite"
            ></p>
        </div>

        <div class="flex flex-col gap-2">
            <label for="signup-password" class="text-sm font-medium text-gray-700">
                Password
            </label>
            <input
                type="password"
                id="signup-password"
                name="password"
                placeholder="Create a password"
                autocomplete="new-password"
                required
                class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
            <p class="text-xs font-normal text-gray-400">
                Use at least 8 characters.
            </p>
        </div>

        <div class="flex flex-col gap-2">
            <label for="confirm-password" class="text-sm font-medium text-gray-700">
                Confirm password
            </label>
            <input
                type="password"
                id="signup-confirm-password"
                name="confirm_password"
                placeholder="Confirm your password"
                autocomplete="new-password"
                required
                class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
            <p
                id="signup-password-error"
                class="hidden text-xs text-red-500"
                aria-live="polite"
            ></p>
        </div>

        <div class="flex flex-col justify-center items-center">
          <p
              id="signup-submit-error"
              class="hidden text-xs text-red-500"
              aria-live="polite"
          ></p>
          <button
              type="submit"
              class="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
              Create account
          </button>
        </div>

        <p class="text-center text-sm font-normal text-gray-500">
            Already have an account?
            <button
                type="button"
                data-auth-view="login"
                class="font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
                Sign in
            </button>
        </p>

    </form>
    `;
}

