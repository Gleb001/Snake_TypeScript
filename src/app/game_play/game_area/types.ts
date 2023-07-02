// types ======================================================= //
interface GameAreaType extends JSX.ObjectComponentHTML<
    HTMLDivElement,
    { endGame(): void }
> {
    width: number,
    height: number,
    // status: "wait_game" | "game_play" | "game_over",
}

// export ====================================================== //
export {GameAreaType};