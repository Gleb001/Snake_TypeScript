// typescript ================================================== //
interface SettingSwitchesType extends JSX.ObjectComponentHTML<
    HTMLDivElement
> {
    renderSettingSwitch: typeof JSX.FunctionComponentHTML<
        HTMLButtonElement,
        { shift_to_left: number, className: string }
    >,
}

// imports ===================================================== //
import "./setting_switches.css"
import SettingsGame from "../settings_game/settings_game";
import createHTMLElement from "jsx";

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