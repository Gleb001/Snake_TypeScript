// imports ===================================================== //
// libs
import createHTMLElement from "@libs/jsx";
// components
import "./styles.css"
import {SettingSwitchesType} from "./types";
import SettingsGame from "../settings_game";

// main ======================================================== //
let SettingSwitches: SettingSwitchesType = {

    HTML: <div id="setting_switches"></div>,

    render() {

        this.HTML.append(
            <this.renderSettingSwitch
                shift_to_left={-350}
                className="icon-arrow_right"
            />,
            <this.renderSettingSwitch
                shift_to_left={350}
                className="icon-arrow_left"
            />
        );

        return this.HTML;

    },
    renderSettingSwitch({ shift_to_left, className }) {
        return <button
            onclick={function (this: HTMLButtonElement) {

                let current_value = Number(
                    SettingsGame.HTML.style.left.slice(0, -2)
                );

                if (current_value % 350 == 0 || current_value == 0) {
                    SettingsGame.animations.move(
                        current_value,
                        current_value + shift_to_left
                    ).start();
                }

            }}
            class={className}
        ></button>
    },

};

// export ====================================================== //
export default SettingSwitches;