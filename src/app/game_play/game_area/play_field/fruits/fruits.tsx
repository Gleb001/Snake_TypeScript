// typescript ================================================== //
interface FruitsType {

    HTML: HTMLInputElement,
    cells: HTMLTableCellElement[],

    launchDraw(): void,
    update(): void,
    stopDraw(): boolean,
    draw(): void,

}

// imports ===================================================== //
import "./fruits.css";
import GENERAL_SETTINGS_GAME from "settings_game";
import PlayField from "../play_field";

// main ======================================================== //
let Fruits: FruitsType = {

    get HTML() {
        return document.getElementById(
            "counter_apples"
        ) as HTMLInputElement;
    },
    cells: [],

    // change it with the matrix
    launchDraw() {

        let min_x_coordinate = PlayField.number_columns - 8;
        let max_x_coordinate = PlayField.number_columns - 4;
        let x_coordinate = min_x_coordinate;

        let y_coordinate = Math.trunc(PlayField.number_rows / 2);

        for (
            let number_apples = GENERAL_SETTINGS_GAME.apple.number.value;
            number_apples > 0;
            number_apples--
        ) {

            let apple_cell = PlayField.getCell(x_coordinate, y_coordinate);
            if (apple_cell) {
                apple_cell.classList.add("apple");
                this.cells.push(apple_cell);
            }

            if (x_coordinate == max_x_coordinate) {
                x_coordinate = min_x_coordinate;
                y_coordinate += 2;
            } else {
                x_coordinate += 2;
            }

        }

    },
    // 
    stopDraw() { return PlayField.randomEmptyCell == null; },
    draw() {
        for (let apple of this.cells) {
            if (!apple.classList.contains("apple")) {
                apple.classList.add("apple");
                this.HTML.value = String(Number(this.HTML.value) + 1);
            }
        }
    },
    update() {
        let cells = this.cells;
        for (let index = 0; index < cells.length; index++) {
            let cell = cells[index];
            if (!cell.classList.contains("apple")) {
                cells.splice(index, 1);
                let empty_cell = PlayField.randomEmptyCell;
                if (empty_cell) cells.push(empty_cell);
            }
        }
    },

};

// export ====================================================== //
export default Fruits;