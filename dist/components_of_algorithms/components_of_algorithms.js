import play_field from "../game_components/play_field.js";
import { snake, snake_layer } from "../game_components/snake.js";
import apple_administartor from "../game_components/apples_administrator.js";
const components_of_algorithms = {
    start_game: {
        components: {
            createPlayFieldAndSnakeLayer() {
                let play_field__container = document.querySelector(".play_field__container");
                play_field.HTML.innerHTML = play_field.inner_html;
                play_field__container.append(play_field.HTML);
                play_field__container.append(snake_layer.HTML);
            },
            showSnake() {
                snake.draw();
            },
            startMoveSnake() {
                snake.startMove();
            },
            createApplesOnPlayField() {
                apple_administartor.createApple(3);
            },
        },
        name_next: "end_game",
    },
    end_game: {
        components: {},
        trigger() {
            return !snake.MOVEMENT_SETTINGS.availability_of_access;
        }
    }
};
export default components_of_algorithms;
