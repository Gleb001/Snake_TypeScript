
// typescripts entities ======================================== //

// types ------------------------------------------------------- //
type HTMLSettings = {
    tag_name?: string,
    attributes?: { [name_sd: string]: string },
    inner_value?: string
}

// main ======================================================== //

// create html element ----------------------------------------- //
function createElementHTML({
    tag_name = "div", attributes = {}, inner_value= ""
}: HTMLSettings ): HTMLElement {

    // PS: it is made so that the code editor (under VS code) 
    // displays auxiliary hints when accessing the variable
    // (or object property) to which the created element
    // will be assigned
    let html_element = document.createElement(tag_name);
    html_element.innerHTML = inner_value;
    for (let name_attr in attributes) {
        html_element.setAttribute(
            name_attr, attributes[name_attr]
        );
    }

    return html_element;

}

// export ====================================================== //
export default createElementHTML;