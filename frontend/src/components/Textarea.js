/**
 * @param {object} options
 * @param {string} [options.id]
 * @param {string} [options.name]
 * @param {string} [options.value]
 * @param {string} [options.placeholder]
 * @param {number} [options.rows=4]
 * @param {number} [options.maxLength]
 * @param {boolean} [options.required=false]
 * @param {boolean} [options.disabled=false]
 * @param {string} [options.className=""]
 * @param {(event: Event) => void} [options.onInput]
 */
export default function Textarea({
    id,
    name,
    value = "",
    placeholder = "",
    rows = 4,
    maxLength,
    required = false,
    disabled = false,
    className = "",
    onInput,
} = {}) {
    const textarea = document.createElement("textarea");

    textarea.value = value;
    textarea.placeholder = placeholder;
    textarea.rows = rows;
    textarea.required = required;
    textarea.disabled = disabled;

    if (id) textarea.id = id;
    if (name) textarea.name = name;
    if (maxLength !== undefined) textarea.maxLength = maxLength;

    textarea.className = `
        w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3
        text-sm text-gray-900 outline-none transition
        placeholder:text-gray-400
        focus:border-blue-500 focus:ring-2 focus:ring-blue-100
        disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60
        ${className}
    `;

    if (onInput) textarea.addEventListener("input", onInput);

    return textarea;
}
