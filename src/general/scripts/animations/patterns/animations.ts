
// import module =============================================== //
import { AnimationCSS, AnimationJS } from "animations";

// main ======================================================== //
// opacity ----------------------------------------------------- //
function change_opacity (
    changing_elements: HTMLElement[],
    start_value: number,
    new_value: number,
) {

    changing_elements.forEach(element => {
        element.style.opacity = String(start_value)
    });

    return new AnimationJS({
        changing_elements: changing_elements,
        timing_settings: {
            duration: 500,
            timing_function: AnimationJS.TIMING_FUNCTIONS.linear
        },
        changing_properties: [
            {
                name: "opacity",
                start_value: start_value,
                end_value: new_value,
            }
        ],
    });
    
};

// export ====================================================== //
export {change_opacity}