import createElementHTML from "../../utility/work_with_html.js";
import { snake_layer } from "./snake.js";
const apple_administartor = {
    HTML: createElementHTML("input", {
        id: "counter_apples",
        value: "0",
        disabled: "",
    }),
    GENERAL_SETTINGS: {
        color: "red",
    },
    DYNAMIC_SETTINGS: {
        score: 0,
    },
    createApple(quantity) {
        let color_apple = this.GENERAL_SETTINGS.color;
        for (let index = 0; index < quantity; index++) {
            let apple_cell = snake_layer.getRandomCell("empty");
            apple_cell.style.backgroundColor = color_apple;
        }
    },
    updateScore() {
        this.HTML.setAttribute("value", String(++this.DYNAMIC_SETTINGS.score));
    },
};
export default apple_administartor;
