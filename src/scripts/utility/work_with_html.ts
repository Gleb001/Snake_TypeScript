
// main ======================================================== //

// create html element ----------------------------------------- //
function createElementHTML(
    tag_name: string,
    attributes?: { [name_sd: string]: string },
    ...children: (Node|string)[]
): HTMLElement {

    // PS: it is made so that the code editor (under VS code) 
    // displays auxiliary hints when accessing the variable
    // (or object property) to which the created element
    // will be assigned
    let html_element = document.createElement(tag_name);
    for (let name_attr in attributes) {
        html_element.setAttribute(
            name_attr, attributes[name_attr]
        );
    }
    children.forEach(child => { html_element.append(child); });

    return html_element;

}

// export ====================================================== //
export default createElementHTML;