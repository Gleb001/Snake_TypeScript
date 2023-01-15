
// imports ===================================================== //

// elements ---------------------------------------------------- //
import createElementHTML from "../../utility/work_with_html.js";
import { snake_layer } from "./snake.js";

// main ======================================================== //

// apple administartor ----------------------------------------- //
const apple_administartor = {

    // html ---------------------------------------------------- //
    HTML: createElementHTML(
        "input",
        {
            id: "counter_apples",
            value: "0",
            disabled: "",
        },
    ),

    // general settings ---------------------------------------- //
    GENERAL_SETTINGS: {
        color: "red",
        score: 0,
    },

    // starting to create an apples ---------------------------- //
    createApple(quantity: number): void {

        let color_apple = this.GENERAL_SETTINGS.color;

        for (let index = 0; index < quantity; index++) {
            let apple_cell = snake_layer.getRandomCell("empty");
            apple_cell.style.backgroundColor = color_apple;
        }

    },

    // update value -------------------------------------------- //
    updateScore(): void {
        this.HTML.setAttribute(
            "value", String(++this.GENERAL_SETTINGS.score)
        );
    },

}

// export ====================================================== //
export default apple_administartor;