// imports ===================================================== //
// libs
import SETTINGS_GAME from "settings_game";
// components
import "./styles.css";
import { FruitsType } from "./types";
import PlayField from "..";
import ScoreArea from "../../../score_area";

// main ======================================================== //
let Fruits: FruitsType = {

    get HTML() { return document.getElementById("counter_apples") as HTMLInputElement; },
    stopDraw() {
        let counter_apples = ScoreArea.HTML.querySelector("#counter_apples") as HTMLInputElement;
        let score_player = Number(counter_apples.value);
        let list_td = PlayField.HTML.querySelectorAll("td");
        return (score_player + 1 ===  list_td.length);
    },
    cells: [],

    draw() {
        this.cells.forEach(cell => {
            if (!cell.classList.contains("apple")) {
                cell.classList.add("apple");
                this.HTML.value = String(Number(this.HTML.value) + 1);
            }
        });
    },
    update() {
        this.cells = this.cells.map(cell => {
            let isApple = cell.classList.contains("apple");
            return isApple ? cell : PlayField.randomEmptyCell as HTMLTableCellElement;
        });
    },
    launchDraw() {

        let min_x = PlayField.number_columns - 8;

        let current_x = min_x;
        let current_y = Math.floor(PlayField.number_rows / 2);

        let length_apples = { length: SETTINGS_GAME.apple.number.value };
        this.cells = Array.from(length_apples, () => {
            let cell = PlayField.getCell(current_x, current_y) as HTMLTableCellElement;
            cell.classList.add("apple");

            if (current_x == min_x + 4) {
                current_x = min_x;
                current_y += 2;
            } else {
                current_x += 2;
            }

            return cell;
        });

    },

};

// export ====================================================== //
export default Fruits;