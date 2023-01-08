
// imports ===================================================== //

// mini sync engine -------------------------------------------- //
import miniSyncEngine from "./utility/miniSyncEngine.js";

// components of algorithms ------------------------------------ //
import components_of_algorithms from "./components_of_algorithms/components_of_algorithms.js";

// main ======================================================== //
miniSyncEngine.algorithms.add({
    name: "start_game",
    name_next: "end_game",
    components: [
        components_of_algorithms.start_game.components.createPlayFieldAndSnakeLayer,
        components_of_algorithms.start_game.components.showSnake,
        components_of_algorithms.start_game.components.startMoveSnake,
        components_of_algorithms.start_game.components.createApplesOnPlayField,
    ],
});
miniSyncEngine.algorithms.add({
    name: "end_game",
    components: [
        () => alert("Game over"),
    ],
    trigger: components_of_algorithms.end_game.trigger,
});

// load game =================================================== //
// miniSyncEngine.start();
