// types ======================================================= //
type SelectType = typeof JSX.FunctionComponentHTML<
    HTMLSelectElement,
    {
        settings: { list: {}, current: string },
        className?: string
    }
>

// export ====================================================== //
export {SelectType};