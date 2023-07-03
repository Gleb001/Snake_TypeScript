// imports ===================================================== //
// libs
import SETTINGS_GAME from "settings_game";
import createHTMLElement from "@libs/jsx";
// components
import "./styles.css";
import { GameAreaType } from "./types";
import PlayField from "./play_field";
import Tbody from "@components/tbody";
import CountdownTimer from "./countdown_timer";

// main ======================================================== //
let GameArea: GameAreaType = {

    HTML: <div id="game_area"></div>,
    width:           () => document.body.offsetWidth * 0.7,
    height:          () => document.body.offsetHeight * 0.9,
    mode_game:       () => SETTINGS_GAME.get("play_field", "modes"),
    duration_redraw: () => SETTINGS_GAME.get("snake", "speed"),

    render({ endGame }) {
        let size_cell = SETTINGS_GAME.get("play_field", "size_cell");
        let number_rows = Math.trunc(this.height() / size_cell);
        let number_columns = Math.trunc(this.width() / size_cell);

        GameArea.HTML.append(
            <table id="background_play_field">
                <Tbody
                    size_cell={size_cell}
                    number_rows={number_rows}
                    number_columns={number_columns}
                />
            </table>,
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <PlayField endGameFunc={endGame}>
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
                    PlayField.isPlay = true;
                    this.mode_game().mode_func(PlayField);
                    let idInterval: ReturnType<typeof setInterval> = setInterval(
                        () => {
                            if (!PlayField.isPlay) {
                                endGame();
                                clearInterval(idInterval);
                            }
                            else PlayField.draw();
                        },
                        this.duration_redraw()
                    );
                }}
            />
        );
    },

};

// export ====================================================== //
export default GameArea;