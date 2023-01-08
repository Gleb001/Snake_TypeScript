import createElementHTML from "../utility/work_with_html.js";
const play_field = {
    HTML: createElementHTML({
        tag_name: "table",
        attributes: { id: "play_field", },
    }),
    get inner_html() {
        let play_field__container = document.querySelector(".play_field__container");
        if (!play_field__container)
            return "";
        let size_cell = this.size_cell;
        let number_line_cells = Math.trunc(play_field__container.offsetWidth / size_cell);
        let number_columns_cells = Math.trunc(play_field__container.offsetHeight / size_cell);
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
    get size_cell() {
        let play_field__container = document.querySelector(".play_field__container");
        if (!play_field__container)
            return 0;
        let width_screen = play_field__container.clientWidth;
        let height_screen = play_field__container.clientHeight;
        let main_side = width_screen;
        if (main_side < height_screen)
            main_side = height_screen;
        let size_cell = main_side * 0.04;
        if (size_cell < 30) {
            size_cell = 30;
        }
        else if (size_cell > 60) {
            size_cell = 60;
        }
        return size_cell;
    },
};
export default play_field;
