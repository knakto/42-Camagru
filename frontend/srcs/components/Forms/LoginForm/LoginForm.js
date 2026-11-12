export function LoginForm() {
    const form = document.createElement("form");

    form.id = "login-form";
    form.action = "/api/login-user";
    form.method = "post";


    form.className = "flex w-full max-w-md flex-col gap-5 rounded-2xl bg-white p-8";

    form.innerHTML = `
                <div class="mb-2 text-center">
                  <h2 class="text-2xl font-bold tracking-tight text-gray-900">Welcome back</h2>
                  <p class="mt-2 text-sm text-gray-500">Sign in to your account</p>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="email" class="text-sm font-medium text-gray-700">Email address</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@gmail.com"
                      autocomplete="email"
                      required
                      class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                </div>

                <div class="flex flex-col gap-2">
                  <div class="flex items-center justify-between">
                    <label for="password" class="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <button
                        type="button"
                        data-auth-view="forgot"
                        class="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        Forgot password?
                    </button>
                  </div>

                  <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      autocomplete="current-password"
                      required
                      class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                </div>

                <label class="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                  <input
                      type="checkbox"
                      name="remember"
                      class="size-4 rounded border-gray-300 accent-blue-600"
                      >
                      Remember me
                </label>

                <button
                    type="submit"
                    class="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                    Sign in
                </button>

                <p class="text-center text-sm text-gray-500">
                  Don't have an account?
                  <button
                      type="button"
                      data-auth-view="signup"
                      class="font-semibold text-blue-600 hover:text-blue-700"
                  >
                      Sign up
                  </button>
                </p>
    `;

    return form;
}

export default LoginForm;
