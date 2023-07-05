// imports ===================================================== //
// libs
import SETTINGS_GAME from "settings_game";
import range from "@libs/range";
// components
import "./styles.css";
import { SnakeType, CoordinateType, ShiftNumberType } from "./types";
import PlayField from "..";

// main ======================================================== //
let Snake: SnakeType = {

    DYNAMIC_SETTINGS: {
        cells: [],
        head_cell: {
            x: 0,
            y: 0,
            update() {

                let coordinate = Snake.DYNAMIC_SETTINGS.motion_vector.coordinate;
                let new_value = this[coordinate] + Snake.DYNAMIC_SETTINGS.motion_vector.shift_number;
                let max_value = coordinate == "x" ? PlayField.number_columns - 1 : PlayField.number_rows - 1;

                this[coordinate] = range(0, max_value, new_value);

                return PlayField.getCell(this.x, this.y) as HTMLTableCellElement;

            },
        },
        motion_vector: {
            coordinate: "x",
            shift_number: 1,
            update(new_coordinate, new_shift_number) {
                let has_update = false;
                if (new_coordinate != this.coordinate) {
                    this.coordinate = new_coordinate;
                    this.shift_number = new_shift_number;
                    has_update = true;
                }
                return has_update;
            }
        },
    },

    launchDraw() {

        let color_snake = SETTINGS_GAME.get("snake", "color");
        let y_coordinate = Math.trunc(PlayField.number_rows / 2);
        let x_coordinate = 2;

        // set list cells snake
        let length_snake = 4;
        this.DYNAMIC_SETTINGS.cells = Array.from(
            Array(length_snake), () => {
                ++x_coordinate;
                let cell = PlayField.getCell(x_coordinate, y_coordinate);
                cell!.style.backgroundColor = color_snake;
                return cell;
            }
        );

        // set coordinates head cell
        this.DYNAMIC_SETTINGS.head_cell.x = x_coordinate;
        this.DYNAMIC_SETTINGS.head_cell.y = y_coordinate;

        // set motion vector
        this.DYNAMIC_SETTINGS.motion_vector.coordinate = "x";
        this.DYNAMIC_SETTINGS.motion_vector.shift_number = 1;

    },
    update() {

        let head_cell = this.DYNAMIC_SETTINGS.head_cell.update();
        this.DYNAMIC_SETTINGS.cells.push(head_cell);

        if (!head_cell.classList.contains("apple")) {
            let tail_cell = this.DYNAMIC_SETTINGS.cells.shift();
            if (tail_cell) {
                tail_cell.className = "";
                tail_cell.style.backgroundColor = "";
            }
        }

    },
    stopDraw() {

        let cells_snake = this.DYNAMIC_SETTINGS.cells;
        let head_snake = cells_snake[cells_snake.length - 1];

        let stop = true;
        if (head_snake) stop = isObstacle(head_snake) || isWall(head_snake);
        return stop;

        // addtional fucntions --------------------------------- //
        function isWall(cell: HTMLTableCellElement) {

            if (!SETTINGS_GAME.get("snake", "has_walls")) return false;

            let row_head_snake = cell?.parentNode as HTMLTableRowElement;
            let x_head_snake = Number(cell?.cellIndex);
            let y_head_snake = Number(row_head_snake.rowIndex);
    
            let previous_head_snake = cells_snake[cells_snake.length - 2];
            let row_previous_head_snake = previous_head_snake?.parentNode as HTMLTableRowElement;
            let x_previous_head_snake = Number(previous_head_snake?.cellIndex);
            let y_previous_head_snake = Number(row_previous_head_snake.rowIndex);
    
            let x_coordinate_nearby = Math.abs(x_head_snake - x_previous_head_snake) <= 1;
            let y_coordinate_nearby = Math.abs(y_head_snake - y_previous_head_snake) <= 1;

            return !x_coordinate_nearby || !y_coordinate_nearby;

        }
        function isObstacle(cell: HTMLTableCellElement) {
            let obstacles = SETTINGS_GAME.get("play_field", "modes").obstacles;
            return (
                obstacles.indexOf(cell.style.backgroundColor) != -1 ||
                cell.classList.contains("active_obstacle")
            );
        }

    },
    draw() {
        let bg_color = SETTINGS_GAME.get("snake", "color");
        for (let cell of this.DYNAMIC_SETTINGS.cells) {
            if (cell && !cell.classList.contains("snake")) {
                cell.className = "snake";
                cell.style.backgroundColor = bg_color;
            }
        }
    },

};

// events ====================================================== //
window.addEventListener("keydown", (event) => {
    if (!PlayField.isPlay) return;

    let data_motion_vector: [CoordinateType, ShiftNumberType];
    switch (event.key) {
        case "ArrowUp": case "w": case "2":
            data_motion_vector = ["y", -1];
            break;
        case "ArrowDown": case "s": case "8":
            data_motion_vector = ["y", 1];
            break;
        case "ArrowRight": case "d": case "6":
            data_motion_vector = ["x", 1];
            break;
        case "ArrowLeft": case "a": case "4":
            data_motion_vector = ["x", -1];
            break;
        default: return;
    }

    let motion_vector = Snake.DYNAMIC_SETTINGS.motion_vector;
    if (motion_vector.update(...data_motion_vector)) PlayField.draw();

});

// export ====================================================== //
export default Snake;