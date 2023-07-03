// import ====================================================== //
import { SettingsGameType, GeneralSettingType } from "./types";

// main ======================================================== //
let SETTINGS_GAME: SettingsGameType = {

    get(element, key) {
        let setting = this[element][key];
        // @ts-ignore
        return isGeneralSettingType(setting) ? setting.list[setting.current] : setting;
    },
    set(element, key, value) {
        let setting = this[element][key];
        // @ts-ignore
        isGeneralSettingType(setting) ? setting.current : this[element][key] = value;
    },

    play_field: {
        size_cell: {
            current: "small",
            list: {
                "small": 50,
                "medium": 40,
                "huge": 30,
            }
        },
        modes: {
            current: "classic",
            list: {
                "classic": {
                    get obstacles() {
                        return [SETTINGS_GAME.get("snake", "color")];
                    },
                    mode_func() {
                        SETTINGS_GAME.set("snake", "has_walls", true);
                    }
                },
                "no walls": {
                    get obstacles() {
                        return [SETTINGS_GAME.get("snake", "color")];
                    },
                    mode_func() {
                        SETTINGS_GAME.set("snake", "has_walls", false);
                    }
                },
                "obstacles": {
                    get obstacles() {
                        return [SETTINGS_GAME.get("snake", "color")];
                    },
                    mode_func(PlayField: {
                        randomEmptyCell: HTMLTableCellElement | null,
                        isPlay: boolean
                    }) {

                        let score_player = document.getElementById("counter_apples") as HTMLInputElement;

                        let previous_score = Number(score_player.value);
                        SETTINGS_GAME.get("play_field", "modes").obstacles.pop();
                        let ID_interval = setInterval(() => {

                            let empty_cell = PlayField.randomEmptyCell;
                            if (!PlayField.isPlay || empty_cell == null) {
                                clearInterval(ID_interval);
                                return;
                            }

                            let current_score = Number(score_player.value);
                            if (previous_score != current_score) {

                                let duration_animation = 1000;
                                empty_cell.style.animation = `appear ${duration_animation}ms linear forwards`;
                                empty_cell.classList.add("obstacle");
                                setTimeout(
                                    () => {
                                        if (empty_cell) {
                                            console.log("no empty cell");
                                            SETTINGS_GAME.get("play_field", "modes").obstacles.push("active_obstacle");
                                            empty_cell.classList.add("active_obstacle");
                                        }
                                    },
                                    duration_animation
                                );

                                previous_score = current_score;

                            }

                        }, 55);

                        SETTINGS_GAME.set("snake", "has_walls", true);

                    }
                },
                "hippi": {
                    get obstacles() { return []; },
                    mode_func() {
                        SETTINGS_GAME.set("snake", "has_walls", false);
                    }
                },
            }
        },
    },
    apple: {
        number: {
            max: 5,
            min: 1,
            value: 3,
        },
        color: {
            current: "apple",
            list: { "apple": "apple", }
        }
    },
    snake: {
        speed: {
            current: "normal",
            list: {
                "low": 155,
                "normal": 110,
                "fast": 90,
                "very fast": 70,
            },
        },
        color: {
            current: "blue",
            list: {
                "blue": "rgb(3, 51, 87)",
                "white": "rgb(255, 244, 240)",
                "black": "rgb(30, 28, 33)",
                "violet": "rgb(181, 173, 228)",
            },
        },
        has_walls: true
    },

};

// additional functions ======================================== //
function isGeneralSettingType(setting: any): setting is GeneralSettingType<typeof setting> {
    return (typeof setting.current !== "undefined");
}

// export ====================================================== //
export default SETTINGS_GAME;