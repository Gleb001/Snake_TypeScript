// import ====================================================== //
import {
    createHTMLElementType,
    createElementType,
    setAttributesType,
    setChildrenType
} from "./types";

// additional functions ======================================== //
let setChildren: setChildrenType = (
    element, ...children
) => {
    for (let child of children) {
        if (typeof child === "string") {
            element.innerText += child;
        } else if (Array.isArray(child)) {
            element.append(...child);
        } else {
            element.appendChild(child);
        }
    }
    return element
};
let setAttributes: setAttributesType = (
    element, attributes
) => {
    for (let name_attr in attributes) {
        let value_attribute = attributes[name_attr];
        if (typeof value_attribute === "function") {
            element[name_attr as keyof EventTarget] = value_attribute;
        } else {
            element.setAttribute(name_attr, value_attribute);
        }
    }
    return element;
};
let createElement: createElementType = (
    tag, attributes, ...children
) => {
    let element = document.createElement(tag);
    setAttributes(element, attributes);
    setChildren(element, ...children);
    return element;
};

// main ======================================================== //
let createHTMLElement: createHTMLElementType = (
    tag, attributes, ...children
) => {
    let element;
    switch (typeof tag) {
        case "object":
            tag.HTML.innerHTML = "";
            tag.render(attributes ?? {}, children);
            element = tag.HTML;
            break;
        case "function":
            element = tag(attributes ?? {}, children);
            break;
        case "string":
            element = createElement(tag, attributes, ...children);
            break;
    }
    return element;
}

// export ===================================================== //
export default createHTMLElement;