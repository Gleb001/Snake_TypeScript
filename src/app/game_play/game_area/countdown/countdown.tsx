// typescript ================================================== //
type CountdownType = typeof JSX.FunctionComponentHTML<{
    value: number,
    time: number,
    eventAfterCountdown: () => void;
}>

// imports ===================================================== //
import "./countdown.css";
import createHTMLElement from "jsx";

// main ======================================================== //
let Countdown: CountdownType = (props, children) => {

    let time_interval = props.time / props.value;
    let countdown = <div class="countdown"><p>{String(props.value)}</p></div>;
    let countdown_interval = setInterval(() => {
        if (props.value == 1) {
            clearInterval(countdown_interval);
            countdown.remove();
            props.eventAfterCountdown();
        } else {
            props.value--
            countdown.querySelector("p").innerHTML = String(props.value);
        }
    }, time_interval);

    return countdown;

};

// export ====================================================== //
export default Countdown;