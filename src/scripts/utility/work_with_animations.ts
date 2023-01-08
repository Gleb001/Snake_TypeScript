
// typescripts entities ======================================== //

// type -------------------------------------------------------- //
type ChangingProperty = {
    name: string,
    unit_of_measurement?: string,
    function_value?: string,
    start_value: number,
    end_value: number
}
type ChangingProperties = ChangingProperty[];

// interfaces -------------------------------------------------- //
interface AnimaitonPattern {
    changing_elements: HTMLElement[],
    changing_properties: ChangingProperties,
    next_function?: () => void
}
interface AnimaitonJSParameters extends AnimaitonPattern {
    timing_settings: {
        timing_function: (time_fraction: number) => number,
        duration: number,
        delay?: number,
    },
}
interface AnimaitonCSSParameters extends AnimaitonPattern {
    name: string,
    timing_settings: {
        timing_function: string,
        duration: number,
        delay?: number,
    },
}


// main ======================================================== //

// class animation js ------------------------------------------ //
class AnimationJS {

    // public properties and methods =========================== //

    // properties ---------------------------------------------- //
    _ID_ANIMATION: number = 0
    _animation_settings: AnimaitonJSParameters

    // constructor --------------------------------------------- //
    constructor(animation_settings: AnimaitonJSParameters) {

        // 1. set default values for changing_props
        animation_settings.changing_properties.forEach(
            (prop: ChangingProperty): void => {
                if (typeof prop.unit_of_measurement != "string") {
                    prop.unit_of_measurement = "";
                }
            }
        );

        // 2. set default values for delay
        if (typeof animation_settings.timing_settings.delay != "number") {
            animation_settings.timing_settings.delay = 0;
        }

        // 3. set animation settings for this
        this._animation_settings = animation_settings;

    }

    // start --------------------------------------------------- //
    start(): void {

        // 1. getting variables
        let duration = this._animation_settings.timing_settings.duration;
        let delay = this._animation_settings.timing_settings.delay;

        // 2. play animation with a delay
        setTimeout(
            () => {

                let current_animation = this;
                let start_animation = performance.now();

                this._ID_ANIMATION = window.requestAnimationFrame(

                    function animate(timestamp) {

                        let time_fraction = (timestamp - start_animation) / duration;
                        if (time_fraction > 1) time_fraction = 1;

                        current_animation._changeEachPropertyInOrder(time_fraction);

                        if (time_fraction < 1) {
                            window.requestAnimationFrame(animate);
                        } else current_animation.end();

                    }

                );

            }, delay
        );

    }

    // end ----------------------------------------------------- //
    end(): void {

        window.cancelAnimationFrame(this._ID_ANIMATION);

        if (typeof this._animation_settings.next_function == "function") {
            this._animation_settings.next_function();
        }

    }



    // private properties and methods ========================== //

    // timing functions ---------------------------------------- //
    static TIMING_FUNCTIONS: {
        [name: string]: (time_fraction: number) => number
    } = {
            ease: (time_fraction) => {
                // y = sin (x * π/4)
                return Math.sin(time_fraction * Math.PI / 4);
            },
            ease_in: (time_fraction) => {
                // y = x^2
                return Math.pow(time_fraction, 2);
            },
            ease_out: (time_fraction) => {
                // y = √x
                return Math.sqrt(time_fraction);
            },
            linear: (time_fraction) => {
                // y = x
                return time_fraction;
            },
            bounce_start: (time_fraction) => {
                // y = 4 * x^3 - 3 * x^2
                return (4 * Math.pow(time_fraction, 3)) - (3 * Math.pow(time_fraction, 2));
            },
            bounce_end: (time_fraction) => {
                // y = -4 * x^3 + 5 * x^2
                return (-4 * Math.pow(time_fraction, 3)) + (5 * Math.pow(time_fraction, 2));
            },
        }

    // change each prop in order ------------------------------- //
    _changeEachPropertyInOrder(time_fraction: number): void {
        this._animation_settings.changing_properties.forEach(
            (property: ChangingProperty): void => {
                let replacement_value = this._calculate(time_fraction, property);
                this._draw(replacement_value, property);
            }
        );
    }

    // calculate new value ------------------------------------- //
    _calculate(
        time_fraction: number, property: ChangingProperty
    ): number {

        let distance = property.end_value - property.start_value;
        let y_coordinate = this._animation_settings.timing_settings.timing_function(
            time_fraction
        );

        return y_coordinate * distance;

    }

    // draw ---------------------------------------------------- //
    _draw(
        replacement_value: number, property: ChangingProperty
    ): void {

        let function_value = property.function_value;
        let unit_of_measurement = property.unit_of_measurement;
        if (typeof unit_of_measurement != "string") unit_of_measurement = ""

        let value_prop = property.start_value + replacement_value + unit_of_measurement;
        if (function_value) value_prop = `${function_value}(${value_prop})`;

        this._animation_settings.changing_elements.forEach(element => {
            element.style[property.name as any] = value_prop;
        });

    }

};

