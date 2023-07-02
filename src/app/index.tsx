// imports ===================================================== //
// libs
import createHTMLElement from "jsx";
import { playAnimationCSS } from "animations";
// components
import "../general/styles/index.css";
import MenuGame from "./menu_game";
import GamePlay from "./game_play";

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
                        1000
                    ).then(GameContainer.renderGamePlay);  
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
                        1000
                    ).then(GameContainer.renderMenuGame);  
                }
            }} />,
            () => playAnimationCSS(GamePlay.HTML, "appear linear forwards", 750)
        );
    },
};

// events window ----------------------------------------------- //
window.addEventListener("load", GameContainer.renderMenuGame);