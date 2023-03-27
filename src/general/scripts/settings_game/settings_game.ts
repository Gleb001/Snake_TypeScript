// typescript ================================================== //
interface GeneralSetting<Key = string, Value = any> {
    current: Key,
    list: { [name in Key & string]: Value }
}
interface SETTINGS_GAME_TYPE {

    get<
        Setting extends keyof SETTINGS_GAME_TYPE,
        Key extends keyof SETTINGS_GAME_TYPE[Setting],
        Value = SETTINGS_GAME_TYPE[Setting][Key],
    >(setting: Setting, key: Key): Value extends GeneralSetting ? Value["list"][Value["current"]] : Value,
    set<
        Setting extends keyof SETTINGS_GAME_TYPE,
        Key extends keyof SETTINGS_GAME_TYPE[Setting],
        NewValue = SETTINGS_GAME_TYPE[Setting][Key],
    >(
        setting: Setting,
        key: Key,
        new_value: NewValue extends GeneralSetting ? keyof NewValue["list"] : NewValue
    ): void,

    play_field: {
        size_cell: GeneralSetting<"small" | "medium" | "huge", number>,
        modes: GeneralSetting<
            "classic" | "no walls" | "obstacles" | "hippi",
            { obstacles: any[], mode_func: () => void }
        >,
    },
    apple: {
        number: {
            max: number,
            min: number,
            value: number,
        },
        color: GeneralSetting<"apple", string>,
    },
    snake: {
        speed: GeneralSetting<"low" | "normal" | "fast" | "very fast", number>,
        color: GeneralSetting<"blue" | "white" | "violet" | "black", string>,
        has_walls: boolean
    },

}

// main ======================================================== //
let SETTINGS_GAME: SETTINGS_GAME_TYPE = {

    get(element, key) {
        let setting = this[element][key];
        return isGeneralSetting(setting) ? setting.list[setting.current] : setting;
    },
    set(element, key, value) {
        let setting = this[element][key];
        // @ts-ignore
        isGeneralSetting(setting) ? setting.current : this[element][key] = value;
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
                        return [
                            "black",
                            SETTINGS_GAME.get("snake", "color")
                        ];
                    },
                    mode_func() {
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

// check general setting --------------------------------------- //
function isGeneralSetting(setting: any): setting is GeneralSetting<typeof setting, any> {
    return typeof setting.current !== "undefined";
}

// export ====================================================== //
export default SETTINGS_GAME;