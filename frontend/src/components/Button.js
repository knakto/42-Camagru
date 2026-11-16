const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400",
};

/**
 * @param {object} options
 * @param {string|Node} options.label Button content
 * @param {"button"|"submit"|"reset"} [options.type="button"]
 * @param {"primary"|"secondary"|"danger"|"ghost"} [options.variant="primary"]
 * @param {string} [options.className=""] Additional Tailwind classes
 * @param {boolean} [options.disabled=false]
 * @param {(event: MouseEvent) => void} [options.onClick]
 */
export default function Button({
    label = "Button",
    type = "button",
    variant = "primary",
    className = "",
    disabled = false,
    onClick,
} = {}) {
    const button = document.createElement("button");

    button.type = type;
    button.disabled = disabled;
    button.className = `
        inline-flex items-center justify-center rounded-lg px-4 py-3
        text-sm font-semibold transition
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        ${variants[variant] ?? variants.primary}
        ${className}
    `;

    if (label instanceof Node) {
        button.appendChild(label);
    } else {
        button.textContent = String(label);
    }

    if (onClick) {
        button.addEventListener("click", onClick);
    }

    return button;
}
