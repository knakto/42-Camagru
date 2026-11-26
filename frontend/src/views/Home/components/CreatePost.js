
export function CreatePost() {
  return `
    <section class="w-full min-h-full bg-gray-50 p-4 sm:p-6 xl:p-8">
      <div class="mx-auto max-w-7xl">

        <!-- Page Header -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">
            Create a post
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Capture a moment and make it yours with an overlay.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">

          <!-- Main Editor -->
          <section class="min-w-0 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">

            <!-- Source Selector -->
            <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 class="text-base font-semibold text-gray-900">
                  Image editor
                </h2>
                <p class="mt-1 text-xs text-gray-500">
                  Choose your image source
                </p>
              </div>

              <div class="flex rounded-xl bg-gray-100 p-1">
                <button
                  type="button"
                  class="create-post-source-btn rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition"
                  data-source="camera"
                >
                  Webcam
                </button>

                <button
                  type="button"
                  class="create-post-source-btn rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition"
                  data-source="upload"
                >
                  Upload
                </button>
              </div>
            </div>

            <!-- Preview Stage -->
            <div class="create-post-preview-stage relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-gray-950 sm:min-h-[420px]">

              <!-- Webcam -->
              <video
                class="create-post-video hidden h-full max-h-[520px] w-full object-contain"
                autoplay
                muted
                playsinline
              ></video>

              <!-- Uploaded Image -->
              <img
                class="create-post-image-preview hidden max-h-[520px] w-full object-contain"
                alt="Selected image preview"
              />

              <!-- Draggable Overlay -->
              <img
                class="create-post-overlay-preview pointer-events-auto absolute left-1/2 top-1/2 z-10 hidden w-[28%] -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none select-none active:cursor-grabbing"
                alt="Selected overlay preview"
                draggable="false"
              />

              <!-- Empty State -->
              <div class="create-post-preview-placeholder flex flex-col items-center px-6 py-12 text-center">
                <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 4h-4l-2 3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/>
                    <circle cx="12" cy="13" r="3"/>
                  </svg>
                </div>

                <p class="text-sm font-medium text-white">
                  Your preview will appear here
                </p>

                <p class="mt-1 text-xs text-gray-400">
                  Start your webcam or upload an image
                </p>
              </div>

              <!-- Preview Status -->
              <div class="create-post-preview-status absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs text-white">
                Waiting for image
              </div>

            </div>

            <!-- Upload Image -->
            <div class="create-post-upload-panel mt-4 hidden">

              <label class="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50/50">

                <svg xmlns="http://www.w3.org/2000/svg" class="mb-3 text-gray-400" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <path d="m17 8-5-5-5 5"/>
                  <path d="M12 3v12"/>
                </svg>

                <span class="text-sm font-semibold text-gray-700">
                  Click to upload an image
                </span>

                <span class="mt-1 text-xs text-gray-400">
                  Select an image from your device
                </span>

                <input
                  class="create-post-file-input hidden"
                  type="file"
                  accept="image/*"
                />

              </label>

              <!-- Clear Image -->
              <button
                type="button"
                class="create-post-clear-image mt-3 hidden w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Clear image
              </button>

            </div>

            <!-- Overlay Selector -->
            <div class="mt-7">

              <div class="mb-4 flex flex-wrap items-center justify-between gap-3">

                <div>
                  <h3 class="text-sm font-semibold text-gray-900">
                    Choose an overlay
                  </h3>

                  <p class="mt-1 text-xs text-gray-500">
                    Add a PNG overlay and drag it onto your picture
                  </p>
                </div>

                <!-- Add Overlay -->
                <label class="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">

                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>

                  Add overlay

                  <input
                    type="file"
                    class="create-post-overlay-input hidden"
                    accept="image/png"
                    multiple
                  />

                </label>

              </div>

              <!-- Overlay List -->
              <div class="create-post-overlay-list grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">

                <div class="col-span-full rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center">

                  <p class="text-sm font-medium text-gray-500">
                    No overlays added
                  </p>

                  <p class="mt-1 text-xs text-gray-400">
                    Upload a transparent PNG to get started
                  </p>

                </div>

              </div>

              <p class="create-post-overlay-status mt-3 text-xs font-medium text-gray-400">
                No overlay selected
              </p>

            </div>

            <!-- Capture Action -->
            <div class="mt-7 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

              <p class="text-xs leading-relaxed text-gray-400">
                Select an overlay before capturing your picture.
              </p>

              <button
                type="button"
                class="create-post-capture-btn flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                disabled
              >

                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 4h-4l-2 3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/>
                  <circle cx="12" cy="13" r="3"/>
                </svg>

                Capture picture

              </button>

            </div>

          </section>

          <!-- Previous Pictures -->
          <aside class="h-fit rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">

            <div class="mb-5 flex items-center justify-between">

              <div>
                <h2 class="text-base font-semibold text-gray-900">
                  My pictures
                </h2>

                <p class="mt-1 text-xs text-gray-500">
                  Your previous creations
                </p>
              </div>

              <span class="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500">
                3
              </span>

            </div>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-1">

              <!-- Picture 1 -->
              <div class="create-post-history-item group relative overflow-hidden rounded-xl border border-gray-200">

                <div class="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-orange-100 via-rose-100 to-purple-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="25" r="13" fill="#F1B99A"/>
                    <path d="M19 24C19 7 45 7 45 24C39 17 27 16 19 24Z" fill="#713F12"/>
                    <path d="M10 61C12 42 22 38 32 38C42 38 52 42 54 61" fill="#64748B"/>
                    <path d="M21 15L32 5L43 15" stroke="#EAB308" stroke-width="5" stroke-linecap="round"/>
                  </svg>
                </div>

                <div class="flex items-center justify-between px-3 py-2.5">
                  <span class="text-xs font-medium text-gray-600">
                    My picture
                  </span>

                  <button type="button" class="create-post-delete-btn rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500" aria-label="Delete picture">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M8 6V4h8v2"/>
                      <path d="m19 6-1 14H6L5 6"/>
                      <path d="M10 11v5M14 11v5"/>
                    </svg>
                  </button>
                </div>

              </div>

              <!-- Picture 2 -->
              <div class="create-post-history-item group relative overflow-hidden rounded-xl border border-gray-200">

                <div class="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-indigo-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="25" r="13" fill="#D9A17F"/>
                    <path d="M19 25C18 9 44 5 46 24C39 17 27 17 19 25Z" fill="#292524"/>
                    <path d="M10 61C12 42 22 38 32 38C42 38 52 42 54 61" fill="#3B82F6"/>
                    <path d="M18 26H46" stroke="#1E293B" stroke-width="3"/>
                    <circle cx="24" cy="27" r="5" stroke="#1E293B" stroke-width="2.5"/>
                    <circle cx="40" cy="27" r="5" stroke="#1E293B" stroke-width="2.5"/>
                  </svg>
                </div>

                <div class="flex items-center justify-between px-3 py-2.5">
                  <span class="text-xs font-medium text-gray-600">
                    My picture
                  </span>

                  <button type="button" class="create-post-delete-btn rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500" aria-label="Delete picture">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M8 6V4h8v2"/>
                      <path d="m19 6-1 14H6L5 6"/>
                      <path d="M10 11v5M14 11v5"/>
                    </svg>
                  </button>
                </div>

              </div>

              <!-- Picture 3 -->
              <div class="create-post-history-item group relative overflow-hidden rounded-xl border border-gray-200">

                <div class="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-emerald-100 via-teal-100 to-green-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="25" r="13" fill="#E8B99A"/>
                    <path d="M19 25C18 7 46 7 45 25C37 17 28 17 19 25Z" fill="#92400E"/>
                    <path d="M10 61C12 42 22 38 32 38C42 38 52 42 54 61" fill="#059669"/>
                    <path d="M23 29C26 32 38 32 41 29" stroke="#92400E" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>

                <div class="flex items-center justify-between px-3 py-2.5">
                  <span class="text-xs font-medium text-gray-600">
                    My picture
                  </span>

                  <button type="button" class="create-post-delete-btn rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500" aria-label="Delete picture">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M8 6V4h8v2"/>
                      <path d="m19 6-1 14H6L5 6"/>
                      <path d="M10 11v5M14 11v5"/>
                    </svg>
                  </button>
                </div>

              </div>

            </div>

            <p class="mt-4 text-center text-xs leading-relaxed text-gray-400">
              Only you can manage and delete your pictures.
            </p>

          </aside>

        </div>
      </div>
    </section>
  `;
}


