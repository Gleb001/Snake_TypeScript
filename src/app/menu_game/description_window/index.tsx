// imports ===================================================== //
// libs
import createHTMLElement from "@libs/jsx";
import { animationExtend, AnimationCSS } from "@libs/animations";
import { change_opacity } from "@libs/animations/patterns";
import SETTINGS_GAME from "settings_game";
// components
import "./styles.css"
import {DescriptionWindowType} from "./types";
import Tbody from "@components/tbody";

// main ======================================================== //
let DescriptionWindow: DescriptionWindowType = {

    HTML: <div id="description_window"></div>,
    get intro_text() { return <span id="intro_text">Hello</span> },
    status: "wait_input_animation",

    render() {
        this.status = "wait_input_animation";
        this.HTML.setAttribute("style", "");
        this.HTML.append(this.intro_text);
    },
    renderSizesPlayField() {

        let size_cells = SETTINGS_GAME.play_field.size_cell.list;
        let current_size_cell = SETTINGS_GAME.play_field.size_cell.current;

        let demonstration_size_play_field = <div id="demonstration_size_play_field">{
            Object.keys(size_cells).map(
                (name_size) => {

                    const size_cell = size_cells[name_size as keyof typeof size_cells];
                    let margin = `margin: ${65 - size_cell}px auto;`;
                    let opacity = `opacity: ${name_size == current_size_cell ? 1 : 0}`;

                    return (
                        <div
                            class="table_container"
                            data-name={name_size}
                            style={opacity}
                        >
                            <table style={margin}>
                                <Tbody
                                    size_cell={size_cell}
                                    number_columns={2}
                                    number_rows={2}
                                />
                            </table>
                            <p>{name_size}</p>
                        </div>
                    );

                }
            )
        }</div >;

        return demonstration_size_play_field;

    },
    renderSnake({ width_snake, height_snake }) {
        return (
            <div
                id="demonstration_speed_snake"
                style={`
                    width: ${width_snake}px;
                    height: ${height_snake}px;
                    top: ${(DescriptionWindow.HTML.offsetHeight - height_snake) / 2}px;
                    left: ${-width_snake}px
                `}
            ></div>
        );
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