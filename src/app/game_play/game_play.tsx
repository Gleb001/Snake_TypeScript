// imports ===================================================== //
import "./game_play.css"
import ScoreArea from "./score_area/score_area";
import GameArea from "./game_area/game_area";
import createHTMLElement from "jsx";

// main ======================================================== //
let GamePlay: JSX.ObjectComponentHTML = {
    HTML: <div id="game_play"></div>,
    render(props: { endGame(): void }) {

        GamePlay.HTML.append(
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <ScoreArea />,
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <GameArea endGame={props.endGame}/>
        );

        return GamePlay.HTML;

    }
};

// export ====================================================== //
export default GamePlay;