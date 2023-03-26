// typescript ================================================== //
declare global {
    namespace JSX {

        // main parts DOM element ------------------------------ //
        type Tags = keyof HTMLElementTagNameMap
        interface Props {
            [nameProp: string]: any | keyof GlobalEventHandlers
        }

        // special JS-DOM element ------------------------------ //
        function FunctionComponentHTML<Spec_props = {}>(
            props: Props | Spec_props,
            children: (Node | HTMLElement)[]
        ): HTMLElement
        interface ObjectComponentHTML<HTMLType = HTMLElement, Props = any> {
            HTML: HTMLType & HTMLElement,
            render: typeof JSX.FunctionComponentHTML<Props>,
        }

        // For JSX implementation ------------------------------ //
        type IntrinsicElements = {
            [Key: keyof HTMLElementTagNameMap | string]: {
                [Key: string]: any
            };
        }

    }
}

// main ======================================================== //
export default function createHTMLElement(
    tag: JSX.Tags | typeof JSX.FunctionComponentHTML | JSX.ObjectComponentHTML,
    attributes?: JSX.Props,
    ...children: (Node | HTMLElement)[]
) {

    let html_element;

    switch (typeof tag) {

        case "object":
            tag.HTML.innerHTML = "";
            html_element = tag.render(attributes ?? {}, children);
            break;

        case "function":
            html_element = tag(attributes ?? {}, children);
            break;

        case "string":
            html_element = document.createElement(tag);
            // set attributes
            for (let name_attr in attributes) {
                let value_attribute = attributes[name_attr];
                if (typeof value_attribute === "function") {
                    html_element[name_attr as keyof EventTarget] = value_attribute;
                } else {
                    html_element.setAttribute(name_attr, value_attribute);
                }
            }
            // add child elements
            for (let child of children) {
                if (typeof child === "string") {
                    html_element.innerText += child;
                } else if (Array.isArray(child)) {
                    html_element.append(...child);
                } else {
                    html_element.appendChild(child);
                }
            }
            break;

        default: break;

    }

    return html_element;

}