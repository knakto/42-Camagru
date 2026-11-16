
/**
 * Wrap a form control with its label, hint and validation message.
 * Pass the actual input/select/textarea element through `control`.
 */
export default function FormField({
    label,
    control,
    hint,
    error,
    className = "",
} = {}) {
    if (!(control instanceof HTMLElement)) {
        throw new TypeError("FormField requires a control HTMLElement.");
    }

    const wrapper = document.createElement("div");
    wrapper.className = `flex flex-col gap-2 ${className}`;

    if (label) {
        const labelElement = document.createElement("label");
        labelElement.className = "text-sm font-medium text-gray-700";
        labelElement.textContent = label;

        if (control.id) labelElement.htmlFor = control.id;
        wrapper.appendChild(labelElement);
    }

    wrapper.appendChild(control);

    if (hint) {
        const hintElement = document.createElement("p");
        hintElement.className = "text-xs text-gray-500";
        hintElement.textContent = hint;
        wrapper.appendChild(hintElement);
    }

    if (error) {
        const errorElement = document.createElement("p");
        errorElement.className = "text-xs text-red-600";
        errorElement.setAttribute("role", "alert");
        errorElement.textContent = error;
        wrapper.appendChild(errorElement);
    }

    return wrapper;
}
