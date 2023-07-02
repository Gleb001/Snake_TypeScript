// imports ===================================================== //
import { AnimationCSS, AnimationJS } from "animations";

// types ======================================================= //
interface DescriptionWindowType extends JSX.ObjectComponentHTML<
    HTMLDivElement
> {

    intro_text: HTMLInputElement,
    status: "wait_input_animation" | "wait_close_animation" | "execution_animation",

    chidrenHTML: Array<HTMLElement>,
    renderSnake: typeof JSX.FunctionComponentHTML<
        HTMLDivElement,
        { width_snake: number, height_snake: number, }
    >,
    renderSizesPlayField: typeof JSX.FunctionComponentHTML,

    animations: {
        show(childrens: HTMLElement[]): typeof AnimationCSS.prototype | typeof AnimationJS.prototype,
        clear: typeof AnimationJS.prototype | typeof AnimationCSS.prototype,
        change_color(new_color: string): typeof AnimationCSS.prototype,
    },

}

// export ====================================================== //
export {DescriptionWindowType};