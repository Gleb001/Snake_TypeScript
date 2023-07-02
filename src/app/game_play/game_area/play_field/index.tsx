// imports ===================================================== //
// libs
import createHTMLElement from "jsx";
import GENERAL_SETTINGS_GAME from "settings_game";
// components
import "./styles.css";
import {PlayFieldType} from "./types";
import "./obstacle";
import Snake from "./snake";
import Fruits from "./fruits";

// main ======================================================== //
let PlayField: PlayFieldType = {

    HTML: <table id="play_field"></table>,
    status: "wait",
    launchDrawScripts: [
        () => Fruits.launchDraw(),
        () => Snake.launchDraw(),
    ],
    updateScripts: [
        () => { Fruits.update() },
        () => { Snake.update() },
    ],
    stopDrawScripts: [
        () => { return Fruits.stopDraw() },
        () => { return Snake.stopDraw() },
    ],
    drawElementScripts: [
        () => Fruits.draw(),
        () => Snake.draw(),
    ],

    render(props, [tbody]) {

        let endGame = this.endGame;
        this.endGame = () => {
            endGame();
            props.endGame();
        };

        this.HTML.append(tbody);
        for (let launchDraw of this.launchDrawScripts) launchDraw();

        return this.HTML;

    },
    draw() {

        if (this.timeoutID) clearTimeout(this.timeoutID);

        for (let update of this.updateScripts) update();
        if (this.stopDrawScripts.some(stopDraw => stopDraw())) return this.endGame();
        for (let drawElement of this.drawElementScripts) drawElement();

        this.timeoutID = setTimeout(
            () => this.draw(),
            GENERAL_SETTINGS_GAME.get("snake", "speed")
        );

    },
    endGame() {
        PlayField.status = "wait";
    },

    getCell(x, y) {

        let range_has_x = x > 0 || x < this.number_columns;
        let range_has_y = y > 0 || y < this.number_rows;

        let cell = null
        if (range_has_x || range_has_y) cell = this.HTML.rows[y].cells[x];

        return cell;
        
    },
    get randomEmptyCell() {

        let cells = Array.from(this.HTML.querySelectorAll("td"));
        let skip_cell = this.getCell(
            Snake.DYNAMIC_SETTINGS.head_cell.x + 1,
            Snake.DYNAMIC_SETTINGS.head_cell.y + 1,
        );

        let cell = null;
        let number_cells = cells.length;
        while (number_cells == 0 || !cell) {

            let index = Math.floor(Math.random() * number_cells);
            let check_cell = cells[index];

            if (check_cell?.className != "" || check_cell == skip_cell) {
                cells.splice(index, 1);
            } else {
                cell = check_cell;
            }

        }

        return cell;

    },
    get number_rows() { return this.HTML.rows.length; },
    get number_columns() { return this.HTML.rows[0].cells.length; },

};

// export ====================================================== //
export default PlayField;