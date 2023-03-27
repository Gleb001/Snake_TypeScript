// typescript ================================================== //
type ScoreCounterType = typeof JSX.FunctionComponentHTML<
    HTMLElement,
    {
        id: string,
        className?: string = " ",
    }
>

// imports ===================================================== //
import "./counter_score.css";
import createHTMLElement from "jsx";

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