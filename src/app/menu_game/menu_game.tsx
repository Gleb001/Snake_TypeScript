// typescript ================================================== //
interface MenuGameType extends JSX.ObjectComponentHTML<
    HTMLDivElement, { startGame: () => void }
> {}

// imports ===================================================== //
import "./menu_game.css";
import DescriptionWindow from "./description_window/description_window";
import createHTMLElement from "jsx";
import SettignsArea from "./settings_area/settings_area";

// main ======================================================== //
let MenuGame: MenuGameType = {
    HTML: <div id="menu_game"></div>,
    render({startGame}) {

        this.HTML.append(
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <SettignsArea startGame={startGame} />,
            // @ts-ignore: This component is an object (has the JSX.ObjectComponentHTML type)
            <DescriptionWindow />
        );

        return this.HTML;

    },
};

// export ====================================================== //
export default MenuGame;