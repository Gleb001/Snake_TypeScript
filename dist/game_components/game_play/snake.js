import createElementHTML from "../../utility/work_with_html.js";
import play_field from "./play_field.js";
import apple_administartor from "./apples_administrator.js";
import Range from "../../utility/work_with_range.js";
const snake = {
    HTML: createElementHTML("div", { id: "snake" }),
    GENERAL_SETTINGS: {
        speed: {
            current: "normal",
            list: {
                low: 140,
                normal: 100,
                fast: 85,
                "very fast": 70,
            },
        },
        color: "rgb(53, 65, 181)",
    },
    DYNAMIC_SETTINGS: {
        ID_interval: 0,
        losing_colors: [],
        motion_vector: { coordinate: "x", shift_number: -1 },
        cells: {
            list: [],
            floating_limit: false,
            coordinates: {
                start_cell: { x: 0, y: 0, },
                end_cell: { x: 0, y: 0, },
            },
        }
    },
    draw() {
        let number_rows = snake_layer.HTML.querySelectorAll("tr").length;
        let y_coordinate = Math.trunc(number_rows / 2) + 1;
        let x_coordinate = 4;
        this.DYNAMIC_SETTINGS.cells.coordinates.start_cell.x = x_coordinate;
        this.DYNAMIC_SETTINGS.cells.coordinates.start_cell.y = y_coordinate;
        while (x_coordinate < 8) {
            ++x_coordinate;
            let cell_snake = snake_layer.getCell(y_coordinate, x_coordinate);
            cell_snake.style.backgroundColor = this.GENERAL_SETTINGS.color;
            this.DYNAMIC_SETTINGS.cells.list.push(cell_snake);
        }
        this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.y = y_coordinate;
        this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.x = x_coordinate;
    },
    move() {
        if (play_field.GENERAL_SETTINGS.status != "game_play") {
            clearInterval(snake.DYNAMIC_SETTINGS.ID_interval);
        }
        ;
        __updateEndCoordinate();
        let next_cell = snake_layer.getCell(this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.y, this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.x);
        let color_next_cell = next_cell.style.backgroundColor;
        console.log(color_next_cell);
        if (this.DYNAMIC_SETTINGS.losing_colors.indexOf(color_next_cell) != -1) {
            play_field.GENERAL_SETTINGS.status = "game_over";
            return;
        }
        else if (color_next_cell == apple_administartor.GENERAL_SETTINGS.color) {
            apple_administartor.createApple(1);
            apple_administartor.updateScore();
        }
        else {
            let start_cell = this.DYNAMIC_SETTINGS.cells.list[0];
            start_cell.style.backgroundColor = "transparent";
            this.DYNAMIC_SETTINGS.cells.list.shift();
        }
        next_cell.style.backgroundColor = this.GENERAL_SETTINGS.color;
        this.DYNAMIC_SETTINGS.cells.list.push(next_cell);
        function __updateEndCoordinate() {
            let coordinate = snake.DYNAMIC_SETTINGS.motion_vector.coordinate;
            let shift_number = snake.DYNAMIC_SETTINGS.motion_vector.shift_number;
            let value_coordinate = snake.DYNAMIC_SETTINGS.cells.coordinates.end_cell[coordinate] + shift_number;
            let counted_elements;
            if (coordinate == "x")
                counted_elements = "tr:first-child td";
            else
                counted_elements = "tr";
            let number_counted_elements = snake_layer.HTML.querySelectorAll(counted_elements).length;
            snake.DYNAMIC_SETTINGS.cells.coordinates.end_cell[coordinate] = Range.getNumberInRange({
                start_number: 1,
                finish_number: number_counted_elements,
                check_number: value_coordinate,
                floating_range: snake.DYNAMIC_SETTINGS.cells.floating_limit
            });
        }
        ;
    },
    setDefaultMovementSettings() {
        this.DYNAMIC_SETTINGS.losing_colors = [];
        this.DYNAMIC_SETTINGS.motion_vector.coordinate = "x";
        this.DYNAMIC_SETTINGS.motion_vector.shift_number = -1;
        this.DYNAMIC_SETTINGS.cells.list = [];
        this.DYNAMIC_SETTINGS.cells.floating_limit = false;
        this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.y = 0;
        this.DYNAMIC_SETTINGS.cells.coordinates.end_cell.x = 0;
    },
};
const snake_layer = {
    HTML: createElementHTML("table", {
        id: "snake_layer",
        style: `position: absolute; top: ${play_field.HTML.clientTop}px;`
    }),
    getCell(row, column) {
        return this.HTML.querySelector(`tr:nth-child(${__getNumberOnRange(1, this.HTML.querySelectorAll("tr").length, row)}) td:nth-child(${__getNumberOnRange(1, this.HTML.querySelectorAll("tr:first-child td").length, column)})`);
        function __getNumberOnRange(from_number, to_number, check_number) {
            if (check_number < from_number)
                check_number = from_number;
            if (check_number > to_number)
                check_number = to_number;
            return check_number;
        }
    },
    getRandomCell(type_cell) {
        let valid_cell = false;
        let any_cell;
        while (!valid_cell) {
            any_cell = this.getCell(Math.floor(Math.random() * 25), Math.floor(Math.random() * 25));
            switch (type_cell) {
                case "any":
                    valid_cell = true;
                    break;
                case "empty":
                    if (any_cell.style.backgroundColor == "" ||
                        any_cell.style.backgroundColor == "transparent")
                        valid_cell = true;
                    break;
            }
        }
        return any_cell;
    },
};
window.addEventListener("keydown", (event) => {
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
    let current_coordinate = snake.DYNAMIC_SETTINGS.motion_vector.coordinate;
    if (current_coordinate == new_coordinate ||
        play_field.GENERAL_SETTINGS.status != "game_play")
        return;
    snake.DYNAMIC_SETTINGS.motion_vector.coordinate = new_coordinate;
    snake.DYNAMIC_SETTINGS.motion_vector.shift_number = new_shift_number;
    snake.move();
    clearInterval(snake.DYNAMIC_SETTINGS.ID_interval);
    snake.DYNAMIC_SETTINGS.ID_interval = setInterval(() => { snake.move(); }, snake.GENERAL_SETTINGS.speed.list[snake.GENERAL_SETTINGS.speed.current]);
});
export { snake, snake_layer };
