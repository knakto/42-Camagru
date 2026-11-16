const variants = {
    info: "border-blue-200 bg-blue-50 text-blue-800",
    success: "border-green-200 bg-green-50 text-green-800",
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    error: "border-red-200 bg-red-50 text-red-800",
};

/**
 * @param {object} options
 * @param {string} options.message
 * @param {"info"|"success"|"warning"|"error"} [options.variant="info"]
 * @param {string} [options.className=""]
 */
export default function Alert({
    message = "",
    variant = "info",
    className = "",
} = {}) {
    const alert = document.createElement("div");

    alert.setAttribute("role", variant === "error" ? "alert" : "status");
    alert.className = `rounded-lg border px-4 py-3 text-sm ${variants[variant] ?? variants.info} ${className}`;
    alert.textContent = message;

    return alert;
}
