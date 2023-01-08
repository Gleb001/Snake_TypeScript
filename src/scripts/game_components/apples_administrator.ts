
// imports ===================================================== //

// elements ---------------------------------------------------- //
import { snake_layer } from "./snake.js";

// main ======================================================== //

// apple administartor ----------------------------------------- //
const apple_administartor = {

    // html ---------------------------------------------------- //
    HTML: document.getElementById("counter_apples") as HTMLElement,

    // general settings ---------------------------------------- //
    GENERAL_SETTINGS: {
        speed: 500,
        color: "red",
        score: 0,
    },

    // starting to create an apples ---------------------------- //
    createApple(quantity: number): void {

        let color_apple = this.GENERAL_SETTINGS.color;

        for (let index = 0; index < quantity; index++) {

            let apple_cell = snake_layer.getCell(
                Math.floor(Math.random() * 25),
                Math.floor(Math.random() * 25)
            ) as HTMLElement;

            if (
                apple_cell.style.backgroundColor == "" ||
                apple_cell.style.backgroundColor == "transparent"
            ) {
                apple_cell.style.backgroundColor = color_apple;
            } else index--;

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