
// typescript entities ========================================= //

// types ------------------------------------------------------- //
type Mode_GS = {
    current: string,
    list: ListModes
}
type ListModes = {
    [name: string]: {
        losing_colors: string[],
        mode_func: (() => void)
    }
}

// imports ===================================================== //

// elements ---------------------------------------------------- //
import apple_administartor from "../game_play/apples_administrator.js";
import { snake, snake_layer } from "../game_play/snake.js";

// main ======================================================== //

// modes administrator ----------------------------------------- //
let modes_administrator = {

    // started_modes ------------------------------------------- //
    started_modes: [] as number[],

    // general settings ---------------------------------------- //
    GENERAL_SETTINGS: {
        mode: {
            current: "classic",
            list: {
                classic: {
                    losing_colors: [
                        snake.GENERAL_SETTINGS.color
                    ] as string[],
                    mode_func() {
                        snake_layer.GENERAL_SETTINGS.floating_limit = false;
                    }
                },
                "no walls": {
                    losing_colors: [
                        snake.GENERAL_SETTINGS.color
                    ],
                    mode_func() {
                        snake_layer.GENERAL_SETTINGS.floating_limit = true;
                    }
                },
                obstacles: {
                    losing_colors: [
                        "white",
                        snake.GENERAL_SETTINGS.color
                    ],
                    mode_func() {

                        let index = 3;
                        modes_administrator.started_modes.push(setInterval(
                            (): void => {

                                let score_player = apple_administartor.GENERAL_SETTINGS.score;

                                if (score_player == index) {
                                    let empty_cell = snake_layer.getRandomCell("empty");
                                    empty_cell.style.backgroundColor = "white";
                                    index += 3;
                                }

                            }, 20
                        ));

                    }
                },
                hippi: {
                    losing_colors: [],
                    mode_func() {
                        apple_administartor.GENERAL_SETTINGS.score = 0;
                        snake_layer.GENERAL_SETTINGS.floating_limit = true;
                    }
                },
            }
        } as Mode_GS
    },

    // clear modes --------------------------------------------- //
    breakWorkModes() {
        this.started_modes.forEach(mode => clearInterval(mode));
    },

};

// export ====================================================== //
export default modes_administrator;