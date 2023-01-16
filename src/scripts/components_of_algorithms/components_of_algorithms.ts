
// typescript ================================================== //

// types ------------------------------------------------------- //
type ComponentsOfAlgorithms = {
    [name: string]: {
        components: { [name: string]: () => void },
        trigger?: () => boolean,
        name_next?: string
    }
}

// imports ===================================================== //

// abstractions ------------------------------------------------ //
import modes_administrator from "../game_components/abstractions/modes_administrator.js";

// elements ---------------------------------------------------- //
import play_field from "../game_components/game_play/play_field.js";
import { snake, snake_layer } from "../game_components/game_play/snake.js";
import apple_administartor from "../game_components/game_play/apples_administrator.js";
import settings_game from "../game_components/menu_game/settings_game.js";

// utility ----------------------------------------------------- //
import miniSyncEngine from "../utility/miniSyncEngine.js";

// main ======================================================== //
const components_of_algorithms = {

    add_settings_game: {
        components: {
            createMenuGame() {

                // 1. create menu_game
                let game_container = document.querySelector(
                    ".game_container"
                ) as HTMLElement;
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

                // 2. add settings game
                settings_game.addSettingsGame();

            },
            showMenuGame() {

                // 1. get menu game
                let menu_game = document.getElementById(
                    "menu_game"
                ) as HTMLElement;

                let duration_animation = 500;
                miniSyncEngine.executionDelay((): void => {

                    menu_game.style.animation = `
                        appear ${duration_animation}ms linear forwards
                    `;

                    setTimeout((): void => {
                        menu_game.style.animation = "";
                    }, duration_animation);

                }, duration_animation);

            },
            addEventClickForButtonStartGame() {

                let start_game_button = document.getElementById(
                    "start_game_button"
                ) as HTMLElement;

                start_game_button.addEventListener(
                    "click", () => {
                        play_field.GENERAL_SETTINGS.status = "game_play";
                    }
                );

            },
        },
        name_next: "start_game",
    },

    start_game: {
        components: {
            // game container ---------------------------------- //
            clearGameContainer() {

                // 1. get game container
                let menu_game = document.getElementById(
                    "menu_game"
                ) as HTMLElement;

                // 2. set appear animation for children game container
                let duration_animation = 1000;
                miniSyncEngine.executionDelay((): void => {

                    menu_game.style.animation = `
                        disappear ${duration_animation}ms linear forwards
                    `;

                    setTimeout(
                        (): void => { menu_game.remove(); },
                        duration_animation
                    );

                }, duration_animation);

            },
            // playing field ----------------------------------- //
            createPlayFieldAndSnakeLayer() {

                // 1. get game_container
                let game_container = document.querySelector(
                    ".game_container"
                ) as HTMLElement;
                game_container.style.opacity = "1";

                // 2. add game playing elements
                game_container.innerHTML = `
                    <div class="state_game__container">
                        <div class="score_player"></div>
                    </div>
                    <div class="play_field__container"></div>
                `;

                // 3. add play field and snake
                let play_field__container = document.querySelector(
                    ".play_field__container"
                ) as HTMLElement;
                play_field.HTML.innerHTML = play_field.inner_html;
                snake_layer.HTML.innerHTML = play_field.inner_html;
                play_field__container.append(play_field.HTML);
                play_field__container.append(snake_layer.HTML);

                // 4. add apple administator
                let score_player = document.querySelector(
                    ".score_player"
                ) as HTMLElement;
                score_player.append(apple_administartor.HTML);

                // animation appear game playing elements
                let duration_animation = 1000;
                miniSyncEngine.executionDelay((): void => {
                    game_container.style.animation = `
                        appear ${duration_animation}ms linear forwards
                    `;
                    setTimeout((): void => {
                        game_container.style.animation = "";
                    }, duration_animation)
                }, duration_animation);

            },
            // snake ------------------------------------------- //
            showSnake() {
                snake.MOVEMENT_SETTINGS.motion_vector.coordinate = "x";
                snake.MOVEMENT_SETTINGS.motion_vector.shift_number = -1;
                snake.MOVEMENT_SETTINGS.losing_colors = [
                    snake.GENERAL_SETTINGS.color
                ];
                snake.GENERAL_SETTINGS.cells = [];
                snake_layer.GENERAL_SETTINGS.floating_limit = false;
                snake.draw();
            },
            // apple administrator ----------------------------- //
            createApplesOnPlayField() {
                apple_administartor.createApple(3);
            },
            // snake layer ------------------------------------- //
            startMode() {
                modes_administrator.GENERAL_SETTINGS.mode.list[
                    modes_administrator.GENERAL_SETTINGS.mode.current
                ]();
            },
        },
        trigger() {
            return play_field.GENERAL_SETTINGS.status == "game_play";
        },
        name_next: "end_game",
    },

    end_game: {
        components: {
            breakWorkModes() {
                modes_administrator.breakWorkModes();
            },
            hideGamePlay() {

                // 1. get state game container and play field container
                let state_game__container = document.querySelector(
                    ".state_game__container"
                ) as HTMLElement;
                let play_field__container = document.querySelector(
                    ".play_field__container"
                ) as HTMLElement;

                // 2. hide containers
                let duration_animation = 500;
                miniSyncEngine.executionDelay((): void => {

                    state_game__container.style.animation =
                        play_field__container.style.animation = `
                        disappear ${duration_animation}ms linear forwards
                    `;

                    setTimeout((): void => {
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

} as ComponentsOfAlgorithms;

// export ====================================================== //
export default components_of_algorithms;