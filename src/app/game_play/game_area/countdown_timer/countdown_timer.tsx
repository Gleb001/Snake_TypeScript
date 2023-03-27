// typescript ================================================== //
type CountdownTimerType = typeof JSX.FunctionComponentHTML<
    HTMLDivElement,
    {
        value: number,
        time_countdown: number,
        completionAction: () => void;
    }
>

// imports ===================================================== //
import "./countdown_timer.css";
import createHTMLElement from "jsx";

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