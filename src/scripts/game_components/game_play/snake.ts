
// typescript entities ========================================= //

// types ------------------------------------------------------- //
type coordinateVector = "x" | "y"
type shiftNumber = -1 | 1
type motionVector = {
    coordinate: coordinateVector,
    shift_number: shiftNumber,
}
type modeGame = "classic" | "no_walls" | "obstacles"

// imports ===================================================== //

// utility ----------------------------------------------------- //
import createElementHTML from "../../utility/work_with_html.js"

// elements ---------------------------------------------------- //
import play_field from "./play_field.js";
import apple_administartor from "./apples_administrator.js";
import modes_administrator from "./modes_administrator.js"

// main ======================================================== //

// snake ------------------------------------------------------- //
const snake = {

    // html ---------------------------------------------------- //
    HTML: createElementHTML( "div", { id: "snake" }, ),

    // general settings ---------------------------------------- //
    GENERAL_SETTINGS: {
        speed: {
            current: "hard",
            list: {
                easy: 140,
                medium: 100,
                hard: 85,
                unreal: 70,
            } as { [name: string]: number }
        },
        coordinates: {
            start_cell: { x: 0, y: 0, },
            end_cell: { x: 0, y: 0, },
        },
        color: "blue",
        cells: [] as HTMLTableCellElement[],
    },

    // movement settings --------------------------------------- //
    MOVEMENT_SETTINGS: {
        no_walls: false,
        replay_previous_aciton: 0,
        game_over: false,
        ID_interval: 0,
        motion_vector: {
            coordinate: "x",
            shift_number: -1
        } as motionVector,
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
    move(): void {

        // 1. update coordinate
        let coordinate = this.MOVEMENT_SETTINGS.motion_vector.coordinate;
        let shift_number = this.MOVEMENT_SETTINGS.motion_vector.shift_number;
        this.GENERAL_SETTINGS.coordinates.end_cell[coordinate] += shift_number;

        // 2. check new end cell
        let end_cell = snake_layer.getCell(
            this.GENERAL_SETTINGS.coordinates.end_cell.y,
            this.GENERAL_SETTINGS.coordinates.end_cell.x
        ) as HTMLElement;

        if (
            this.MOVEMENT_SETTINGS.no_walls &&
            (end_cell == this.GENERAL_SETTINGS.cells[
                this.GENERAL_SETTINGS.cells.length - 1
            ])
        ) {

            let value;
            switch (coordinate) {
                case "x":
                    value = 1;
                    break;
                case "y":
                    value = this.HTML.querySelectorAll("tr").length;
                    break;
            }

            this.GENERAL_SETTINGS.coordinates.end_cell[coordinate] = value;
            end_cell = snake_layer.getCell(
                this.GENERAL_SETTINGS.coordinates.end_cell.y,
                this.GENERAL_SETTINGS.coordinates.end_cell.x
            ) as HTMLElement;
        }

        switch (end_cell.style.backgroundColor) {
            // new end cell == snake -> end game
            case this.GENERAL_SETTINGS.color:
            case "black":
                this.MOVEMENT_SETTINGS.game_over = true;
                clearInterval(this.MOVEMENT_SETTINGS.ID_interval);
                break;
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

    },

}

// snake layer ------------------------------------------------- //
const snake_layer = {

    // html ---------------------------------------------------- //
    HTML: createElementHTML(
        "table",
        {
            id: "snake_layer",
            style: `position: absolute; top: ${play_field.HTML.clientTop}px;`
        },
    ),

    // general settings ---------------------------------------- //
    GENERAL_SETTINGS: {
        mode: {
            current: "classic" as string,
            list: {
                classic: function (): void {
                },
                no_walls: function (): void {
                    snake.MOVEMENT_SETTINGS.no_walls = true;
                },
                obstacles: function (): void {

                    let index = 3;

                    modes_administrator.started_modes.push(setInterval(
                        (): void => {

                            let score_player = apple_administartor.GENERAL_SETTINGS.score;

                            if (score_player == index) {
                                let empty_cell = snake_layer.getRandomCell("empty");
                                empty_cell.style.backgroundColor = "black";
                                index += 3;
                            }

                        },
                        snake.GENERAL_SETTINGS.speed.list[snake.GENERAL_SETTINGS.speed.current]
                    ));

                }
            } as { [name: string]: (() => void) }
        },
    },

    // get position cell --------------------------------------- //
    getCell(row: number, column: number): HTMLElement {

        let number_rows = this.HTML.querySelectorAll("tr").length;
        let number_columns = this.HTML.querySelectorAll("tr:first-child td").length;

        if (row < 1) row = 1;
        if (row > number_rows) row = number_rows;

        if (column < 1) column = 1;
        if (column > number_columns) column = number_columns;

        return this.HTML.querySelector(
            `tr:nth-child(${row}) td:nth-child(${column})`
        ) as HTMLElement;

    },

    // get random cell ----------------------------------------- //
    getRandomCell(type_cell: "any" | "empty"): HTMLElement {

        // 1. initialisation need variables
        let valid_cell = false;
        let any_cell;

        // 2. get need cell
        while (!valid_cell) {

            // 2.1 get "any" cell
            any_cell = this.getCell(
                Math.floor(Math.random() * 25),
                Math.floor(Math.random() * 25)
            ) as HTMLElement;

            switch (type_cell) {
                case "any":
                    valid_cell = true;
                    break;
                case "empty":
                    if (
                        any_cell.style.backgroundColor == "" ||
                        any_cell.style.backgroundColor == "transparent"
                    ) valid_cell = true;
                    break;
            }

        }

        return any_cell as HTMLElement;

    },

}

// Events ====================================================== //
window.addEventListener("keydown", (event): void | undefined => {

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

    // 2. check new cooridnate and game over status
    let current_coordinate = snake.MOVEMENT_SETTINGS.motion_vector.coordinate;
    if (
        current_coordinate == new_coordinate ||
        snake.MOVEMENT_SETTINGS.game_over
    ) return;

    // 3. set new coordinate and negative
    snake.MOVEMENT_SETTINGS.motion_vector.coordinate = new_coordinate as coordinateVector;
    snake.MOVEMENT_SETTINGS.motion_vector.shift_number = new_shift_number as shiftNumber;

    // 4. launch snake move
    snake.move();
    clearInterval(snake.MOVEMENT_SETTINGS.ID_interval);
    snake.MOVEMENT_SETTINGS.ID_interval = setInterval(
        (): void => { snake.move(); },
        snake.GENERAL_SETTINGS.speed.list[snake.GENERAL_SETTINGS.speed.current]
    );

});

// export ====================================================== //
export { snake, snake_layer };