// typescript ================================================== //
interface SettingsAreaType extends JSX.ObjectComponentHTML<
    HTMLDivElement, { startGame: () => void }
> {}

// imports ===================================================== //
import SettingsGame from "./settings_game/settings_game";
import SettingSwitches from "./switch_setting/setting_switches";
import createHTMLElement from "jsx";

// main ======================================================== //
let SettingsArea: SettingsAreaType = {

    HTML: <div id="settings_area"></div>,

    render({ startGame }) {

        this.HTML.append(
            <h1 id="name_game">Snake TypeScript</h1>,
            <div class="settings_game__container">
                <div class="settings_game__wrapper">
                    {/* @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type) */}
                    <SettingsGame />
                </div>
                {/* @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type) */}
                <SettingSwitches />
            </div>,
            <button
                id="button_start_game"
                onclick={startGame}
            >start game</button>,
        );

        return this.HTML;

    },

};

// export ====================================================== //
export default SettingsArea;