// class animation css ----------------------------------------- //
class AnimationCSS {

    // public properties and methods =========================== //

    // properties ---------------------------------------------- //
    _ID_ANIMATION: number = 0
    _animation_settings: AnimaitonCSSParameters
    _animation_css_file: HTMLStyleElement | undefined

    // constructor --------------------------------------------- //
    constructor(animation_settings: AnimaitonCSSParameters) {

        // 1. set default values for changing_props
        animation_settings.changing_properties.forEach(
            (prop: ChangingProperty) => {
                if (typeof prop.unit_of_measurement != "string") {
                    prop.unit_of_measurement = "";
                }
            }
        );

        // 2. set default values for delay
        if (typeof animation_settings.timing_settings.delay != "number") {
            animation_settings.timing_settings.delay = 0;
        }

        // 3. set animation settings for this
        this._animation_settings = animation_settings;

    }

    // start --------------------------------------------------- //
    start(): void {

        // 1. add styles animation for changing element
        this._addSpecStylesForChangingElements("start_value");

        // 2. create animation css file
        this._animation_css_file = AnimationCSS.createFile(
            this._animation_settings.changing_properties,
            this._animation_settings.name
        );

        // 3. end animation
        setTimeout(
            (): void => this.end(),
            this._animation_settings.timing_settings.duration
        );

    }

    // end ----------------------------------------------------- //
    end(): void {

        // 1. remove css file
        if (typeof this._animation_css_file != "undefined") {
            this._animation_css_file.remove();
        }

        // 2. add spec styles for changing elements
        this._addSpecStylesForChangingElements("end_value");

        // 3. start next function
        if (typeof this._animation_settings.next_function == "function") {
            this._animation_settings.next_function();
        }

    }



    // private properties and methods ========================== //

    // index animation ----------------------------------------- //
    static INDEX_ANIMATION: number = 1

    // get animation css file ---------------------------------- //
    static createFile(
        changing_properties: ChangingProperties,
        name_animation: string
    ): HTMLStyleElement {

        // 1. create animation css file
        let new_animation_css_file = document.createElement("style");
        new_animation_css_file.className = 'animation_pattern';
        new_animation_css_file.innerText = _getKeyframesAnimation();
        document.body.append(new_animation_css_file);

        // 2. return animation css file
        return new_animation_css_file;

        // *. get keyframes animation
        function _getKeyframesAnimation(): string {

            let from_properties: string = "";
            let to_properties: string = "";

            changing_properties.forEach(
                (prop: ChangingProperty): void => {

                    let function_value = prop.function_value;
                    let unit_of_measurement = prop.unit_of_measurement;
                    if (typeof unit_of_measurement != "string") unit_of_measurement = "";

                    let start_value_prop = prop.start_value + unit_of_measurement;
                    let end_value_prop = prop.end_value + unit_of_measurement;

                    if (typeof function_value == "string") {
                        start_value_prop = `${function_value}(${start_value_prop})`;
                        end_value_prop = `${function_value}(${end_value_prop})`;
                    }

                    from_properties += `${prop.name}: ${start_value_prop}; `;
                    to_properties += `${prop.name}: ${end_value_prop}; `;

                }
            );

            return `
                    @keyframes ${name_animation} {
                        from { ${from_properties} }
                        to { ${to_properties} }
                    }
                `;

        }

    }

    // add special styles for changing elements depend
    // status animation (start or stop) ------------------------ //
    _addSpecStylesForChangingElements(
        value: "start_value" | "end_value"
    ): void {

        // 1. set animation value
        let animation_value = "";
        if (value == "start_value") {
            animation_value =
                `
                ${this._animation_settings.name}
                ${this._animation_settings.timing_settings.duration}ms
                ${this._animation_settings.timing_settings.timing_function}
                ${this._animation_settings.timing_settings.delay}ms
                forwards
            `;
        }

        // 2. change style changing elements
        this._animation_settings.changing_properties.forEach(
            (prop: ChangingProperty): void => {

                // 2.1 get value prop
                let unit_of_measurement = prop.unit_of_measurement;
                if (typeof unit_of_measurement != "string") unit_of_measurement = "";
                let value_prop = prop[value] + unit_of_measurement;

                // 2.2 set value prop and animation value
                this._animation_settings.changing_elements.forEach(
                    (element: HTMLElement): void => {
                        element.style.animation = animation_value;
                        element.style[prop.name as any] = value_prop;
                    }
                );

            }
        );

    }

};


// export ====================================================== //
export { AnimationCSS, AnimationJS };