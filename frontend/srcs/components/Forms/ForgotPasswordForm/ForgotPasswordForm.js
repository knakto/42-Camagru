export function ForgotPasswordForm() {
    const form = document.createElement("form");

    form.id = "forgot-password-form";
    form.action = "/api";
    form.method = "post";

    form.className = `
        flex w-full max-w-md flex-col gap-5
        rounded-2xl bg-white p-8
    `;

    form.innerHTML = `
        <div class="mb-2 text-center">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                Forgot password?
            </h2>

            <p class="mt-2 text-sm text-gray-500">
                No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-2">
            <label for="reset-email" class="text-sm font-medium text-gray-700">
                Email address
            </label>

            <input
                type="email"
                id="reset-email"
                name="email"
                placeholder="example@gmail.com"
                autocomplete="email"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
        </div>

        <!-- Submit -->
        <button
            type="submit"
            class="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
            Send reset link
        </button>

        <!-- Back to Login -->
        <p class="text-center text-sm text-gray-500">
            Remember your password?

            <button
                type="button"
                data-auth-view="login"
                class="font-semibold text-blue-600 hover:text-blue-700"
            >
                Sign in
            </button>
        </p>
    `;

    return form;
}

export default ForgotPasswordForm;
