// imports ===================================================== //
// libs
import createHTMLElement from "@libs/jsx";
import { playAnimationCSS } from "@libs/animations";
// components
import "../general/styles/index.css";
import MenuGame from "./menu_game";
import GamePlay from "./game_play";

// main ======================================================== //
let GameContainer = {
    HTML: document.querySelector(".game_container") as HTMLDivElement,
    render(html_element: HTMLElement) {
        this.HTML.innerHTML = "";
        this.HTML.append(html_element);
        playAnimationCSS(this.HTML, "appear linear forwards", 750)
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
            }} />
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
            }} />
        );
    },
};

// events window ----------------------------------------------- //
window.addEventListener("load", GameContainer.renderMenuGame);