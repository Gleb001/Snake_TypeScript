// types ======================================================= //
interface GameAreaType extends JSX.ObjectComponentHTML<
    HTMLDivElement,
    { endGame(): void }
> {
    width: () => number,
    height: () => number,
    mode_game: () => {
        obstacles: string[],
        mode_func: (...args: any) => void
    },
    duration_redraw: () => number,
}

// export ====================================================== //
export {GameAreaType};