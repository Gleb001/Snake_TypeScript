// typescript ================================================== //
interface SettingsGameType extends JSX.ObjectComponentHTML {

    renderSetting: typeof JSX.FunctionComponentHTML<{
        name: string,
        className?: string,
        settings?: {},
        changeDescriptionWindow(
            commands: ("intro" | "main" | "end")[]
        ): void,
    }>,
    renderSettingSelect: typeof JSX.FunctionComponentHTML<{
        settings: {},
    }>,
    animations: {
        move(start_value: number, end_value: number): typeof AnimationJS.prototype | any,
        [name_animation: string]: typeof AnimationJS.prototype | any
    },

    width_setting: number,
    settings: {
        size_playing_field: HTMLElement,
        number_apples: HTMLElement,
        speed_snake: HTMLElement,
        color_snake: HTMLElement,
        mode_game: HTMLElement,
        [name_settings: string]: HTMLElement,
    },

}

// imports ===================================================== //
import "./settings_game.css"
import GENERAL_SETTINGS_GAME from "settings_game";
import Tbody from "../../components/tbody";
import DescriptionWindow from "../description_window/description_window";
import createHTMLElement from "jsx";
import { AnimationCSS, AnimationJS, animationExtend, animationLadder } from "animations";
import { change_opacity } from "patterns_animations";

