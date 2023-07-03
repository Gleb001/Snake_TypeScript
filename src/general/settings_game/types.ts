// types ======================================================= //
interface GeneralSettingType<Key = string, Value = any> {
    current: Key,
    list: { [name in Key & string]: Value }
}
interface SettingsGameType {

    get<
        Setting extends keyof SettingsGameType,
        Key extends keyof SettingsGameType[Setting],
        Value = SettingsGameType[Setting][Key],
    >(setting: Setting, key: Key): Value extends GeneralSettingType ? Value["list"][Value["current"]] : Value,
    
    set<
        Setting extends keyof SettingsGameType,
        Key extends keyof SettingsGameType[Setting],
        NewValue = SettingsGameType[Setting][Key],
    >(
        setting: Setting,
        key: Key,
        new_value: NewValue extends GeneralSettingType ? keyof NewValue["list"] : NewValue
    ): void,

    play_field: {
        size_cell: GeneralSettingType<"small" | "medium" | "huge", number>,
        modes: GeneralSettingType<
            "classic" | "no walls" | "obstacles" | "hippi",
            { obstacles: string[], mode_func: (...args: any) => void }
        >,
    },
    apple: {
        number: {
            max: number,
            min: number,
            value: number,
        },
        color: GeneralSettingType<"apple", string>,
    },
    snake: {
        speed: GeneralSettingType<"low" | "normal" | "fast" | "very fast", number>,
        color: GeneralSettingType<"blue" | "white" | "violet" | "black", string>,
        has_walls: boolean
    },

}

// export ====================================================== //
export { GeneralSettingType, SettingsGameType };