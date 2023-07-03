// imports ===================================================== //
// libs
import createHTMLElement from "@libs/jsx";
import inSeries from "@libs/functions_execution";
// components
import "./styles.css";
import {PlayFieldType} from "./types";
import "./obstacle";
import Snake from "./snake";
import Fruits from "./fruits";

// main ======================================================== //
let PlayField: PlayFieldType = {

    render({}, [tbody]) {
        this.HTML.append(tbody);
        inSeries(...this.scripts.launch);
    },
    draw() {
        inSeries(...this.scripts.update);

        let isEndGame = this.scripts.end.some(end => end());
        isEndGame ? this.isPlay = false : inSeries(...this.scripts.draw);
    },
    getCell(x, y) {
        let range_has_x = x > 0 || x < this.number_columns;
        let range_has_y = y > 0 || y < this.number_rows;
        let hasRangeCell = (range_has_x || range_has_y);
        
        return hasRangeCell ? this.HTML.rows[y].cells[x] : null;
    },

    HTML: <table id="play_field"></table>,
    isPlay: false,
    scripts: {
        draw:   [ () => Fruits.draw(),       () => Snake.draw()       ],
        update: [ () => Fruits.update(),     () => Snake.update()     ],
        end:    [ () => Fruits.stopDraw(),   () => Snake.stopDraw()   ],
        launch: [ () => Fruits.launchDraw(), () => Snake.launchDraw() ],
    },
    get number_rows()    { return this.HTML.rows.length;          },
    get number_columns() { return this.HTML.rows[0].cells.length; },
    get randomEmptyCell() {

        let cells = Array.from(this.HTML.querySelectorAll("td"));
        let cell = null;
        console.log(cell);

        let number_cells = cells.length;
        while (number_cells && !cell) {
            let index = Math.floor(Math.random() * number_cells);
            let check_cell = cells[index];

            check_cell.className ? cells.splice(index, 1) : cell = check_cell;
            number_cells--;
        }

        return cell;

    },
};

// export ====================================================== //
export default PlayField;