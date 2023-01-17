
// typescript entities ========================================= //

// types ------------------------------------------------------- //
type coordinateVector = "x" | "y"
type shiftNumber = -1 | 1
type motionVector = {
    coordinate: coordinateVector,
    shift_number: shiftNumber,
}

// imports ===================================================== //

// utility ----------------------------------------------------- //
import createElementHTML from "../../utility/work_with_html.js"

// elements ---------------------------------------------------- //
import play_field from "./play_field.js";
import apple_administartor from "./apples_administrator.js";

// main ======================================================== //

// snake ------------------------------------------------------- //
const snake = {

    // html ---------------------------------------------------- //
    HTML: createElementHTML("div", { id: "snake" },),

    // general settings ---------------------------------------- //
    GENERAL_SETTINGS: {
        speed: {
            current: "normal",
            list: {
                low: 140,
                normal: 100,
                fast: 85,
                "very fast": 70,
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
        ID_interval: 0,
        losing_colors: [] as string[],
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
    // move
    move(): void {

        // 1. check on game over status
        if (play_field.GENERAL_SETTINGS.status == "game_over") return;

        // 2. update end coordinate --> get next cell
        this.__updateEndCoordinate();
        let next_cell = snake_layer.getCell(
            this.GENERAL_SETTINGS.coordinates.end_cell.y,
            this.GENERAL_SETTINGS.coordinates.end_cell.x
        );

        // 3. check color next cell
        let color_next_cell = next_cell.style.backgroundColor;
        if (this.MOVEMENT_SETTINGS.losing_colors.indexOf(color_next_cell) != -1) {
            // new end cell == snake -> end game
            play_field.GENERAL_SETTINGS.status = "game_over";
            clearInterval(this.MOVEMENT_SETTINGS.ID_interval);
            return;
        } else if (color_next_cell == apple_administartor.GENERAL_SETTINGS.color) {
            // new end cell == apple -> create apple
            apple_administartor.createApple(1);
            apple_administartor.updateScore();
        } else {
            // new end cell == ordinary cell -> clear start cell
            let start_cell = this.GENERAL_SETTINGS.cells[0] as HTMLElement;
            start_cell.style.backgroundColor = "transparent";
            this.GENERAL_SETTINGS.cells.shift();
        }

        // 4. change color next cell and push next cell in cell storage
        next_cell.style.backgroundColor = this.GENERAL_SETTINGS.color;
        this.GENERAL_SETTINGS.cells.push(next_cell as never);

    },
    // check coordinate
    __updateEndCoordinate(): void {

        // 1. get the necessary variables
        let coordinate = this.MOVEMENT_SETTINGS.motion_vector.coordinate;
        let shift_number = this.MOVEMENT_SETTINGS.motion_vector.shift_number;
        let value_coordinate = this.GENERAL_SETTINGS.coordinates.end_cell[coordinate] + shift_number;

        let finish_number;
        switch (coordinate) {
            case "x":
                finish_number = snake_layer.HTML.querySelectorAll(
                    "tr:first-child td"
                ).length;
                break;
            case "y":
                finish_number = snake_layer.HTML.querySelectorAll(
                    "tr"
                ).length;
                break;
        }

        // 3. set end_cell coordinate
        this.GENERAL_SETTINGS.coordinates.end_cell[coordinate] = getCoordinateOnRange(
            1, finish_number, value_coordinate
        );

        // additional function --------------------------------- //
        function getCoordinateOnRange(
            start_number: number,
            finish_number: number,
            check_number: number
        ): number {

            let number_below_range = start_number;
            let number_above_range = finish_number;
            if (snake_layer.GENERAL_SETTINGS.floating_limit) {
                number_below_range = finish_number;
                number_above_range = start_number;
            };

            if (check_number < start_number) {
                return number_below_range;
            } else if (check_number > finish_number) {
                return number_above_range;
            } else {
                return check_number;
            }

        }

    },

    // set default settings ------------------------------------ //
    setDefaultSettings(): void {

        // moving settings
        snake.MOVEMENT_SETTINGS.motion_vector.coordinate = "x";
        snake.MOVEMENT_SETTINGS.motion_vector.shift_number = -1;

        // general settings
        snake.GENERAL_SETTINGS.cells = [];
        snake.GENERAL_SETTINGS.coordinates.end_cell.y = 0;
        snake.GENERAL_SETTINGS.coordinates.end_cell.x = 0;
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
        floating_limit: false,
    },

    // get position cell --------------------------------------- //
    getCell(row: number, column: number): HTMLTableCellElement {

        return this.HTML.querySelector(
            `tr:nth-child(${this.__getNumberOnRange(
                1, this.HTML.querySelectorAll("tr").length, row
            )
            }) td:nth-child(${this.__getNumberOnRange(
                1, this.HTML.querySelectorAll("tr:first-child td").length, column
            )
            })`
        ) as HTMLTableCellElement;

    },

    // get number on range ------------------------------------- //
    __getNumberOnRange(
        from_number: number,
        to_number: number,
        check_number: number
    ): number {

        if (check_number < from_number) check_number = from_number;
        if (check_number > to_number) check_number = to_number;
        return check_number;

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
        case "w":
            new_coordinate = "y";
            new_shift_number = -1;
            break;
        case "ArrowDown":
        case "s":
            new_coordinate = "y";
            new_shift_number = 1;
            break;
        case "ArrowRight":
        case "d":
            new_coordinate = "x";
            new_shift_number = 1;
            break;
        case "ArrowLeft":
        case "a":
            new_coordinate = "x";
            new_shift_number = -1;
            break;
        default: return;
    }

    // 2. check new cooridnate and game over status
    let current_coordinate = snake.MOVEMENT_SETTINGS.motion_vector.coordinate;
    if (current_coordinate == new_coordinate) return;

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