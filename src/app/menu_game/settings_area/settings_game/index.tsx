// imports ===================================================== //
// libs
import SETTINGS_GAME from "settings_game";
import createHTMLElement from "@libs/jsx";
import { AnimationCSS, AnimationJS, animationExtend, animationLadder } from "@libs/animations";
import { change_opacity } from "@libs/animations/patterns";
// components
import "./styles.css";
import {SettingsGameType} from "./types";
import DescriptionWindow from "../../description_window";
import Select from "@components/select";

// main ======================================================== //
let SettingsGame: SettingsGameType = {

    HTML: <div id="settings_game"></div>,
    width_setting: 350,

    render() {
        Object.values(SettingsGame.settings).forEach(
            setting => SettingsGame.HTML.append(setting)
        );
        let number_settings = SettingsGame.HTML.querySelectorAll(".setting").length;
        let number_columns = Math.round(number_settings / 2);
        SettingsGame.HTML.style.width = (SettingsGame.width_setting * number_columns) + "px";
    },
    renderSetting({ name, className, animations }, children) {

        children.forEach(child => {
            if (!(child instanceof HTMLElement)) return;
            child.classList.add("setting_input");
            child.addEventListener(
                "change", function (this: HTMLSelectElement) {
                    let button_setting = child.parentElement?.querySelector("button.hover");
                    if (button_setting && animations) animations(["main"]).start();
                }
            );
        });

        return (
            <div class="setting">
                <button
                    class={`${className} icon_setting`}
                    onclick={function (this: HTMLButtonElement) {

                        if (!animations) return;

                        let animation;
                        switch (DescriptionWindow.status) {
                            case "wait_close_animation":
                                if (!this.classList.contains("hover")) return;
                                this.classList.remove("hover");
                                animation = animationExtend(
                                    animations(["end"]),
                                    () => { DescriptionWindow.status = "wait_input_animation"; }
                                );
                                break;
                            case "wait_input_animation":
                                this.classList.add("hover");
                                animation = animationExtend(
                                    animations(["intro", "main"]),
                                    () => { DescriptionWindow.status = "wait_close_animation"; }
                                );
                                break;
                            default: break;
                        }

                        DescriptionWindow.status = "execution_animation";
                        if (animation) animation.start();

                    }}
                ></button>
                <span>{name}:</span>
                {children.map(child => child)}
            </div>
        );

    },

    animations: {
        move(start_value, end_value) {

            let timing_function = AnimationJS.TIMING_FUNCTIONS.linear;
            let max_value = 0;
            let min_value = -(SettingsGame.HTML.offsetWidth - SettingsGame.width_setting);

            if (
                end_value > max_value ||
                end_value < min_value
            ) {
                timing_function = AnimationJS.TIMING_FUNCTIONS.bounce_start;
                start_value = end_value > max_value ? 10 : min_value - 10;
                end_value = end_value > max_value ? max_value : min_value;
            }

            return new AnimationJS({
                changing_elements: [SettingsGame.HTML],
                changing_properties: [
                    {
                        name: "left",
                        start_value: start_value,
                        end_value: end_value,
                        unit_of_measurement: "px",
                    }
                ],
                timing_settings: {
                    duration: 300,
                    timing_function: timing_function,
                },
            });

        },
    },
    settings: {
        get size_playing_field() {
            return (
                <SettingsGame.renderSetting
                    name="Size playing field"
                    className="icon-size_play_field"
                    animations={function (commands) {
                        return animationLadder(...commands.map(command => {
                            switch (command) {
                                case "intro":
                                    return animationExtend(
                                        DescriptionWindow.animations.clear,
                                        () => {
                                            DescriptionWindow.HTML.style.flexDirection = "column";
                                            DescriptionWindow.HTML.append(<DescriptionWindow.renderSizesPlayField />);
                                        }
                                    );
                                case "main":
                                    return function () {

                                        // active table
                                        let active_size_cell = SETTINGS_GAME.play_field.size_cell.current;
                                        let selector_active_table = `[data-name="${active_size_cell}"]`;
                                        let active_table = DescriptionWindow.HTML.querySelector(
                                            selector_active_table
                                        ) as HTMLTableElement;

                                        // no active tables (other tables)
                                        let selector_other_tables = `.table_container:not(${selector_active_table})`;
                                        let other_tables = DescriptionWindow.HTML.querySelectorAll(
                                            selector_other_tables
                                        );

                                        other_tables.forEach(
                                            table => {
                                                if (!(table instanceof HTMLElement)) return;
                                                let current_opacity = Number(table.style.opacity);
                                                change_opacity([table], current_opacity, 0.3).start();
                                            }
                                        );

                                        return change_opacity([active_table], 0.3, 1);

                                    };
                                case "end":
                                    return animationLadder(
                                        animationExtend(
                                            DescriptionWindow.animations.clear,
                                            () => { DescriptionWindow.HTML.style.flexDirection = ""; }
                                        ),
                                        DescriptionWindow.animations.show([
                                            DescriptionWindow.intro_text
                                        ]),
                                    );
                            }
                        }));
                    }}
                >
                    <Select settings={SETTINGS_GAME.play_field.size_cell} />
                </SettingsGame.renderSetting>
            );
        },
        get speed_snake() {

            const size_cell = 40;
            const width_snake = size_cell * 4;
            const height_snake = size_cell;

            return (
                <SettingsGame.renderSetting
                    name="Speed snake"
                    className="icon-speed_snake"
                    animations={function (commands) {

                        let demonstration_snake = <DescriptionWindow.renderSnake
                            width_snake={width_snake}
                            height_snake={height_snake}
                        />;

                        return animationLadder(...commands.map(command => {
                            switch (command) {
                                case "intro":
                                    return animationExtend(
                                        DescriptionWindow.animations.clear,
                                        () => {
                                            DescriptionWindow.HTML.append(demonstration_snake);
                                        }
                                    );
                                case "main":
                                    const moving_distance = DescriptionWindow.HTML.offsetWidth + width_snake;
                                    const speed_snake = SETTINGS_GAME.get("snake", "speed");
                                    const duration_moving_snake = Math.floor((moving_distance * speed_snake) / size_cell);
                                    return new AnimationCSS({
                                        changing_elements: [demonstration_snake],
                                        animation_css: `
                                                move_demonstration_snake
                                                ${duration_moving_snake}ms
                                                linear 0ms 1 forwards
                                            `,
                                        changing_properties: [
                                            {
                                                name: "left",
                                                start_value: -width_snake,
                                                end_value: moving_distance,
                                                unit_of_measurement: "px",
                                            }
                                        ],
                                        next_function() {
                                            demonstration_snake.remove();
                                            let button_setting = document.querySelector(".icon-speed_snake");
                                            if (button_setting instanceof HTMLElement) button_setting?.click();
                                        }
                                    });
                                case "end":
                                    return DescriptionWindow.animations.show([
                                        DescriptionWindow.intro_text
                                    ]);
                            }
                        }));

                    }}
                >
                    <Select settings={SETTINGS_GAME.snake.speed} />
                </SettingsGame.renderSetting>
            );

        },
        get number_apples() {

            let setting_input = (
                <input
                    type="number"
                    min={SETTINGS_GAME.apple.number.min}
                    max={SETTINGS_GAME.apple.number.max}
                    value={SETTINGS_GAME.apple.number.value}
                    onchange={function (this: HTMLInputElement) {

                        let max = Number(this.max);
                        let min = Number(this.min);
                        let value = Number(this.value);
                        value = value > max ? max :
                            value < min ? min :
                                value;

                        SETTINGS_GAME.apple.number.value = value;
                        this.value = String(value);

                    }}
                />
            );

            return (
                <SettingsGame.renderSetting
                    name="Number apples"
                    className="icon-number_apples"
                >{setting_input}</SettingsGame.renderSetting>
            );

        },
        get color_snake() {
            return (
                <SettingsGame.renderSetting
                    name="Color snake"
                    className="icon-color_snake"
                    animations={function (commands) {
                        let new_color = SETTINGS_GAME.get("snake", "color");
                        if (commands.indexOf("end") != -1) new_color = "#16481E";

                        return DescriptionWindow.animations.change_color(new_color);
                    }}
                >
                    <Select settings={SETTINGS_GAME.snake.color} />
                </SettingsGame.renderSetting>
            );
        },
        get mode_game() {
            return (
                <SettingsGame.renderSetting
                    name="Mode" className="icon-question"
                >
                    <Select settings={SETTINGS_GAME.play_field.modes} />
                </SettingsGame.renderSetting>
            );
        },
    },

};

// export ====================================================== //
export default SettingsGame;