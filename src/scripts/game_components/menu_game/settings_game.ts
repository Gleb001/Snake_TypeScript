
// typescripts entities ======================================== //

// type -------------------------------------------------------- //
type settingParameter = {
    current: string,
    list: { [name: string]: string | number | (() => void), },
}
type settingsData = {
    name: string,
    img_url: string,
    setting_parameters: settingParameter,
}

// imports ===================================================== //

// elements ---------------------------------------------------- //
import play_field from "../game_play/play_field.js";
import { snake } from "../game_play/snake.js";
import modes_administrator from "../abstractions/modes_administrator.js";

// utility ----------------------------------------------------- //
import createElementHTML from "../../utility/work_with_html.js";

// main ======================================================== //

// game settings ----------------------------------------------- //
const settings_game = {

    // settings data ------------------------------------------- //
    settings_data: [
        {
            name: "Size playing field",
            img_url: "./images/size_playing_field.svg",
            setting_parameters: play_field.GENERAL_SETTINGS.size_cell,
        },
        {
            name: "Speed snake",
            img_url: "./images/level_game.svg",
            setting_parameters: snake.GENERAL_SETTINGS.speed,
        },
        {
            name: "Mode",
            img_url: "./images/question_icon.svg",
            setting_parameters: modes_administrator.GENERAL_SETTINGS.mode,
        },
    ] as settingsData[],

    // add settings game --------------------------------------- //
    addSettingsGame(): void {

        let settings_game = document.getElementById(
            "settings_game"
        ) as HTMLElement;

        for (let setting_name in this.settings_data) {

            // 1. get data setting
            let setting_data = this.settings_data[setting_name];

            // 2. create icon setting
            let image_setting = createElementHTML(
                "div",
                { class: "icon_setting", },
                createElementHTML(
                    "img",
                    { src: setting_data.img_url }
                )
            );

            // 3. create select element with options
            let select_element = createElementHTML(
                "select",
                {
                    style: "text-align: left;",
                    class: "field_input",
                },
            ) as HTMLSelectElement;
            select_element.addEventListener(
                "change", (): void => {
                    setting_data.setting_parameters.current = select_element.value;
                }
            );
            this.__addOptionsForSelectElement(
                setting_data.setting_parameters,
                select_element
            );

            // 4. create span element
            let span_element = createElementHTML(
                "div", undefined, `${setting_data.name}:`, select_element
            );

            // 5. create container for setting and insert:
            // icon setting and span element
            let container_setting = createElementHTML(
                "div", { class: "container_setting" },
                image_setting, span_element
            );

            // 6. insert setting in settings game element
            settings_game.appendChild(container_setting);

        }

    },

    // add option for select element --------------------------- //
    __addOptionsForSelectElement(
        settings: settingParameter, selectElement: HTMLSelectElement
    ): void {

        Object.keys(settings.list).forEach((setting_name: string) => {
            let option = document.createElement("option") as HTMLOptionElement;
            if (setting_name == settings.current) option.selected = true;
            option.value = setting_name;
            option.innerHTML = setting_name;
            selectElement.append(option);
        });
    
    },

};

// export ====================================================== //
export default settings_game;

// INPUTS ====================================================== //

// setting up inputs in the game menu //
// (function (): void {

//     let inputs = document.querySelectorAll("input");

//     inputs.forEach((input: HTMLInputElement): void => {
//         input.addEventListener("change", (event): void => {
//             let value_input = input.value;
//             console.log(Number.isNaN(input.value))
//             if (
//                 !Number(input.value) ||
//                 Number(input.value) > 100
//             ) {
//                 input.value = "100";
//             } else if (Number(input.value) < 1) {
//                 input.value = "1";
//             }
//         });
//     });

// })();
