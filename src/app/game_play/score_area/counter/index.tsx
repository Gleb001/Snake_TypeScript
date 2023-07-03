// imports ===================================================== //
// libs
import createHTMLElement from "@libs/jsx";
// components
import "./styles.css";
import {ScoreCounterType} from "./types";

// main ======================================================== //
let ScoreCounter: ScoreCounterType = function ({className}) {
    return (
        <div class="container_score">
            <div class="ball_container">
                <div class="ball"></div>
            </div>
            <input
                id="counter_apples"
                class={`score_counter_${className}`}
                value="0"S
                type="number"
                disabled
            />
        </div>
    );
};

// exoprts ===================================================== //
export default ScoreCounter;