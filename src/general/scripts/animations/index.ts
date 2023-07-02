// import ====================================================== //
import {
    AnimaitonJSParameters,
    AnimaitonCSSParameters,
    ChangingProperty
} from "./types";

// types ======================================================= //
type AnimationType = (
    typeof AnimationCSS.prototype |
    typeof AnimationJS.prototype
)

// main ======================================================== //
class AnimationJS {

    // class methonds ------------------------------------------ //
    static TIMING_FUNCTIONS = {
        ease: (time_fraction: number) => {
            // y = sin (x * π/4)
            return Math.sin(time_fraction * Math.PI / 4);
        },
        ease_in: (time_fraction: number) => {
            // y = x^2
            return Math.pow(time_fraction, 2);
        },
        ease_out: (time_fraction: number) => {
            // y = √x
            return Math.sqrt(time_fraction);
        },
        linear: (time_fraction: number) => {
            // y = x
            return time_fraction;
        },
        bounce_start: (time_fraction: number) => {
            // y = 4 * x^3 - 3 * x^2
            return (4 * Math.pow(time_fraction, 3)) - (3 * Math.pow(time_fraction, 2));
        },
        bounce_end: (time_fraction: number) => {
            // y = -4 * x^3 + 5 * x^2
            return (-4 * Math.pow(time_fraction, 3)) + (5 * Math.pow(time_fraction, 2));
        },
    }
    constructor(animation_settings: AnimaitonJSParameters) {

        animation_settings.changing_properties.forEach(
            prop => {
                if (typeof prop.unit_of_measurement != "string") {
                    prop.unit_of_measurement = "";
                }
            }
        );

        if (typeof animation_settings.timing_settings.delay != "number") {
            animation_settings.timing_settings.delay = 0;
        }

        this._ANIMATION_SETTINGS = animation_settings;

    }

    // object methods ------------------------------------------ //
    _ID_ANIMATION?: number
    _ANIMATION_SETTINGS: AnimaitonJSParameters

    start() {
        setTimeout(
            () => {

                let current_animation = this;
                let start_animation = performance.now();
                let duration = this._ANIMATION_SETTINGS.timing_settings.duration;

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

            }, this._ANIMATION_SETTINGS.timing_settings.delay
        );
    }
    end() {
        if (this._ID_ANIMATION) {
            window.cancelAnimationFrame(this._ID_ANIMATION);
        }
        if (this._ANIMATION_SETTINGS.next_function) {
            this._ANIMATION_SETTINGS.next_function();
        }
    }

    _changeEachPropertyInOrder(time_fraction: number) {
        this._ANIMATION_SETTINGS.changing_properties.forEach(
            (property: ChangingProperty) => {
                let replacement_value = this._calculate(time_fraction, property);
                this._draw(replacement_value, property);
            }
        );
    }
    _calculate(time_fraction: number, property: ChangingProperty) {
        let distance = property.end_value - property.start_value;
        let y_coordinate = this._ANIMATION_SETTINGS.timing_settings.timing_function(
            time_fraction
        );
        return y_coordinate * distance;
    }
    _draw(replacement_value: number, property: ChangingProperty) {

        let function_value = property.function_value;
        let unit_of_measurement = property.unit_of_measurement;
        if (typeof unit_of_measurement != "string") unit_of_measurement = ""

        let value_prop = property.start_value + replacement_value + unit_of_measurement;
        if (function_value) value_prop = `${function_value}(${value_prop})`;

        this._ANIMATION_SETTINGS.changing_elements.forEach(element => {
            element.style[property.name as any] = value_prop;
        });

    }

};
class AnimationCSS {

