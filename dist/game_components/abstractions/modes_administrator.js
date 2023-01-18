import apple_administartor from "../game_play/apples_administrator.js";
import { snake, snake_layer } from "../game_play/snake.js";
let modes_administrator = {
    started_async_modes: [],
    GENERAL_SETTINGS: {
        mode: {
            current: "classic",
            list: {
                classic: {
                    losing_colors: [
                        snake.GENERAL_SETTINGS.color
                    ],
                    mode_func() {
                        snake.DYNAMIC_SETTINGS.cells.floating_limit = false;
                    }
                },
                "no walls": {
                    losing_colors: [
                        snake.GENERAL_SETTINGS.color
                    ],
                    mode_func() {
                        snake.DYNAMIC_SETTINGS.cells.floating_limit = true;
                    }
                },
                obstacles: {
                    losing_colors: [
                        "black",
                        snake.GENERAL_SETTINGS.color
                    ],
                    mode_func() {
                        let index = 3;
                        modes_administrator.started_async_modes.push(setInterval(() => {
                            let score_player = apple_administartor.DYNAMIC_SETTINGS.score;
                            if (score_player == index) {
                                let empty_cell = snake_layer.getRandomCell("empty");
                                empty_cell.style.backgroundColor = "black";
                                index += 3;
                            }
                        }, 20));
                    }
                },
                hippi: {
                    losing_colors: [],
                    mode_func() {
                        apple_administartor.DYNAMIC_SETTINGS.score = 0;
                        snake.DYNAMIC_SETTINGS.cells.floating_limit = true;
                    }
                },
            }
        }
    },
    breakWorkAsyncModes() {
        this.started_async_modes.forEach(mode => clearInterval(mode));
    },
};
export default modes_administrator;
