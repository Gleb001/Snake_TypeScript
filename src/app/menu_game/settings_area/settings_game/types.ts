// import ====================================================== //
import { AnimationCSS, AnimationJS } from "@libs/animations";

// types ======================================================= //
type AnimationType = typeof AnimationCSS.prototype | typeof AnimationJS.prototype
interface SettingsGameType extends JSX.ObjectComponentHTML {

    width_setting: number,
    renderSetting: typeof JSX.FunctionComponentHTML<
        HTMLDivElement,
        {
            name: string,
            animations?: (commands: ("intro" | "main" | "end")[]) => AnimationType,
            className?: string,
        }
    >,

    animations: {
        move(start_value: number, end_value: number): AnimationType,
    },
    settings: {
        number_apples: HTMLElement,
        speed_snake: HTMLElement,
        color_snake: HTMLElement,
        mode_game: HTMLElement,
        size_playing_field: HTMLElement,
    },

}

// export ====================================================== //
export {SettingsGameType};