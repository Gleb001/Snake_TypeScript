// imports ===================================================== //
import "./main.css";
import MenuGame from "./menu_game/menu_game";
import GamePlay from "./game_play/game_play";
import createHTMLElement from "jsx";

// main ======================================================== //
let game_container = {
    get HTML() {
        return document.querySelector(".game_container") as HTMLDivElement;
    },
    render(
        html_element: HTMLElement,
        exit_animation?: () => void
    ) {
        this.HTML.innerHTML = "";
        this.HTML.append(html_element);

        if (exit_animation) exit_animation();
    },
};

// events window ----------------------------------------------- //
window.addEventListener("load", renderMenuGame);

// additional functions ---------------------------------------- //
function renderMenuGame() {
    game_container.render(
        // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
        <MenuGame startGameEvent={() => {

            let duration_animation = 1000;
            MenuGame.HTML.style.animation = `
                disappear ${duration_animation}ms linear forwards
            `;

            setTimeout(renderGamePlay, duration_animation);

        }} />,
        () => {
            MenuGame.HTML.style.animation = `
                750ms appear linear forwards
            `;
        }
    );
};
function renderGamePlay() {
    game_container.render(
        // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
        <GamePlay endGame={() => {

            let duration_animation = 1000;
            GamePlay.HTML.style.animation = `
                ${duration_animation}ms linear forwards
            `;

            setTimeout(renderMenuGame, duration_animation);

        }} />,
        () => {
            GamePlay.HTML.style.animation = `
                750ms appear linear forwards
            `;
        }
    );
};

// event functions ============================================= //
// let algorithms = {
//     start_game: {
//         components: {
//             renderPlayField() {
//                 play_feild__container.HTML.append(
//                     <play_field.render />,
//                     <snake_layer.render />
//                 );
//             },
//             // snake ------------------------------------------- //
//             setDefaultSettingsForGame() {
//                 snake.setDefaultMovementSettings();
//                 apple_administartor.DYNAMIC_SETTINGS.score = 0;
//             },
//             showSnake() {
//                 snake.draw();
//             },
//             // apple administrator ----------------------------- //
//             createApplesOnPlayField() {
//                 apple_administartor.createApple(3);
//             },
//             // snake layer ------------------------------------- //
//             startMode() {

//                 // 1. get current mode
//                 // let current_mode = modes_administrator.GENERAL_SETTINGS.mode.list[
//                 //     modes_administrator.GENERAL_SETTINGS.mode.current
//                 // ];

//                 // // 2. set losing colors for snake
//                 // snake.DYNAMIC_SETTINGS.losing_colors = current_mode.losing_colors;

//                 // // 3. start mode function
//                 // current_mode.mode_func();

//             },
//             // enable play game -------------------------------- //
//             enablePlayGame() {
//                 play_feild__container.GENERAL_SETTINGS.status = "game_play";
//             },
//         },
//         trigger() {
//             return play_feild__container.GENERAL_SETTINGS.status == "prepare_game";
//         },
//         name_next: "end_game",
//     },
//     end_game: {
//         components: {
//             breakWorkModes() {
//                 modes_administrator.breakWorkAsyncModes();
//             },
//             stopMovingSnake() {
//                 // clearInterval(snake.DYNAMIC_SETTINGS.ID_interval);
//             },
//             hideGamePlay() {

//                 miniSyncEngine.stop(true);

//                 let state_game__container = document.querySelector(
//                     ".state_game__container"
//                 ) as HTMLElement | null;
//                 let game_play__container = document.querySelector(
//                     ".game_play__container"
//                 ) as HTMLElement | null;

//                 if (state_game__container && game_play__container) {

//                     let duration_animation = 500;

//                     state_game__container.style.animation =
//                         game_play__container.style.animation = `
//                         disappear ${duration_animation}ms linear forwards
//                     `;

//                     setTimeout((): void => {
//                         state_game__container?.remove();
//                         game_play__container?.remove();
//                         miniSyncEngine.stop(false);
//                     }, duration_animation);

//                 }

//             },
//         },
//         trigger() {
//             return play_feild__container.GENERAL_SETTINGS.status == "game_over";
//         },
//         name_next: "add_settings_game"
//     },
// };