// imports ===================================================== //
// libs
import createHTMLElement from "@libs/jsx";
// components
import "./styles.css"
import {ScoreAreaType} from "./types";
import ScoreCounter from "./counter";

// main ======================================================== //
let ScoreArea: ScoreAreaType = {

    HTML: <div id="score_area"></div>,

    render() {
        this.HTML.append(
            <div class="score_player">
                <ScoreCounter className="apples"/>
            </div>,
        );
    },

};

// export ====================================================== //
export default ScoreArea;
