// imports ===================================================== //
import "./counter_score.css";
import createHTMLElement from "jsx";

// main ======================================================== //
let ScoreCounter: typeof JSX.FunctionComponentHTML<{
    id: string,
    class: string = " ",
}> = function (props, children) {
    return (
        <input
            id={props.id}
            class={`score_counter ${props.class ? props.class : ""}`}
            value="0"
            type="number"
            disabled
        />
    );
};

// exoprts ===================================================== //
export default ScoreCounter;