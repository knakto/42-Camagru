/**
 * @param {object} options
 * @param {string} [options.type="text"]
 * @param {string} [options.id]
 * @param {string} [options.name]
 * @param {string} [options.value]
 * @param {string} [options.placeholder]
 * @param {string} [options.autocomplete]
 * @param {boolean} [options.required=false]
 * @param {boolean} [options.disabled=false]
 * @param {string} [options.className=""]
 * @param {(event: Event) => void} [options.onInput]
 * @param {(event: Event) => void} [options.onChange]
 */
export default function Input({
    type = "text",
    id,
    name,
    value = "",
    placeholder = "",
    autocomplete,
    required = false,
    disabled = false,
    className = "",
    onInput,
    onChange,
} = {}) {
    const input = document.createElement("input");

    input.type = type;
    input.value = value;
    input.placeholder = placeholder;
    input.required = required;
    input.disabled = disabled;

    if (id) input.id = id;
    if (name) input.name = name;
    if (autocomplete) input.autocomplete = autocomplete;

    input.className = `
        w-full rounded-lg border border-gray-300 bg-white px-4 py-3
        text-sm text-gray-900 outline-none transition
        placeholder:text-gray-400
        focus:border-blue-500 focus:ring-2 focus:ring-blue-100
        disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60
        ${className}
    `;

    if (onInput) input.addEventListener("input", onInput);
    if (onChange) input.addEventListener("change", onChange);

    return input;
}
