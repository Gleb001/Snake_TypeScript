function createElementHTML(tag_name, attributes, ...children) {
    let html_element = document.createElement(tag_name);
    for (let name_attr in attributes) {
        html_element.setAttribute(name_attr, attributes[name_attr]);
    }
    children.forEach(child => { html_element.append(child); });
    return html_element;
}
export default createElementHTML;
