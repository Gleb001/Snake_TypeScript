import play_field from "../game_play/play_field.js";
import { snake } from "../game_play/snake.js";
import modes_administrator from "../abstractions/modes_administrator.js";
import createElementHTML from "../../utility/work_with_html.js";
const settings_game = {
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
    ],
    addSettingsGame() {
        let settings_game = document.getElementById("settings_game");
        for (let setting_name in this.settings_data) {
            let setting_data = this.settings_data[setting_name];
            let image_setting = createElementHTML("div", { class: "icon_setting", }, createElementHTML("img", { src: setting_data.img_url }));
            let select_element = createElementHTML("select", {
                style: "text-align: left;",
                class: "field_input",
            });
            select_element.addEventListener("change", () => {
                setting_data.setting_parameters.current = select_element.value;
            });
            this.__addOptionsForSelectElement(setting_data.setting_parameters, select_element);
            let span_element = createElementHTML("div", undefined, `${setting_data.name}:`, select_element);
            let container_setting = createElementHTML("div", { class: "container_setting" }, image_setting, span_element);
            settings_game.appendChild(container_setting);
        }
    },
    __addOptionsForSelectElement(settings, selectElement) {
        Object.keys(settings.list).forEach((setting_name) => {
            let option = document.createElement("option");
            if (setting_name == settings.current)
                option.selected = true;
            option.value = setting_name;
            option.innerHTML = setting_name;
            selectElement.append(option);
        });
    },
};
export default settings_game;
