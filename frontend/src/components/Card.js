import { appendChildren } from "./dom.js";

/**
 * @param {object} options
 * @param {string|Node|Node[]} [options.children]
 * @param {string} [options.className]
 * @param {string} [options.as="section"] HTML element name
 */
export default function Card({
    children = [],
    className = "",
    as = "section",
} = {}) {
    const card = document.createElement(as);

    card.className = `rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`;
    appendChildren(card, children);

    return card;
}
