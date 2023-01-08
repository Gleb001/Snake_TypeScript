import createElementHTML from "../utility/work_with_html.js";
import play_field from "./play_field.js";
import apple_administartor from "./apples_administrator.js";
const snake = {
    HTML: createElementHTML({
        attributes: { id: "snake", },
    }),
    GENERAL_SETTINGS: {
        speed: 100,
        color: "blue",
        coordinates: {
            start_cell: { x: 0, y: 0, },
            end_cell: { x: 0, y: 0, },
        },
        cells: [],
    },
    MOVEMENT_SETTINGS: {
        availability_of_access: false,
        waiting_for_action: true,
        motion_vector: {
            coordinate: "x",
            shift_number: 1,
        }
    },
    draw() {
        let number_rows = snake_layer.HTML.querySelectorAll("tr").length;
        let y_coordinate = Math.trunc(number_rows / 2) + 1;
        let x_coordinate = 4;
        this.GENERAL_SETTINGS.coordinates.start_cell.x = x_coordinate;
        this.GENERAL_SETTINGS.coordinates.start_cell.y = y_coordinate;
        while (x_coordinate < 8) {
            ++x_coordinate;
            let cell_snake = snake_layer.getCell(y_coordinate, x_coordinate);
            cell_snake.style.backgroundColor = this.GENERAL_SETTINGS.color;
            this.GENERAL_SETTINGS.cells.push(cell_snake);
        }
        this.GENERAL_SETTINGS.coordinates.end_cell.y = y_coordinate;
        this.GENERAL_SETTINGS.coordinates.end_cell.x = x_coordinate;
    },
    startMove() {
        this.MOVEMENT_SETTINGS.availability_of_access = true;
        let ID_INTERVAL = setInterval(() => {
            let coordinate = this.MOVEMENT_SETTINGS.motion_vector.coordinate;
            let shift_number = this.MOVEMENT_SETTINGS.motion_vector.shift_number;
            this.GENERAL_SETTINGS.coordinates.end_cell[coordinate] += shift_number;
            let end_cell = snake_layer.getCell(this.GENERAL_SETTINGS.coordinates.end_cell.y, this.GENERAL_SETTINGS.coordinates.end_cell.x);
            switch (end_cell.style.backgroundColor) {
                case this.GENERAL_SETTINGS.color:
                    clearInterval(ID_INTERVAL);
                    this.MOVEMENT_SETTINGS.availability_of_access = false;
                    this.MOVEMENT_SETTINGS.waiting_for_action = true;
                    this.MOVEMENT_SETTINGS.motion_vector.coordinate = "x";
                    this.MOVEMENT_SETTINGS.motion_vector.shift_number = -1;
                    return;
                case apple_administartor.GENERAL_SETTINGS.color:
                    apple_administartor.createApple(1);
                    apple_administartor.updateScore();
                    break;
                default:
                    let start_cell = this.GENERAL_SETTINGS.cells[0];
                    start_cell.style.backgroundColor = "transparent";
                    this.GENERAL_SETTINGS.cells.shift();
            }
            end_cell.style.backgroundColor = this.GENERAL_SETTINGS.color;
            this.GENERAL_SETTINGS.cells.push(end_cell);
            this.MOVEMENT_SETTINGS.waiting_for_action = true;
        }, this.GENERAL_SETTINGS.speed);
    },
};
const snake_layer = {
    HTML: createElementHTML({
        tag_name: "table",
        attributes: {
            id: "snake_layer",
            style: "position: absolute; top: 0;"
        },
        inner_value: play_field.inner_html
    }),
    getCell(row, column) {
        let number_rows = this.HTML.querySelectorAll("tr").length;
        let number_columns = this.HTML.querySelectorAll("tr:first-child td").length;
        if (row < 1)
            row = 1;
        if (column < 1)
            column = 1;
        if (row > number_rows)
            row = number_rows;
        if (column > number_columns)
            column = number_columns;
        return this.HTML.querySelector(`tr:nth-child(${row}) td:nth-child(${column})`);
    },
};
window.addEventListener("keydown", (event) => {
    if (!snake.MOVEMENT_SETTINGS.waiting_for_action)
        return;
    else
        snake.MOVEMENT_SETTINGS.waiting_for_action = false;
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
    let current_coordinate = snake.MOVEMENT_SETTINGS.motion_vector.coordinate;
    let current_shift_number = snake.MOVEMENT_SETTINGS.motion_vector.shift_number;
    if (current_coordinate == new_coordinate &&
        current_shift_number != new_shift_number)
        return;
    snake.MOVEMENT_SETTINGS.motion_vector.coordinate = new_coordinate;
    snake.MOVEMENT_SETTINGS.motion_vector.shift_number = new_shift_number;
});
export { snake, snake_layer };
