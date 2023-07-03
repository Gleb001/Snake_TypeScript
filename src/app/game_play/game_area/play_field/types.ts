// types ======================================================= //
type NameScriptType = "update" | "draw" | "end" | "launch"
interface PlayFieldType extends JSX.ObjectComponentHTML<
    HTMLTableElement, {}
> {

    number_columns: number,
    number_rows: number,

    isPlay: boolean,

    timeoutID?: ReturnType<typeof setTimeout>,

    scripts: { [key: NameScriptType | string]: (() => void)[]}

    getCell(x: number, y: number): HTMLTableCellElement | null,
    randomEmptyCell: HTMLTableCellElement | null,

    draw(): void,

}

// export ====================================================== //
export {PlayFieldType};