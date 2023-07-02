// imports ===================================================== //
// libs
import GENERAL_SETTINGS_GAME from "settings_game";
import createHTMLElement from "jsx";
// components
import "./styles.css";
import {GameAreaType} from "./types";
import PlayField from "./play_field";
import Tbody from "@components/tbody";
import CountdownTimer from "./countdown_timer";

// main ======================================================== //
let GameArea: GameAreaType = {

    HTML: <div id="game_area"></div>,
    width: document.body.offsetWidth * 0.7,
    height: document.body.offsetHeight * 0.9,

    render({ endGame }) {

        let size_cell = GENERAL_SETTINGS_GAME.get("play_field", "size_cell");
        let number_rows = Math.trunc(this.height / size_cell);
        let number_columns = Math.trunc(this.width / size_cell);

        GameArea.HTML.append(
            <table id="background_play_field">
                <Tbody
                    size_cell={size_cell}
                    number_rows={number_rows}
                    number_columns={number_columns}
                />
            </table>,
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <PlayField endGame={endGame}>
                <Tbody
                    size_cell={size_cell}
                    number_rows={number_rows}
                    number_columns={number_columns}
                />
            </PlayField>,
            <CountdownTimer
                value={3}
                time_countdown={1000}
                completionAction={() => {
                    PlayField.status = "play_game";
                    GENERAL_SETTINGS_GAME.get("play_field", "modes").mode_func(PlayField);
                    PlayField.draw();
                }}
            />
        );

        return GameArea.HTML;

    },

};

// export ====================================================== //
export default GameArea;