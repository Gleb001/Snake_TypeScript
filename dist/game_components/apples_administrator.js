import { snake_layer } from "./snake.js";
const apple_administartor = {
    HTML: document.getElementById("counter_apples"),
    GENERAL_SETTINGS: {
        speed: 500,
        color: "red",
        score: 0,
    },
    createApple(quantity) {
        let color_apple = this.GENERAL_SETTINGS.color;
        for (let index = 0; index < quantity; index++) {
            let apple_cell = snake_layer.getCell(Math.floor(Math.random() * 25), Math.floor(Math.random() * 25));
            if (apple_cell.style.backgroundColor == "" ||
                apple_cell.style.backgroundColor == "transparent") {
                apple_cell.style.backgroundColor = color_apple;
            }
            else
                index--;
        }
    },
    updateScore() {
        this.HTML.setAttribute("value", String(++this.GENERAL_SETTINGS.score));
    },
};
export default apple_administartor;
