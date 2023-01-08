
// typescript entities ========================================= //

// types ------------------------------------------------------- //
type coordinateVector = "x" | "y"
type shiftNumber = -1 | 1

// imports ===================================================== //

// utility ----------------------------------------------------- //
import createElementHTML from "../utility/work_with_html.js"

// elements ---------------------------------------------------- //
import play_field from "./play_field.js";
import apple_administartor from "./apples_administrator.js";

// main ======================================================== //

// snake ------------------------------------------------------- //
const snake = {

    // html ---------------------------------------------------- //
    HTML: createElementHTML({
        attributes: { id: "snake", },
    }),

    // general settings ---------------------------------------- //
    GENERAL_SETTINGS: {
        speed: 100,
        color: "blue",
        coordinates: {
            start_cell: { x: 0, y: 0, },
            end_cell: { x: 0, y: 0, },
        },
        cells: [],
    },

    // movement settings --------------------------------------- //
    MOVEMENT_SETTINGS: {
        availability_of_access: false,
        waiting_for_action: true,
        motion_vector: {
            coordinate: "x" as coordinateVector,
            shift_number: 1 as shiftNumber,
        }
    },

    // display a snake on the playing field -------------------- //
    draw(): void {

        // 1. get y and x coordinates
        let number_rows = snake_layer.HTML.querySelectorAll("tr").length;
        let y_coordinate = Math.trunc(number_rows / 2) + 1;
        let x_coordinate = 4;

        // 2. set start cell
        this.GENERAL_SETTINGS.coordinates.start_cell.x = x_coordinate;
        this.GENERAL_SETTINGS.coordinates.start_cell.y = y_coordinate;

        // 3. draw all snake cells
        while (x_coordinate < 8) {

            ++x_coordinate;

            let cell_snake = snake_layer.getCell(y_coordinate, x_coordinate);
            cell_snake.style.backgroundColor = this.GENERAL_SETTINGS.color;
            this.GENERAL_SETTINGS.cells.push(cell_snake as never);

        }

        // 4. set end cell
        this.GENERAL_SETTINGS.coordinates.end_cell.y = y_coordinate;
        this.GENERAL_SETTINGS.coordinates.end_cell.x = x_coordinate;

    },

    // start the snake movement -------------------------------- //
    startMove(): void {

        this.MOVEMENT_SETTINGS.availability_of_access = true;

        let ID_INTERVAL = setInterval((): void => {

            // 1. update coordinate
            let coordinate = this.MOVEMENT_SETTINGS.motion_vector.coordinate;
            let shift_number = this.MOVEMENT_SETTINGS.motion_vector.shift_number;
            this.GENERAL_SETTINGS.coordinates.end_cell[coordinate] += shift_number;

            // 2. check new end cell
            let end_cell = snake_layer.getCell(
                this.GENERAL_SETTINGS.coordinates.end_cell.y,
                this.GENERAL_SETTINGS.coordinates.end_cell.x
            );

            switch (end_cell.style.backgroundColor) {
                // new end cell == snake -> end game
                case this.GENERAL_SETTINGS.color:
                    clearInterval(ID_INTERVAL);
                    this.MOVEMENT_SETTINGS.availability_of_access = false;
                    this.MOVEMENT_SETTINGS.waiting_for_action = true;
                    this.MOVEMENT_SETTINGS.motion_vector.coordinate = "x";
                    this.MOVEMENT_SETTINGS.motion_vector.shift_number = -1;
                    return;
                // new end cell == apple -> create apple
                case apple_administartor.GENERAL_SETTINGS.color:
                    apple_administartor.createApple(1);
                    apple_administartor.updateScore();
                    break;
                // new end cell == ordinary cell -> clear start cell
                default:
                    let start_cell = this.GENERAL_SETTINGS.cells[0] as HTMLElement;
                    start_cell.style.backgroundColor = "transparent";
                    this.GENERAL_SETTINGS.cells.shift();
            }

            end_cell.style.backgroundColor = this.GENERAL_SETTINGS.color;
            this.GENERAL_SETTINGS.cells.push(end_cell as never);
            this.MOVEMENT_SETTINGS.waiting_for_action = true;

        }, this.GENERAL_SETTINGS.speed);

    },

}

// snake layer ------------------------------------------------- //
const snake_layer = {

    // html ---------------------------------------------------- //
    HTML: createElementHTML({
        tag_name: "table",
        attributes: {
            id: "snake_layer",
            style: "position: absolute; top: 0;"
        },
        inner_value: play_field.inner_html
    }),

    // get position cell --------------------------------------- //
    getCell(row: number, column: number): HTMLElement {

        let number_rows = this.HTML.querySelectorAll("tr").length;
        let number_columns = this.HTML.querySelectorAll("tr:first-child td").length;

        if (row < 1) row = 1;
        if (column < 1) column = 1;
        if (row > number_rows) row = number_rows;
        if (column > number_columns) column = number_columns;

        return this.HTML.querySelector(
            `tr:nth-child(${row}) td:nth-child(${column})`
        ) as HTMLElement;

    },

}

// Events ====================================================== //
window.addEventListener("keydown", (event): void | undefined => {

    if (!snake.MOVEMENT_SETTINGS.waiting_for_action) return;
    else snake.MOVEMENT_SETTINGS.waiting_for_action = false;

    // 1. get new coordinate and negative
    let new_coordinate = "";
    let new_shift_number = 1;
    switch (event.key) {
        case "ArrowUp":
            new_coordinate = "y";
            new_shift_number = -1;
            break;
        case "ArrowDown":
            new_coordinate = "y";
            new_shift_number = 1;
            break;
        case "ArrowRight":
            new_coordinate = "x";
            new_shift_number = 1;
            break;
        case "ArrowLeft":
            new_coordinate = "x";
            new_shift_number = -1;
            break;
    }

    // 2. get current coordinate and negative
    let current_coordinate = snake.MOVEMENT_SETTINGS.motion_vector.coordinate;
    let current_shift_number = snake.MOVEMENT_SETTINGS.motion_vector.shift_number;

    // 3. check new cooridnate and negative
    if (current_coordinate == new_coordinate &&
        current_shift_number != new_shift_number) return;

    // 4. set new coordinate and negative
    snake.MOVEMENT_SETTINGS.motion_vector.coordinate = new_coordinate as coordinateVector;
    snake.MOVEMENT_SETTINGS.motion_vector.shift_number = new_shift_number as shiftNumber;

});

// export ====================================================== //
export { snake, snake_layer };