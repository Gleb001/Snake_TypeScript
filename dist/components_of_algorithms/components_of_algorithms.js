import modes_administrator from "../game_components/abstractions/modes_administrator.js";
import play_field from "../game_components/game_play/play_field.js";
import { snake, snake_layer } from "../game_components/game_play/snake.js";
import apple_administartor from "../game_components/game_play/apples_administrator.js";
import settings_game from "../game_components/menu_game/settings_game.js";
import miniSyncEngine from "../utility/miniSyncEngine.js";
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
                let duration_animation = 500;
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
                start_game_button.addEventListener("click", () => {
                    play_field.GENERAL_SETTINGS.status = "prepare_game";
                });
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
            setDefaultSettingsForGame() {
                snake.setDefaultMovementSettings();
                apple_administartor.DYNAMIC_SETTINGS.score = 0;
            },
            showSnake() {
                snake.draw();
            },
            createApplesOnPlayField() {
                apple_administartor.createApple(3);
            },
            startMode() {
                let current_mode = modes_administrator.GENERAL_SETTINGS.mode.list[modes_administrator.GENERAL_SETTINGS.mode.current];
                snake.DYNAMIC_SETTINGS.losing_colors = current_mode.losing_colors;
                current_mode.mode_func();
            },
            enablePlayGame() {
                play_field.GENERAL_SETTINGS.status = "game_play";
            },
        },
        trigger() {
            return play_field.GENERAL_SETTINGS.status == "prepare_game";
        },
        name_next: "end_game",
    },
    end_game: {
        components: {
            breakWorkModes() {
                modes_administrator.breakWorkAsyncModes();
            },
            stopMovingSnake() {
                clearInterval(snake.DYNAMIC_SETTINGS.ID_interval);
            },
            hideGamePlay() {
                let state_game__container = document.querySelector(".state_game__container");
                let play_field__container = document.querySelector(".play_field__container");
                let duration_animation = 500;
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
            return play_field.GENERAL_SETTINGS.status == "game_over";
        },
        name_next: "add_settings_game"
    },
};
export default components_of_algorithms;
