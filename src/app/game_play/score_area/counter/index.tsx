// imports ===================================================== //
// libs
import createHTMLElement from "jsx";
// components
import "./styles.css";
import {ScoreCounterType} from "./types";

// main ======================================================== //
let ScoreCounter: ScoreCounterType = function ({id, className}) {
    return (
        <input
            id={id}
            class={`score_counter ${className}`}
            value="0"
            type="number"
            disabled
        />
    );
};

// exoprts ===================================================== //
export default ScoreCounter;