// types ======================================================= //
type CountdownTimerType = typeof JSX.FunctionComponentHTML<
    HTMLDivElement,
    {
        value: number,
        time_countdown: number,
        completionAction(): void;
    }
>

// export ====================================================== //
export {CountdownTimerType};