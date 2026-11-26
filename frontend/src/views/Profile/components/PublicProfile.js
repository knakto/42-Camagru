export default function PublicProfile() {
  const content = `
    <section class="w-full min-h-full bg-gray-50 px-4 py-8 md:px-8 font-sans">
      <div class="mx-auto max-w-5xl">

        <!-- Profile -->
        <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <!-- Cover -->
          <div class="h-36 md:h-52 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100"></div>

          <!-- Profile Information -->
          <div class="px-6 pb-6">
            <div class="relative -mt-12 mb-4">
              <img
                src="https://i.pravatar.cc/160?img=12"
                alt="Profile picture"
                class="h-24 w-24 rounded-full border-4 border-white bg-white object-cover md:h-28 md:w-28"
              />
            </div>

            <div>
              <h1 class="text-xl font-bold tracking-tight text-gray-900">
                Kasichon
              </h1>

              <p class="mt-1 text-sm text-gray-500">
                @knakto
              </p>
            </div>

            <div class="mt-5 flex items-center gap-2 text-sm text-gray-500">
              <span class="font-semibold text-gray-900">24</span>
              <span>Posts</span>
            </div>
          </div>
        </div>

        <!-- Posts -->
        <div class="mt-8">
          <h2 class="mb-5 text-lg font-bold tracking-tight text-gray-900">
            Posts
          </h2>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5">

            <!-- Post with caption -->
            <article class="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div class="aspect-square bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600"
                  alt="Post"
                  class="h-full w-full object-cover"
                />
              </div>
              <div class="p-3">
                <p class="text-sm leading-relaxed text-gray-700">
                  A beautiful day outside.
                </p>
              </div>
            </article>

            <!-- Post without caption -->
            <article class="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div class="aspect-square bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600"
                  alt="Post"
                  class="h-full w-full object-cover"
                />
              </div>
            </article>

            <!-- Post with caption -->
            <article class="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div class="aspect-square bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600"
                  alt="Post"
                  class="h-full w-full object-cover"
                />
              </div>
              <div class="p-3">
                <p class="text-sm leading-relaxed text-gray-700">
                  Somewhere by the sea.
                </p>
              </div>
            </article>

          </div>
        </div>

      </div>
    </section>
  `;

  return content;
}
