import play_field from "../game_components/game_play/play_field.js";
import { snake, snake_layer } from "../game_components/game_play/snake.js";
import apple_administartor from "../game_components/game_play/apples_administrator.js";
import miniSyncEngine from "../utility/miniSyncEngine.js";
import modes_administrator from "../game_components/game_play/modes_administrator.js";
import settings_game from "../game_components/menu_game/settings_game.js";
let start_game = false;
const components_of_algorithms = {
    add_settings_game: {
        components: {
            createMenuGame() {
                let game_container = document.querySelector(".game_container");
                game_container.innerHTML = `
                    <div id="menu_game" style="opacity: 1">
                        <div class="settings_game__container">
                            <h1 id="game_name">Snake TypeScript</h1>
                            <div id="settings_game"></div>
                            <button id="start_game_button">start game</button>
                        </div>
                        <div id="description_window"></div>
                    </div>
                `;
                settings_game.addSettingsGame();
            },
            showMenuGame() {
                let menu_game = document.getElementById("menu_game");
                let duration_animation = 1000;
                miniSyncEngine.executionDelay(() => {
                    menu_game.style.animation = `
                        appear ${duration_animation}ms linear forwards
                    `;
                    setTimeout(() => {
                        menu_game.style.animation = "";
                    }, duration_animation);
                }, duration_animation);
            },
            addEventClickForButtonStartGame() {
                let start_game_button = document.getElementById("start_game_button");
                start_game = false;
                start_game_button.addEventListener("click", () => { start_game = true; });
            },
        },
        name_next: "start_game",
    },
    start_game: {
        components: {
            clearGameContainer() {
                let menu_game = document.getElementById("menu_game");
                let duration_animation = 1000;
                miniSyncEngine.executionDelay(() => {
                    menu_game.style.animation = `
                        disappear ${duration_animation}ms linear forwards
                    `;
                    setTimeout(() => { menu_game.remove(); }, duration_animation);
                }, duration_animation);
            },
            createPlayFieldAndSnakeLayer() {
                let game_container = document.querySelector(".game_container");
                game_container.style.opacity = "1";
                game_container.innerHTML = `
                    <div class="state_game__container">
                        <div class="score_player"></div>
                    </div>
                    <div class="play_field__container"></div>
                `;
                let play_field__container = document.querySelector(".play_field__container");
                play_field.HTML.innerHTML = play_field.inner_html;
                snake_layer.HTML.innerHTML = play_field.inner_html;
                play_field__container.append(play_field.HTML);
                play_field__container.append(snake_layer.HTML);
                let score_player = document.querySelector(".score_player");
                score_player.append(apple_administartor.HTML);
                let duration_animation = 1000;
                miniSyncEngine.executionDelay(() => {
                    game_container.style.animation = `
                        appear ${duration_animation}ms linear forwards
                    `;
                    setTimeout(() => {
                        game_container.style.animation = "";
                    }, duration_animation);
                }, duration_animation);
            },
            showSnake() {
                snake.MOVEMENT_SETTINGS.motion_vector.coordinate = "x";
                snake.MOVEMENT_SETTINGS.motion_vector.shift_number = -1;
                snake.MOVEMENT_SETTINGS.game_over = false;
                snake.GENERAL_SETTINGS.cells = [];
                console.log(snake);
                snake.draw();
            },
            createApplesOnPlayField() {
                apple_administartor.createApple(3);
            },
            startMode() {
                snake_layer.GENERAL_SETTINGS.mode.list[snake_layer.GENERAL_SETTINGS.mode.current]();
            },
        },
        trigger() {
            if (start_game) {
                return start_game;
            }
        },
        name_next: "end_game",
    },
    end_game: {
        components: {
            breakWorkModes() {
                modes_administrator.breakWorkModes();
            },
            hideGamePlay() {
                let state_game__container = document.querySelector(".state_game__container");
                let play_field__container = document.querySelector(".play_field__container");
                let duration_animation = 1000;
                miniSyncEngine.executionDelay(() => {
                    state_game__container.style.animation =
                        play_field__container.style.animation = `
                        disappear ${duration_animation}ms linear forwards
                    `;
                    setTimeout(() => {
                        state_game__container.remove();
                        play_field__container.remove();
                    }, duration_animation);
                }, duration_animation);
            },
        },
        trigger() {
            return snake.MOVEMENT_SETTINGS.game_over;
        },
        name_next: "add_settings_game"
    },
};
export default components_of_algorithms;