    // class methods ------------------------------------------- //
    static INDEX_ANIMATION = 1
    static getAnimationCSSFile(
        changing_properties: ChangingProperty[],
        name_animation?: string
    ) {

        if (!name_animation) {
            let active_animations = document.querySelectorAll("animation_pattern");
            name_animation = "animation_pattern_" + (Number(active_animations.length) + 1);
        }

        let new_animation_css_file = document.createElement("style");
        new_animation_css_file.className = 'animation_pattern';
        new_animation_css_file.innerText = _getKeyframesAnimation();
        return new_animation_css_file;

        function _getKeyframesAnimation() {

            let from_properties = "";
            let to_properties = "";

            changing_properties.forEach(
                (prop: ChangingProperty) => {

                    let function_value = prop.function_value;

                    let start_value_prop = prop.start_value + prop.unit_of_measurement;
                    let end_value_prop = prop.end_value + prop.unit_of_measurement;

                    if (function_value != "") {
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

    constructor(animation_settings: AnimaitonCSSParameters) {

        if (animation_settings.changing_properties.length) {
            animation_settings.changing_properties.forEach(
                (prop) => {
                    if (!prop.unit_of_measurement) prop.unit_of_measurement = "";
                    if (!prop.function_value) prop.function_value = "";
                }
            );
            let name_animation = animation_settings.animation_css.match(/\w+\S/)?.[0];
            this._animation_css_file = AnimationCSS.getAnimationCSSFile(
                animation_settings.changing_properties,
                name_animation
            );
        }

        // get array numbers
        let array_timing_values = animation_settings.animation_css.match(/\d+/g)?.map(
            timing_value => Number(timing_value)
        );

        // set the values for the next execution
        this._duration = array_timing_values![0];
        this._delay = array_timing_values![1];
        this._iteration_count = array_timing_values![2];
        this._ANIMATION_SETTINGS = animation_settings;

    }

    // object methods ------------------------------------------ //
    _iteration_count: number
    _duration: number
    _delay: number
    _ANIMATION_SETTINGS: { changing_elements: HTMLElement[] } & AnimaitonCSSParameters
    _animation_css_file?: HTMLStyleElement

    start() {

        this._ANIMATION_SETTINGS.changing_elements.forEach(element => {
            element.style.animation = this._ANIMATION_SETTINGS.animation_css;
        });
        if (this._animation_css_file) document.body.append(this._animation_css_file);

        setTimeout(
            () => this.end(),
            (this._delay + (this._duration * this._iteration_count))
        );

    }
    end() {

        let index_prop = 0;
        let index_elem = 0;

        let max_index_prop = this._ANIMATION_SETTINGS.changing_properties.length - 1;
        let max_index_elem = this._ANIMATION_SETTINGS.changing_elements.length - 1;

        while (index_elem < max_index_elem) {

            let prop = this._ANIMATION_SETTINGS.changing_properties[index_prop];
            let element = this._ANIMATION_SETTINGS.changing_elements[index_elem];

            let value_property = this._iteration_count % 2 == 0 ?
                prop.start_value :
                prop.end_value;

            element.style[prop.name as any] = `${value_property}${prop.unit_of_measurement}`;
            element.style.animation = "";

            if (index_prop == max_index_prop) index_elem++;
            else index_prop++;

        }

        this._animation_css_file?.remove();

        if (this._ANIMATION_SETTINGS.next_function) {
            this._ANIMATION_SETTINGS.next_function();
        }
    }

};
function animationLadder(
    ...animations: (AnimationType | (() => AnimationType))[]
) {

    let number_animations = animations.length;
    let index = number_animations > 1 ? number_animations - 2 : 0;

    do {

        let main_animation = animations[index];
        if (typeof main_animation == "function") main_animation = main_animation();

        if (main_animation) {
            let nested_animation = animations[index + 1];
            animations[index] = animationExtend(
                main_animation,
                () => {
                    switch (typeof nested_animation) {
                        case "function":
                            nested_animation().start();
                            break;
                        case "object":
                            nested_animation.start();
                            break;
                    }
                }
            );
        }

        index--;

    } while (index >= 0);

    return animations[0] as AnimationType;

};
function animationExtend(
    animation: AnimationType, additional_value: () => void
) {

    let current_next_function = animation._ANIMATION_SETTINGS.next_function;
    animation._ANIMATION_SETTINGS.next_function = function () {
        if (current_next_function) { current_next_function(); }
        additional_value();
    };

    return animation;

};
async function playAnimationCSS(
    element: HTMLElement, animation_css: string, duration: number,
) {
    element.style.animation = `${duration}ms ${animation_css}`;
    await new Promise(resolve => setTimeout(() => {
        element.style.animation = "";
        resolve(true);
    }, duration + 400));
}

// export ====================================================== //
export {
    AnimationJS,
    AnimationCSS,
    animationLadder,
    animationExtend,
    playAnimationCSS
};