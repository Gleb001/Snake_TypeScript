// typescript ================================================== //
interface ScoreAreaType extends JSX.ObjectComponentHTML {
    data_counters: [{ id: string, class?: string }],
}

// imports ===================================================== //
import "./score_area.css"
import ScoreCounter from "./counter/counter_score";
import createHTMLElement from "jsx";

// main ======================================================== //
let ScoreArea: ScoreAreaType = {

    HTML: <div id="score_area"></div>,
    data_counters: [ { id: "counter_apples", } ],

    render(props, children) {

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
