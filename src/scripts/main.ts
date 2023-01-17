
// imports ===================================================== //

// mini sync engine -------------------------------------------- //
import miniSyncEngine from "./utility/miniSyncEngine.js";

// components of algorithms ------------------------------------ //
import components_of_algorithms from "./components_of_algorithms/components_of_algorithms.js";

// main ======================================================== //

// preparation of algorithms ----------------------------------- //
miniSyncEngine.algorithms.add({
    name: "add_settings_game",
    name_next: "start_game",
    components: [
        components_of_algorithms.add_settings_game.components.createMenuGame,
        components_of_algorithms.add_settings_game.components.showMenuGame,
        components_of_algorithms.add_settings_game.components.addEventClickForButtonStartGame,
    ],
});
miniSyncEngine.algorithms.add({
    name: "start_game",
    name_next: "end_game",
    components: [
        components_of_algorithms.start_game.components.clearGameContainer,
        components_of_algorithms.start_game.components.createPlayFieldAndSnakeLayer,
        components_of_algorithms.start_game.components.setDefaultSettingsForGame,
        components_of_algorithms.start_game.components.showSnake,
        components_of_algorithms.start_game.components.createApplesOnPlayField,
        components_of_algorithms.start_game.components.startMode,
    ],
    trigger: components_of_algorithms.start_game.trigger,
});
miniSyncEngine.algorithms.add({
    name: "end_game",
    name_next: "add_settings_game",
    components: [
        components_of_algorithms.end_game.components.stopMovingSnake,
        components_of_algorithms.end_game.components.breakWorkModes,
        components_of_algorithms.end_game.components.hideGamePlay,
    ],
    trigger: components_of_algorithms.end_game.trigger,
});

// start algorithms -------------------------------------------- //
window.addEventListener(
    "load", function () { miniSyncEngine.start(); }
);