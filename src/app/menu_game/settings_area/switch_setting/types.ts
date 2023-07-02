// types ======================================================= //
interface SettingSwitchesType extends JSX.ObjectComponentHTML<
    HTMLDivElement
> {
    renderSettingSwitch: typeof JSX.FunctionComponentHTML<
        HTMLButtonElement,
        { shift_to_left: number, className: string }
    >,
}

// export ====================================================== //
export {SettingSwitchesType};