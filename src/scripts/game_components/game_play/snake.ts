
// typescript entities ========================================= //
type coordinateVector = "x" | "y"
type shiftNumber = -1 | 1
type motionVector = {
    coordinate: coordinateVector,
    shift_number: shiftNumber,
}
type speedSnakeList = "low" | "normal" | "fast" | "very fast"
type speedSanke = {
    current: speedSnakeList,
    list: { [name: string | speedSnakeList]: number },
}

// imports ===================================================== //

// utility ----------------------------------------------------- //
import createElementHTML from "../../utility/work_with_html.js"

// elements ---------------------------------------------------- //
import play_field from "./play_field.js";
import apple_administartor from "./apples_administrator.js";
import Range from "../../utility/work_with_range.js";

// main ======================================================== //
const snake = {

    HTML: createElementHTML("div", { id: "snake" },),

    GENERAL_SETTINGS: {
        speed: {
            current: "normal",
            list: {
                low: 140,
                normal: 100,
                fast: 85,
                "very fast": 70,
            },
        } as speedSanke,
        color: "rgb(53, 65, 181)",
    },

    DYNAMIC_SETTINGS: {
        ID_interval: 0,
        losing_colors: [] as string[],
        motion_vector: { coordinate: "x", shift_number: -1 } as motionVector,
        cells: {
            list: [] as HTMLTableCellElement[],
            floating_limit: false,
            coordinates: {
                start_cell: { x: 0, y: 0, },
                end_cell: { x: 0, y: 0, },
            },
        }
    },

    draw(): void {

        // 1. get y and x coordinates
        let number_rows = snake_layer.HTML.querySelectorAll("tr").length;
        let y_coordinate = Math.trunc(number_rows / 2) + 1;
        let x_coordinate = 4;

        // 2. set start cell
        this.DYNAMIC_SETTINGS.cells.coordinates.start_cell.x = x_coordinate;
        this.DYNAMIC_SETTINGS.cells.coordinates.start_cell.y = y_coordinate;

        // 3. draw all snake cells
        while (x_coordinate < 8) {

            ++x_coordinate;

            let cell_snake = snake_layer.getCell(y_coordinate, x_coordinate);
            cell_snake.style.backgroundColor = this.GENERAL_SETTINGS.color;
            this.DYNAMIC_SETTINGS.cells.list.push(cell_snake as never);

        }

        // 4. set end cell
        this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.y = y_coordinate;
        this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.x = x_coordinate;

    },

    move(): void {

        // 1. check on game over status
        if (play_field.GENERAL_SETTINGS.status != "game_play") {
            clearInterval(snake.DYNAMIC_SETTINGS.ID_interval);
        };

        // 2. update end coordinate
        __updateEndCoordinate();

        // 3. get next cell by new coordinate
        let next_cell = snake_layer.getCell(
            this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.y,
            this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.x
        );

        // 4. check color next cell
        let color_next_cell = next_cell.style.backgroundColor;
        console.log(color_next_cell);
        if (this.DYNAMIC_SETTINGS.losing_colors.indexOf(color_next_cell) != -1) {
            // new end cell == snake -> end game
            play_field.GENERAL_SETTINGS.status = "game_over";
            return;
        } else if (color_next_cell == apple_administartor.GENERAL_SETTINGS.color) {
            // new end cell == apple -> create apple
            apple_administartor.createApple(1);
            apple_administartor.updateScore();
        } else {
            // new end cell == ordinary cell -> clear start cell
            let start_cell = this.DYNAMIC_SETTINGS.cells.list[0] as HTMLElement;
            start_cell.style.backgroundColor = "transparent";
            this.DYNAMIC_SETTINGS.cells.list.shift();
        }

        // 5. change color next cell and push next cell in cell storage
        next_cell.style.backgroundColor = this.GENERAL_SETTINGS.color;
        this.DYNAMIC_SETTINGS.cells.list.push(next_cell as never);

        // additional functions -------------------------------- //
        function __updateEndCoordinate(): void {

            // 1. get value coordinate
            let coordinate = snake.DYNAMIC_SETTINGS.motion_vector.coordinate;
            let shift_number = snake.DYNAMIC_SETTINGS.motion_vector.shift_number;
            let value_coordinate = snake.DYNAMIC_SETTINGS.cells.coordinates.end_cell[coordinate] + shift_number;

            // 2. get numbers counted elements
            let counted_elements;
            if (coordinate == "x") counted_elements = "tr:first-child td";
            else counted_elements = "tr";

            let number_counted_elements = snake_layer.HTML.querySelectorAll(counted_elements).length;

            // 3. set the coordinate of the end cell using       //
            // the range constant ------------------------------ //
            snake.DYNAMIC_SETTINGS.cells.coordinates.end_cell[
                coordinate
            ] = Range.getNumberInRange({
                start_number: 1,
                finish_number: number_counted_elements,
                check_number: value_coordinate,
                floating_range: snake.DYNAMIC_SETTINGS.cells.floating_limit
            });

        };

    },

    setDefaultMovementSettings(): void {

        this.DYNAMIC_SETTINGS.losing_colors = [];
        this.DYNAMIC_SETTINGS.motion_vector.coordinate = "x";
        this.DYNAMIC_SETTINGS.motion_vector.shift_number = -1;

        this.DYNAMIC_SETTINGS.cells.list = [];
        this.DYNAMIC_SETTINGS.cells.floating_limit = false;
        this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.y = 0;
        this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.x = 0;

    },

}
const snake_layer = {

    HTML: createElementHTML(
        "table",
        {
            id: "snake_layer",
            style: `position: absolute; top: ${play_field.HTML.clientTop}px;`
        },
    ),

    getCell(row: number, column: number): HTMLTableCellElement {

        return this.HTML.querySelector(
            `tr:nth-child(${__getNumberOnRange(
                1, this.HTML.querySelectorAll("tr").length, row
            )
            }) td:nth-child(${__getNumberOnRange(
                1, this.HTML.querySelectorAll("tr:first-child td").length, column
            )
            })`
        ) as HTMLTableCellElement;

        // additional function -------------------------------- //
        function __getNumberOnRange(
            from_number: number,
            to_number: number,
            check_number: number
        ): number {
            if (check_number < from_number) check_number = from_number;
            if (check_number > to_number) check_number = to_number;
            return check_number;
        }

    },

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
    let current_coordinate = snake.DYNAMIC_SETTINGS.motion_vector.coordinate;
    if (
        current_coordinate == new_coordinate ||
        play_field.GENERAL_SETTINGS.status != "game_play"
    ) return;

    // 3. set new coordinate and negative
    snake.DYNAMIC_SETTINGS.motion_vector.coordinate = new_coordinate as coordinateVector;
    snake.DYNAMIC_SETTINGS.motion_vector.shift_number = new_shift_number as shiftNumber;

    // 4. launch snake move
    snake.move();

    clearInterval(snake.DYNAMIC_SETTINGS.ID_interval);
    snake.DYNAMIC_SETTINGS.ID_interval = setInterval(
        (): void => { snake.move(); },
        snake.GENERAL_SETTINGS.speed.list[snake.GENERAL_SETTINGS.speed.current]
    );

});

// export ====================================================== //
export { snake, snake_layer };