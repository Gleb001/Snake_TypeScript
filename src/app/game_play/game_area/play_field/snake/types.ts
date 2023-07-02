// types ======================================================= //
type SnakeType = {

    DYNAMIC_SETTINGS: {
        cells: (HTMLTableCellElement | null)[],
        head_cell: {
            x: number,
            y: number,
            update(): HTMLTableCellElement,
        },
        motion_vector: {
            coordinate: CoordinateType,
            shift_number: ShiftNumberType,
            update(
                new_coordinate: CoordinateType,
                new_shift_number: ShiftNumberType
            ): boolean
        },
    },

    launchDraw(): void,
    stopDraw(): boolean,
    draw(): void,
    update(): void,

}
type CoordinateType = "x" | "y"
type ShiftNumberType = -1 | 1

// export ====================================================== //
export {SnakeType, CoordinateType,ShiftNumberType};