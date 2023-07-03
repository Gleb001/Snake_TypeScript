// types ======================================================= //
interface AnimaitonPattern {
    changing_elements: (HTMLElement)[],
    changing_properties: ChangingProperty[],
    next_function?: () => void,
}
interface AnimaitonJSParameters extends AnimaitonPattern {
    timing_settings: {
        timing_function: (time_fraction: number) => number,
        duration: number,
        delay?: number,
    },
}
interface AnimaitonCSSParameters extends AnimaitonPattern {
    animation_css: string
}

type ChangingProperty = {
    name: string,
    unit_of_measurement?: string,
    function_value?: string,

    start_value: any,
    end_value: any
}

// export ====================================================== //
export {
    AnimaitonJSParameters,
    AnimaitonCSSParameters,
    ChangingProperty
};