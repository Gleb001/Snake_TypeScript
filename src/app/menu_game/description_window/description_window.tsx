// typescript ================================================== //
interface DescriptionWindowType extends JSX.ObjectComponentHTML {

    intro_text: HTMLSpanElement,
    active: boolean,

    chidrenHTML: Array<HTMLElement>,

    animations: {
        show(childrens: HTMLElement[]): typeof AnimationCSS.prototype | typeof AnimationJS.prototype,
        clear: typeof AnimationJS.prototype | typeof AnimationCSS.prototype,
        change_color(new_color: string): typeof AnimationCSS.prototype,
    },

}

// imports ===================================================== //
import "./description_window.css"
import createHTMLElement from "jsx";
import { animationExtend, AnimationCSS, AnimationJS } from "animations";
import { change_opacity } from "patterns_animations";

// main ======================================================== //
let DescriptionWindow: DescriptionWindowType = {

    active: false,
    HTML: <div id="description_window"></div>,
    intro_text: (
        <span style={` text-shadow:
            1px 0 1px #16481E, 0 1px 1px #16481E,
            -1px 0 1px #16481E, 0 -1px 1px #16481E;
        `}>Hello</span>
    ),

    render() {
        DescriptionWindow.intro_text.style.opacity = "1";
        DescriptionWindow.HTML.append(DescriptionWindow.intro_text);
        return DescriptionWindow.HTML;
    },
    get chidrenHTML() {
        return Array.from(DescriptionWindow.HTML.children).filter(
            (child): child is HTMLElement => child instanceof HTMLElement
        );
    },

    animations: {
        show(childrens) {
            childrens.forEach(child => {
                child.style.opacity = "0";
                DescriptionWindow.HTML.append(...childrens);
            });
            return change_opacity(childrens, 0, 1);
        },
        get clear() {
            let childrens = DescriptionWindow.chidrenHTML;
            return animationExtend(
                change_opacity(childrens, 1, 0),
                () => { childrens.forEach(elem => elem.remove()); },
            );
        },
        change_color(new_color) {
            return new AnimationCSS({
                changing_elements: [DescriptionWindow.HTML],
                animation_css: "change_color 500ms linear 0ms forwards 1",
                changing_properties: [
                    {
                        name: "background-color",
                        start_value: DescriptionWindow.HTML.style.backgroundColor,
                        end_value: new_color,
                    },
                ],
                next_function() {
                    DescriptionWindow.HTML.style.backgroundColor = new_color;
                }
            })
        },
    },

};

// export ====================================================== //
export default DescriptionWindow;