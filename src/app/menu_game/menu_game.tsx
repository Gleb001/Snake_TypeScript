// imports ===================================================== //
import "./menu_game.css"
import DescriptionWindow from "./description_window/description_window";
import SettingsGame from "./settings_game/settings_game";
import SwitchSettings from "./switch_setting/switch_setting";
import createHTMLElement from "jsx";

// main ======================================================== //
let MenuGame: JSX.ObjectComponentHTML = {
    HTML: <div id="menu_game"></div>,
    render(props: { startGameEvent: () => void, }) {

        MenuGame.HTML.append(
            <div>
                <h1 id="name_game">Snake TypeScript</h1>
                <div class="settings_game__container">
                    <div class="settings_game__wrapper">{
                        // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
                        <SettingsGame />
                    }</div>
                    <div id="setting_switches">
                        <SwitchSettings
                            shift_to_left={-350}
                            className="icon-arrow_right"
                        />
                        <SwitchSettings
                            shift_to_left={350}
                            className="icon-arrow_left"
                        />
                    </div>
                </div>
                <button
                    id="button_start_game"
                    onclick={props.startGameEvent}
                >start game</button>
            </div>,
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <DescriptionWindow />
        );

        return MenuGame.HTML;

    },
};

// export ====================================================== //
export default MenuGame;