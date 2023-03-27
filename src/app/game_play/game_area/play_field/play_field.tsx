// typescript ================================================== //
interface PlayFieldType extends JSX.ObjectComponentHTML<
    HTMLTableElement
> {

    number_columns: number,
    number_rows: number,

    launchDrawScripts: (() => void)[],
    updateScripts: (() => void)[],
    stopDrawScripts: (() => boolean)[],
    drawElementScripts: (() => void)[],

    getCell(x: number, y: number): HTMLTableCellElement | null,
    randomEmptyCell: HTMLTableCellElement | null,

    draw(): void,
    endGame(): void,
    timeoutID?: ReturnType<typeof setTimeout>,
    status: "play_game" | "wait",

}

// imports ===================================================== //
import "./play_field.css";
import Snake from "./snake/snake";
import Fruits from "./fruits/fruits";
import createHTMLElement from "jsx";
import GENERAL_SETTINGS_GAME from "settings_game";

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

    getCell(x, y) { return this.HTML.rows[y].cells[x]; },
    get randomEmptyCell() {

        let cells = Array.from(this.HTML.querySelectorAll("td"));

        let cell = null;
        while (!cell) {

            let number_cells = cells.length;
            if (number_cells < 1) break;

            let index = Math.floor(Math.random() * number_cells);
            cell = cells[index];
            if (cell?.className != "") {
                cells.splice(index, 1);
                cell = null;
            }

        }

        return cell;

    },
    get number_rows() { return this.HTML.rows.length; },
    get number_columns() { return this.HTML.rows[0].cells.length; },

};

// export ====================================================== //
export default PlayField;