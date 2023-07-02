// imports ===================================================== //
// libs
import createHTMLElement from "jsx";
// components
import "./styles.css";
import {MenuGameType} from "./types";
import DescriptionWindow from "./description_window";
import SettignsArea from "./settings_area";

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