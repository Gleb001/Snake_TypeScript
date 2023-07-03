// imports ===================================================== //
// libs
import createHTMLElement from "@libs/jsx";
// components
import "./styles.css"
import {GamePlayType} from "./types";
import ScoreArea from "./score_area";
import GameArea from "./game_area";

// main ======================================================== //
let GamePlay: GamePlayType = {
    HTML: <div id="game_play"></div>,
    render({ endGame }) {

        GamePlay.HTML.append(
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <ScoreArea />,
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <GameArea endGame={endGame}/>
        );

        return GamePlay.HTML;

    }
};

// export ====================================================== //
export default GamePlay;