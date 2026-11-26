export default function PreferencesSidebar() {
  const content = `
    <aside class="w-full h-full bg-white p-4 font-sans">
      <div class="mb-6 px-3">
        <h2 class="text-lg font-bold tracking-tight text-gray-900">
          Preferences
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          Manage your settings
        </p>
      </div>

      <nav class="flex flex-col gap-1">

        <a href="#account"
          class="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600">
          Account
        </a>

        <a href="#security"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900">
          Security
        </a>

        <a href="#appearance"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900">
          Appearance
        </a>

        <a href="#notifications"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900">
          Notifications
        </a>

      </nav>
    </aside>
  `;

  return content;
}
