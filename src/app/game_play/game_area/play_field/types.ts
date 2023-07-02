// types ======================================================= //
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

// export ====================================================== //
export {PlayFieldType};