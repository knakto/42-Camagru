/**
 * Append one or more children without parsing strings as HTML.
 * Strings become text nodes; DOM Nodes are appended directly.
 */
export function appendChildren(parent, children = []) {
    const items = Array.isArray(children) ? children : [children];

    for (const child of items) {
        if (child === null || child === undefined || child === false) {
            continue;
        }

        if (child instanceof Node) {
            parent.appendChild(child);
        } else {
            parent.appendChild(document.createTextNode(String(child)));
        }
    }

    return parent;
}

export function applyAttributes(element, attributes = {}) {
    for (const [name, value] of Object.entries(attributes)) {
        if (value === undefined || value === null || name === "className") {
            continue;
        }

        if (name === "dataset" && typeof value === "object") {
            Object.assign(element.dataset, value);
        } else if (name.startsWith("on") && typeof value === "function") {
            element.addEventListener(name.slice(2).toLowerCase(), value);
        } else if (name in element) {
            element[name] = value;
        } else {
            element.setAttribute(name, String(value));
        }
    }

    return element;
}
