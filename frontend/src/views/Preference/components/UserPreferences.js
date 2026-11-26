
export default function UserPreferences() {
  const content = `
    <section class="w-full min-h-full bg-gray-50 px-4 py-8 md:px-8 font-sans">
      <div class="mx-auto max-w-4xl">

        <div class="mb-8">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            Preferences
          </h1>
          <p class="mt-2 text-sm leading-relaxed text-gray-500">
            Manage your account settings and preferences.
          </p>
        </div>

        <div class="space-y-6">

          <!-- Account -->
          <section id="account" class="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6">
            <div class="mb-6">
              <h2 class="text-lg font-bold text-gray-900">Account</h2>
              <p class="mt-1 text-sm text-gray-500">
                Manage your personal account information.
              </p>
            </div>

            <div class="space-y-5">
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input type="email" value="user@example.com" readonly
                  class="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none" />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input type="text" value="knakto" readonly
                  class="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none" />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <input type="text" value="Kasichon"
                  placeholder="Enter your full name"
                  required
                  class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea rows="3"
                  placeholder="Tell people about yourself..."
                  class="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"></textarea>
              </div>
            </div>
          </section>

          <!-- Security -->
          <section id="security" class="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6">
            <div class="mb-6">
              <h2 class="text-lg font-bold text-gray-900">Security</h2>
              <p class="mt-1 text-sm text-gray-500">
                Keep your account secure.
              </p>
            </div>

            <div class="space-y-5">
              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Current password
                </label>
                <input type="password" placeholder="Enter current password"
                  class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  New password
                </label>
                <input type="password" placeholder="Enter new password"
                  class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-gray-700">
                  Confirm new password
                </label>
                <input type="password" placeholder="Confirm new password"
                  class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <button class="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]">
                Update password
              </button>
            </div>
          </section>

          <!-- Appearance -->
          <section id="appearance" class="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6">
            <div class="mb-6">
              <h2 class="text-lg font-bold text-gray-900">Appearance</h2>
              <p class="mt-1 text-sm text-gray-500">
                Customize how Camagru looks.
              </p>
            </div>

            <div>
              <label class="mb-3 block text-sm font-medium text-gray-700">
                Theme
              </label>

              <div class="grid grid-cols-2 gap-3">
                <div class="rounded-xl border-2 border-blue-500 bg-blue-50 p-4 text-center text-sm font-semibold text-blue-600">
                  Light
                </div>

                <div class="rounded-xl border border-gray-200 bg-white p-4 text-center text-sm font-medium text-gray-600">
                  Dark
                </div>
              </div>
            </div>
          </section>

          <!-- Notifications -->
          <section id="notifications" class="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6">
            <div class="mb-6">
              <h2 class="text-lg font-bold text-gray-900">Notifications</h2>
              <p class="mt-1 text-sm text-gray-500">
                Choose which email notifications you want to receive.
              </p>
            </div>

            <div class="flex items-center justify-between gap-6">
              <div>
                <p class="text-sm font-semibold text-gray-900">
                  Email notifications for likes
                </p>
                <p class="mt-1 text-sm leading-relaxed text-gray-500">
                  Receive an email whenever someone likes one of your posts.
                </p>
              </div>

              <div class="h-6 w-11 flex-shrink-0 rounded-full bg-blue-600 p-1">
                <div class="h-4 w-4 translate-x-5 rounded-full bg-white"></div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </section>
  `;

  return content;
}

