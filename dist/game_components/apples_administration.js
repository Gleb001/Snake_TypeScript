import { snake_layer } from "./snake.js";
const apple_administartor = {
    GENERAL_SETTINGS: {
        speed: 500,
        color: "red",
        number_of_apples: 3,
    },
    createNewApples(quantity) {
        for (let index = 0; index < quantity; index++) {
            let apple_cell = snake_layer.getCell(Math.floor(Math.random() * 25), Math.floor(Math.random() * 25));
            if (apple_cell.style.backgroundColor != "transparent") {
                apple_cell.style.backgroundColor = this.GENERAL_SETTINGS.color;
            }
            else
                index--;
        }
    },
};
export default apple_administartor;
