// typescript ================================================== //
interface GameAreaType extends JSX.ObjectComponentHTML<
    HTMLDivElement,
    { endGame(): void }
> {
    width: number,
    height: number,
    // status: "wait_game" | "game_play" | "game_over",
}

// imports ===================================================== //
import "./game_area.css";
import PlayField from "./play_field/play_field";
import Tbody from "../../components/tbody";
import Countdown from "./countdown/countdown";
import GENERAL_SETTINGS_GAME from "settings_game";
import createHTMLElement from "jsx";

// main ======================================================== //
let GameArea: GameAreaType = {

    HTML: <div id="game_area"></div>,
    width: document.body.offsetWidth * 0.7,
    height: document.body.offsetHeight * 0.9,

    render(props, children) {

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
            <PlayField endGame={props.endGame}>
                <Tbody
                    size_cell={size_cell}
                    number_rows={number_rows}
                    number_columns={number_columns}
                />
            </PlayField>,
            <Countdown
                value={1}
                time={1000}
                eventAfterCountdown={() => {
                    PlayField.status = "play_game";
                    GENERAL_SETTINGS_GAME.get("play_field", "modes").mode_func();
                    PlayField.draw();
                }}
            />
        );

        return GameArea.HTML;

    },

};

// export ====================================================== //
export default GameArea;