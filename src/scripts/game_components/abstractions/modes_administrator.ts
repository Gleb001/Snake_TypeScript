
// typescript entities ========================================= //

// types ------------------------------------------------------- //
type Mode_GS = {
    current: string,
    list: { [name: string]: (() => void) }
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
                classic: function () {
                    null;
                }, // good!
                "no walls": function () {
                    snake_layer.GENERAL_SETTINGS.floating_limit = true;
                },
                obstacles: function () {

                    // 1. change losing colors in snake movement settings
                    let color_obstacle = "white";
                    snake.MOVEMENT_SETTINGS.losing_colors = [
                        color_obstacle,
                        snake.GENERAL_SETTINGS.color
                    ];

                    // 2. add mode
                    let index = 3;
                    modes_administrator.started_modes.push(setInterval(
                        (): void => {

                            let score_player = apple_administartor.GENERAL_SETTINGS.score;

                            if (score_player == index) {
                                let empty_cell = snake_layer.getRandomCell("empty");
                                empty_cell.style.backgroundColor = color_obstacle;
                                index += 3;
                            }

                        }, 20
                    ));

                }, // good!
                hippi: function () {
                    snake.MOVEMENT_SETTINGS.losing_colors = [];
                    snake_layer.GENERAL_SETTINGS.floating_limit = true;
                }
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