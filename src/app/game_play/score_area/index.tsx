// imports ===================================================== //
// libs
import createHTMLElement from "jsx";
// components
import "./styles.css"
import {ScoreAreaType} from "./types";
import ScoreCounter from "./counter";

// main ======================================================== //
let ScoreArea: ScoreAreaType = {

    HTML: <div id="score_area"></div>,
    data_counters: [ { id: "counter_apples", } ],

    render() {

        this.HTML.append(
            <div class="score_player">{
                this.data_counters.map(
                    data => <ScoreCounter {...data}/>
                )
            }</div>,
        );

        return this.HTML;

    },

};

// export ====================================================== //
export default ScoreArea;
