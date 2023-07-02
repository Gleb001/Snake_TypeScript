// imports ===================================================== //
// libs
import createHTMLElement from "jsx";
// components
import {SettingsAreaType} from "./types";
import SettingsGame from "./settings_game";
import SettingSwitches from "./switch_setting";

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
