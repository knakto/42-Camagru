export default function SignupForm() {
    const form = document.createElement("form");

    form.id = "signup-form";
    form.action = "/api/v1/register";
    form.method = "post";

    form.className = `
        flex w-full max-w-md flex-col gap-5
        rounded-2xl bg-white p-8
    `;

    form.innerHTML = `
        <div class="mb-2 text-center">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                Create an account
            </h2>
            <p class="mt-2 text-sm text-gray-500">
                Join us and get started today
            </p>
        </div>

        <!-- Username -->
        <div class="flex flex-col gap-2">
            <label for="username" class="text-sm font-medium text-gray-700">
                Username
            </label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                autocomplete="username"
                minlength="3"
                maxlength="30"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition
                placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
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
                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition
                placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
        </div>

        <!-- Password -->
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
                minlength="8"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition
                placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
            <p class="text-xs text-gray-400">
                Use at least 8 characters.
            </p>
        </div>

        <div class="flex flex-col gap-2">
            <label for="confirm-password" class="text-sm font-medium text-gray-700">
                Confirm password
            </label>
            <input
                type="password"
                id="confirm-password"
                name="confirm_password"
                placeholder="Confirm your password"
                autocomplete="new-password"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition
                placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
        </div>

        <button
            type="submit"
            class="w-full rounded-lg bg-blue-600 px-4 mt-5 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
            Create account
        </button>

        <p class="text-center text-sm text-gray-500">
            Already have an account?
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
