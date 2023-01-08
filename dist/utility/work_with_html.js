function createElementHTML({ tag_name = "div", attributes = {}, inner_value = "" }) {
    let html_element = document.createElement(tag_name);
    html_element.innerHTML = inner_value;
    for (let name_attr in attributes) {
        html_element.setAttribute(name_attr, attributes[name_attr]);
    }
    return html_element;
}
export default createElementHTML;