// main ======================================================== //
let SettingsGame: SettingsGameType = {

    HTML: <div id="settings_game"></div>,
    width_setting: 350,

    renderSetting(props, [setting_input]) {

        setting_input.addEventListener(
            "change", function (this: HTMLSelectElement) {
                let button_setting = setting_input.parentElement?.querySelector("button.hover");
                if (button_setting) props.changeDescriptionWindow(["main"]);
            }
        );

        let double_click = false;

        return (
            <div class="setting">
                <button
                    class={`${props.className} icon_setting`}
                    onclick={function (this: HTMLButtonElement) {

                        if (double_click) {
                            return;
                        } else {
                            double_click = true;
                            setTimeout(() => { double_click = false; }, 500);
                        }

                        if (this.classList.contains("hover")) {
                            this.classList.remove("hover");
                            props.changeDescriptionWindow(["end"]);
                            DescriptionWindow.active = false;
                        } else if (!DescriptionWindow.active) {
                            this.classList.add("hover");
                            props.changeDescriptionWindow(["intro", "main"]);
                            DescriptionWindow.active = true;
                        }

                    }}
                ></button>
                <span>{props.name}:</span>
                {setting_input}
            </div>
        );

    },
    renderSettingSelect({ settings }) {
        return (
            <select
                style="text-align: left; cursor: pointer;"
                class="setting_input"
                onchange={function (this: HTMLSelectElement) {
                    settings.current = this.value;
                }}
            >
                {Object.keys(settings.list).map(setting_name => {
                    let option = document.createElement("option") as HTMLOptionElement;
                    if (setting_name == settings.current) option.selected = true;
                    option.value = setting_name;
                    option.innerHTML = setting_name;
                    return option;
                })}
            </select>
        );
    },
    render() {

        Object.values(SettingsGame.settings).forEach(
            setting => SettingsGame.HTML.append(setting)
        );

        let number_settings = SettingsGame.HTML.querySelectorAll(".setting").length;
        let number_columns = Math.round(number_settings / 2);
        SettingsGame.HTML.style.width = (SettingsGame.width_setting * number_columns) + "px";

        return SettingsGame.HTML;

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
                    changeDescriptionWindow={function (commands) {

                        let current_name_size = GENERAL_SETTINGS_GAME.play_field.size_cell.current;
                        let list_size_cells = GENERAL_SETTINGS_GAME.play_field.size_cell.list;
                        let demonstration_size_play_field = (
                            <div id="demonstration_size_play_field">{
                                Object.keys(list_size_cells).map(
                                    (name_size) => {

                                        const size_cell = list_size_cells[name_size as keyof typeof list_size_cells];
                                        let margin = `margin: ${65 - size_cell}px auto;`;
                                        let opacity = `opacity: ${name_size == current_name_size ? 1 : 0}`;

                                        return <div
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
                                        </div>;

                                    }
                                )
                            }</div>
                        );

                        animationLadder(...commands.map(command => {
                            switch (command) {
                                case "intro":
                                    return animationExtend(
                                        DescriptionWindow.animations.clear,
                                        () => {
                                            DescriptionWindow.HTML.style.flexDirection = "column";
                                            DescriptionWindow.HTML.append(demonstration_size_play_field);
                                        }
                                    );
                                case "main":
                                    return function () {

                                        let selector_current_table = `[data-name="${current_name_size}"]`;
                                        let current_table = DescriptionWindow.HTML.querySelector(selector_current_table) as HTMLTableElement;

                                        let selector_other_tables = `.table_container:not(${selector_current_table})`;
                                        let other_tables = DescriptionWindow.HTML.querySelectorAll(selector_other_tables);

                                        other_tables.forEach(
                                            table => {
                                                if (!(table instanceof HTMLElement)) return;

                                                let current_opacity = Number(table.style.opacity);
                                                change_opacity([table], current_opacity, 0.3).start();
                                            }
                                        );

                                        return change_opacity([current_table], 0.3, 1);

                                    };
                                case "end":
                                    return animationLadder(
                                        animationExtend(
                                            DescriptionWindow.animations.clear,
                                            () => { DescriptionWindow.HTML.style.flexDirection = ""; }
                                        ),
                                        DescriptionWindow.animations.show([DescriptionWindow.intro_text]),
                                    );
                            }
                        })).start();

                    }}
                >
                    <SettingsGame.renderSettingSelect
                        settings={GENERAL_SETTINGS_GAME.play_field.size_cell}
                    />
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
                    changeDescriptionWindow={function (commands) {

                        let demonstration_snake: HTMLElement = <div
                            id="demonstration_speed_snake"
                            style={`
                            width: ${width_snake}px;
                            height: ${height_snake}px;
                            top: ${(DescriptionWindow.HTML.offsetHeight - height_snake) / 2}px;
                            left: ${-width_snake}px
                        `}
                        ></div>;

                        animationLadder(...commands.map(command => {
                            switch (command) {
                                case "intro":
                                    return animationExtend(
                                        DescriptionWindow.animations.clear,
                                        () => {
                                            DescriptionWindow.HTML.append(demonstration_snake);
                                        }
                                    );
                                case "main":
                                    return () => {

                                        const moving_distance = DescriptionWindow.HTML.offsetWidth + width_snake;
                                        const speed_snake = GENERAL_SETTINGS_GAME.get("snake", "speed");
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

                                    };
                                case "end":
                                    return DescriptionWindow.animations.show(
                                        [DescriptionWindow.intro_text]
                                    );
                            }
                        })).start();

                    }}
                >
                    <SettingsGame.renderSettingSelect
                        settings={GENERAL_SETTINGS_GAME.snake.speed}
                    />
                </SettingsGame.renderSetting>
            );

        },
        get number_apples() {

            let setting_input = (
                <input
                    type="number"
                    class="setting_input"
                    min={GENERAL_SETTINGS_GAME.apple.number.min}
                    max={GENERAL_SETTINGS_GAME.apple.number.max}
                    value={GENERAL_SETTINGS_GAME.apple.number.value}
                    onchange={function (this: HTMLInputElement) {

                        let max = Number(this.max);
                        let min = Number(this.min);
                        let value = Number(this.value);
                        value = value > max ? max :
                                value < min ? min :
                                value;

                        GENERAL_SETTINGS_GAME.apple.number.value = value;
                        this.value = String(value);

                    }}
                />
            );

            return (
                <SettingsGame.renderSetting
                    name="Number apples"
                    className="icon-number_apples"
                    changeDescriptionWindow={{ function() { } }}
                >{setting_input}</SettingsGame.renderSetting>
            );

        },
        get color_snake() {
            return (
                <SettingsGame.renderSetting
                    name="Color snake"
                    className="icon-color_snake"
                    changeDescriptionWindow={function (commands) {
                        let new_color = GENERAL_SETTINGS_GAME.get("snake", "color");
                        if (commands.indexOf("end") != -1) new_color = "#16481E";

                        DescriptionWindow.animations.change_color(new_color).start();
                    }}
                >
                    <SettingsGame.renderSettingSelect
                        settings={GENERAL_SETTINGS_GAME.snake.color}
                    />
                </SettingsGame.renderSetting>
            );
        },
        get mode_game() {
            return (
                <SettingsGame.renderSetting
                    name="Mode"
                    className="icon-question"
                    changeDescriptionWindow={{}}
                >
                    <SettingsGame.renderSettingSelect
                        settings={GENERAL_SETTINGS_GAME.play_field.modes}
                    />
                </SettingsGame.renderSetting>
            );
        },
    },

};

// export ====================================================== //
export default SettingsGame;