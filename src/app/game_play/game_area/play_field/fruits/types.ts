// types ======================================================= //
interface FruitsType {

    HTML: HTMLInputElement,
    cells: HTMLTableCellElement[],

    launchDraw(): void,
    update(): void,
    stopDraw(): boolean,
    draw(): void,

}

// export ====================================================== //
export {FruitsType};