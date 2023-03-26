// typescript ================================================== //
type SwitchSettingsType = typeof JSX.FunctionComponentHTML<{
    shift_to_left: number, className: string
}>

// imports ===================================================== //
import "./switch_setting.css"
import SettingsGame from "../settings_game/settings_game";
import createHTMLElement from "jsx";

// main ======================================================== //
let SwitchSettings: SwitchSettingsType = function SwitchSettings(props) {
    return <button
        onclick={function (this: HTMLButtonElement) {

            let current_value = Number(
                SettingsGame.HTML.style.left.slice(0, -2)
            );

            if (current_value % 350 == 0 || current_value == 0) {
                SettingsGame.animations.move(
                    current_value,
                    current_value + props.shift_to_left
                ).start();
            }

        }}
        class={props.className}
    ></button>
}

// export ====================================================== //
export default SwitchSettings;