export function CreatePostEventBinding() {
  const root = document.querySelector("#content");
  if (!root) return;

  const sourceButtons = root.querySelectorAll(".create-post-source-btn");

  const stage = root.querySelector(".create-post-preview-stage");
  const video = root.querySelector(".create-post-video");
  const imagePreview = root.querySelector(".create-post-image-preview");
  const overlayPreview = root.querySelector(".create-post-overlay-preview");

  const placeholder = root.querySelector(".create-post-preview-placeholder");
  const previewStatus = root.querySelector(".create-post-preview-status");

  const uploadPanel = root.querySelector(".create-post-upload-panel");
  const fileInput = root.querySelector(".create-post-file-input");
  const clearImageButton = root.querySelector(".create-post-clear-image");

  const overlayInput = root.querySelector(".create-post-overlay-input");
  const overlayList = root.querySelector(".create-post-overlay-list");
  const overlayStatus = root.querySelector(".create-post-overlay-status");

  const captureButton = root.querySelector(".create-post-capture-btn");

  let activeSource = "camera";
  let cameraStream = null;

  let uploadedFile = null;
  let uploadedImageUrl = null;

  let overlays = [];
  let selectedOverlay = null;

  let overlayPosition = {
    x: 0.5,
    y: 0.5
  };

  let isDragging = false;
  let dragPointerId = null;

  // -------------------------
  // Camera
  // -------------------------

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      cameraStream = null;
    }

    video.srcObject = null;
  };

  const startCamera = async () => {
    stopCamera();

    imagePreview.classList.add("hidden");
    overlayPreview.classList.add("hidden");
    placeholder.classList.add("hidden");
    video.classList.remove("hidden");

    uploadPanel.classList.add("hidden");
    clearImageButton.classList.add("hidden");

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Webcam is not supported.");
      }

      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      video.srcObject = cameraStream;

      previewStatus.textContent = "Webcam active";
    } catch (error) {
      video.classList.add("hidden");
      placeholder.classList.remove("hidden");

      previewStatus.textContent = "Unable to access webcam";

      console.error("Webcam error:", error);
    }
  };

  // -------------------------
  // Image source
  // -------------------------

  const clearUploadedImage = () => {
    uploadedFile = null;

    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
      uploadedImageUrl = null;
    }

    imagePreview.removeAttribute("src");
    imagePreview.classList.add("hidden");

    overlayPreview.classList.add("hidden");

    fileInput.value = "";
    clearImageButton.classList.add("hidden");

    placeholder.classList.remove("hidden");

    previewStatus.textContent = "Waiting for image";

    updateCaptureState();
  };

  const switchSource = source => {
    activeSource = source;

    sourceButtons.forEach(button => {
      const active = button.dataset.source === source;

      button.classList.toggle("bg-white", active);
      button.classList.toggle("text-gray-900", active);
      button.classList.toggle("shadow-sm", active);

      button.classList.toggle("text-gray-500", !active);
    });

    if (source === "camera") {
      if (uploadedImageUrl) {
        clearUploadedImage();
      }

      startCamera();
      return;
    }

    stopCamera();

    video.classList.add("hidden");
    imagePreview.classList.add("hidden");
    overlayPreview.classList.add("hidden");

    placeholder.classList.remove("hidden");

    uploadPanel.classList.remove("hidden");

    previewStatus.textContent = "Waiting for image";

    updateCaptureState();
  };

  sourceButtons.forEach(button => {
    button.addEventListener("click", () => {
      switchSource(button.dataset.source);
    });
  });

  // -------------------------
  // Upload image
  // -------------------------

  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      previewStatus.textContent = "Please select an image";
      fileInput.value = "";
      return;
    }

    clearUploadedImage();

    uploadedFile = file;
    uploadedImageUrl = URL.createObjectURL(file);

    imagePreview.src = uploadedImageUrl;

    imagePreview.classList.remove("hidden");
    video.classList.add("hidden");
    placeholder.classList.add("hidden");

    clearImageButton.classList.remove("hidden");

    previewStatus.textContent = file.name;

    updateCaptureState();
  });

  clearImageButton.addEventListener("click", () => {
    clearUploadedImage();
  });

  // -------------------------
  // Overlay management
  // -------------------------

  const updateCaptureState = () => {
    const hasImage =
      activeSource === "camera"
        ? !!cameraStream
        : !!uploadedFile;

    captureButton.disabled = !hasImage || !selectedOverlay;
  };

  const updateOverlayPosition = () => {
    overlayPreview.style.left = `${overlayPosition.x * 100}%`;
    overlayPreview.style.top = `${overlayPosition.y * 100}%`;
  };

  const updateOverlaySelection = () => {
    const hasSelection = !!selectedOverlay;

    overlayPreview.classList.toggle("hidden", !hasSelection);

    if (selectedOverlay) {
      overlayPreview.src = selectedOverlay.url;
      updateOverlayPosition();

      overlayStatus.textContent = `Selected: ${selectedOverlay.file.name}`;
      overlayStatus.classList.remove("text-gray-400");
      overlayStatus.classList.add("text-blue-600");
    } else {
      overlayPreview.removeAttribute("src");

      overlayStatus.textContent = "No overlay selected";
      overlayStatus.classList.remove("text-blue-600");
      overlayStatus.classList.add("text-gray-400");
    }

    updateCaptureState();
  };

  const selectOverlay = overlay => {
    selectedOverlay = overlay;

    overlayPosition = {
      x: 0.5,
      y: 0.5
    };

    renderOverlayList();
    updateOverlaySelection();
  };

  const removeOverlay = overlayId => {
    const index = overlays.findIndex(item => item.id === overlayId);

    if (index === -1) return;

    const [removed] = overlays.splice(index, 1);

    URL.revokeObjectURL(removed.url);

    if (selectedOverlay?.id === overlayId) {
      selectedOverlay = null;
      overlayPreview.classList.add("hidden");
    }

    renderOverlayList();
    updateOverlaySelection();
  };

  const renderOverlayList = () => {
    overlayList.innerHTML = "";

    if (overlays.length === 0) {
      overlayList.innerHTML = `
        <div class="col-span-full rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center">
          <p class="text-sm font-medium text-gray-500">
            No overlays added
          </p>
          <p class="mt-1 text-xs text-gray-400">
            Upload a transparent PNG to get started
          </p>
        </div>
      `;
      return;
    }

    overlays.forEach(overlay => {
      const selected = selectedOverlay?.id === overlay.id;

      const item = document.createElement("div");

      item.className = `
        relative overflow-hidden rounded-xl border-2 transition
        ${selected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-gray-50 hover:border-blue-300"
        }
      `;

      const selectButton = document.createElement("button");

      selectButton.type = "button";
      selectButton.className = "flex aspect-square w-full flex-col items-center justify-center gap-2 p-3";
      selectButton.title = overlay.file.name;

      const preview = document.createElement("img");

      preview.src = overlay.url;
      preview.alt = overlay.file.name;
      preview.className = "h-16 w-full object-contain";

      const name = document.createElement("span");

      name.className = "w-full truncate text-center text-[10px] font-medium text-gray-600";
      name.textContent = overlay.file.name;

      selectButton.append(preview, name);

      selectButton.addEventListener("click", () => {
        selectOverlay(overlay);
      });

      const deleteButton = document.createElement("button");

      deleteButton.type = "button";
      deleteButton.className = "absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-lg bg-white text-gray-400 shadow-sm transition hover:bg-red-50 hover:text-red-500";
      deleteButton.setAttribute("aria-label", "Remove overlay");

      deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"/>
          <path d="M8 6V4h8v2"/>
          <path d="m19 6-1 14H6L5 6"/>
          <path d="M10 11v5M14 11v5"/>
        </svg>
      `;

      deleteButton.addEventListener("click", () => {
        removeOverlay(overlay.id);
      });

      item.append(selectButton, deleteButton);
      overlayList.appendChild(item);
    });
  };

  // -------------------------
  // Add PNG overlays
  // -------------------------

  overlayInput.addEventListener("change", () => {
    const files = Array.from(overlayInput.files || []);

    files.forEach(file => {
      if (file.type !== "image/png") return;

      const overlay = {
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file)
      };

      overlays.push(overlay);
    });

    renderOverlayList();

    overlayInput.value = "";
  });

  // -------------------------
  // Drag overlay on preview
  // -------------------------

  const moveOverlay = event => {
    if (!isDragging || event.pointerId !== dragPointerId) return;

    const rect = stage.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    overlayPosition = {
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y))
    };

    updateOverlayPosition();
  };

  overlayPreview.addEventListener("pointerdown", event => {
    if (!selectedOverlay) return;

    event.preventDefault();

    isDragging = true;
    dragPointerId = event.pointerId;

    overlayPreview.setPointerCapture(event.pointerId);
    overlayPreview.classList.remove("cursor-grab");
    overlayPreview.classList.add("cursor-grabbing");
  });

  overlayPreview.addEventListener("pointermove", moveOverlay);

  const stopDragging = event => {
    if (event.pointerId !== dragPointerId) return;

    isDragging = false;
    dragPointerId = null;

    overlayPreview.classList.remove("cursor-grabbing");
    overlayPreview.classList.add("cursor-grab");
  };

  overlayPreview.addEventListener("pointerup", stopDragging);
  overlayPreview.addEventListener("pointercancel", stopDragging);

  // -------------------------
  // Capture
  // -------------------------

  captureButton.addEventListener("click", () => {
    if (!selectedOverlay) return;

    const hasImage =
      activeSource === "camera"
        ? !!cameraStream
        : !!uploadedFile;

    if (!hasImage) return;

    root.dispatchEvent(new CustomEvent("camagru:capture", {
      bubbles: true,
      detail: {
        source: activeSource,

        file: uploadedFile,

        video: activeSource === "camera"
          ? video
          : null,

        overlay: selectedOverlay.file,

        position: {
          x: overlayPosition.x,
          y: overlayPosition.y
        }
      }
    }));
  });

  // -------------------------
  // Previous pictures
  // -------------------------

  root.querySelectorAll(".create-post-delete-btn").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".create-post-history-item");

      root.dispatchEvent(new CustomEvent("camagru:delete-image", {
        bubbles: true,
        detail: { item }
      }));
    });
  });

  // -------------------------
  // Initialize
  // -------------------------

  renderOverlayList();
  startCamera();

  // Cleanup when leaving this page
  return () => {
    stopCamera();

    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }

    overlays.forEach(overlay => {
      URL.revokeObjectURL(overlay.url);
    });
  };
}
