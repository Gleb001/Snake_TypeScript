
// typescript ================================================== //
type sizeCellList = "small" | "medium" | "huge"

// imports ===================================================== //

// utility ----------------------------------------------------- //
import createElementHTML from "../../utility/work_with_html.js";

// main ======================================================== //
const play_field = {

    HTML: createElementHTML( "table", { id: "play_field" }, ),

    GENERAL_SETTINGS: {
        size_cell: {
            current: "medium",
            list: {
                small: 0.05,
                medium: 0.04,
                huge: 0.03,
            } as { [name: string]: number }
        },
        status: "game_over" as "game_play" | "game_over" | "prepare_game"
    },

    get inner_html(): string {

        // 1. set number cells on the sides playing field
        let play_field__container = document.querySelector(
            ".play_field__container"
        ) as HTMLElement;
        if (!play_field__container) return "";
        let size_cell = this.size_cell;

        let number_line_cells = Math.trunc(
            play_field__container.offsetWidth / size_cell
        );
        let number_columns_cells = Math.trunc(
            play_field__container.offsetHeight / size_cell
        );

        // 2. set and return result value
        let index = 0;
        let cells = "";
        while (index < number_line_cells) {
            cells += `<td style="
                width: ${size_cell}px;
                height: ${size_cell}px;
            "></td>`;
            index++;
        }
        index = 0;
        let result = "";
        while (index < number_columns_cells) {
            result += `<tr>${cells}</tr>`;
            index++;
        }

        return result;

    },

    get size_cell(): number {

        let play_field__container = document.querySelector(
            ".play_field__container"
        ) as HTMLElement;
        if (!play_field__container) return 0;
        let width_screen = play_field__container.clientWidth;
        let height_screen = play_field__container.clientHeight;

        let main_side = width_screen;
        if (main_side < height_screen) main_side = height_screen;
        let size_cell = main_side * this.GENERAL_SETTINGS.size_cell.list[
            this.GENERAL_SETTINGS.size_cell.current
        ];

        if (size_cell < 30) {
            size_cell = 30;
        } else if (size_cell > 60) {
            size_cell = 60;
        }

        return size_cell;

    },

}

// export ====================================================== //
export default play_field;