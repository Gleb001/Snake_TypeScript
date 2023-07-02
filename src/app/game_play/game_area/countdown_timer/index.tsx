// imports ===================================================== //
// libs
import createHTMLElement from "jsx";
// components
import "./styles.css";
import {CountdownTimerType} from "./types";

// main ======================================================== //
let CountdownTimer: CountdownTimerType = (
    { value, time_countdown, completionAction }
) => {

    let countdown = (
        <div class="countdown">
            <p>{String(value)}</p>
        </div>
    );

    let countdown_interval = setInterval(() => {
        if (value == 1) {
            clearInterval(countdown_interval);
            countdown.remove();
            completionAction();
        } else {
            value--
            countdown.querySelector("p").innerHTML = String(value);
        }
    }, time_countdown);

    return countdown;

};

// export ====================================================== //
export default CountdownTimer;