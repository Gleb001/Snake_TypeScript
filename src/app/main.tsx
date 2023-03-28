// imports ===================================================== //
import "./main.css";
import MenuGame from "./menu_game/menu_game";
import GamePlay from "./game_play/game_play";
import createHTMLElement from "jsx";
import { ElementFlags } from "typescript";

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
                if (MenuGame.HTML.style.animation == "") {
                    playAnimationCSS(
                        MenuGame.HTML,
                        "disappear linear forwards",
                        1000,
                        GameContainer.renderGamePlay
                    );  
                }
            }} />,
            () => playAnimationCSS(MenuGame.HTML, "appear linear forwards", 750)
        );
    },
    renderGamePlay() {
        GameContainer.render(
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <GamePlay endGame={() => {
                if (GamePlay.HTML.style.animation == "") {
                    playAnimationCSS(
                        GamePlay.HTML,
                        "disappear linear forwards",
                        1000,
                        GameContainer.renderMenuGame
                    );  
                }
            }} />,
            () => playAnimationCSS(GamePlay.HTML, "appear linear forwards", 750)
        );
    },
};

// additional functions ---------------------------------------- //
function playAnimationCSS(
    element: HTMLElement,
    animation_css: string,
    duration: number,
    completionAction?: () => void,
) {
    element.style.animation = `${duration}ms ${animation_css}`;
    setTimeout(() => {
        element.style.animation = "";
        if (completionAction) completionAction();
    }, Math.abs(duration));
}

// events window ----------------------------------------------- //
window.addEventListener("load", GameContainer.renderMenuGame);