// imports ===================================================== //
import "./main.css";
import MenuGame from "./menu_game/menu_game";
import GamePlay from "./game_play/game_play";
import createHTMLElement from "jsx";

// main ======================================================== //
let GameContainer = {
    HTML: document.querySelector(".game_container") as HTMLDivElement,
    render(
        html_element: HTMLElement,
        animation: () => void
    ) {
        this.HTML.innerHTML = "";
        this.HTML.append(html_element);
        animation();
    },
    renderMenuGame() {
        GameContainer.render(
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <MenuGame startGame={() => {
    
                let duration_animation = 1000;
                MenuGame.HTML.style.animation = `
                    disappear ${duration_animation}ms linear forwards
                `;
    
                setTimeout(GameContainer.renderGamePlay, duration_animation);
    
            }} />,
            () => {
                MenuGame.HTML.style.animation = `
                    750ms appear linear forwards
                `;
            }
        );
    },
    renderGamePlay() {
        GameContainer.render(
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <GamePlay endGame={() => {
    
                let duration_animation = 1000;
                GamePlay.HTML.style.animation = `
                    ${duration_animation}ms linear forwards
                `;
    
                setTimeout(GameContainer.renderMenuGame, duration_animation);
    
            }} />,
            () => {
                GamePlay.HTML.style.animation = `
                    750ms appear linear forwards
                `;
            }
        );
    },
};

// events window ----------------------------------------------- //
window.addEventListener("load", GameContainer.renderMenuGame);