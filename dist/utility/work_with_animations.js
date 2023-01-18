class AnimationJS {
    constructor(animation_settings) {
        this._ID_ANIMATION = 0;
        animation_settings.changing_properties.forEach((prop) => {
            if (typeof prop.unit_of_measurement != "string") {
                prop.unit_of_measurement = "";
            }
        });
        if (typeof animation_settings.timing_settings.delay != "number") {
            animation_settings.timing_settings.delay = 0;
        }
        this._animation_settings = animation_settings;
    }
    start() {
        let duration = this._animation_settings.timing_settings.duration;
        let delay = this._animation_settings.timing_settings.delay;
        setTimeout(() => {
            let current_animation = this;
            let start_animation = performance.now();
            this._ID_ANIMATION = window.requestAnimationFrame(function animate(timestamp) {
                let time_fraction = (timestamp - start_animation) / duration;
                if (time_fraction > 1)
                    time_fraction = 1;
                current_animation._changeEachPropertyInOrder(time_fraction);
                if (time_fraction < 1) {
                    window.requestAnimationFrame(animate);
                }
                else
                    current_animation.end();
            });
        }, delay);
    }
    end() {
        window.cancelAnimationFrame(this._ID_ANIMATION);
        if (typeof this._animation_settings.next_function == "function") {
            this._animation_settings.next_function();
        }
    }
    _changeEachPropertyInOrder(time_fraction) {
        this._animation_settings.changing_properties.forEach((property) => {
            let replacement_value = this._calculate(time_fraction, property);
            this._draw(replacement_value, property);
        });
    }
    _calculate(time_fraction, property) {
        let distance = property.end_value - property.start_value;
        let y_coordinate = this._animation_settings.timing_settings.timing_function(time_fraction);
        return y_coordinate * distance;
    }
    _draw(replacement_value, property) {
        let function_value = property.function_value;
        let unit_of_measurement = property.unit_of_measurement;
        if (typeof unit_of_measurement != "string")
            unit_of_measurement = "";
        let value_prop = property.start_value + replacement_value + unit_of_measurement;
        if (function_value)
            value_prop = `${function_value}(${value_prop})`;
        this._animation_settings.changing_elements.forEach(element => {
            element.style[property.name] = value_prop;
        });
    }
}
AnimationJS.TIMING_FUNCTIONS = {
    ease: (time_fraction) => {
        return Math.sin(time_fraction * Math.PI / 4);
    },
    ease_in: (time_fraction) => {
        return Math.pow(time_fraction, 2);
    },
    ease_out: (time_fraction) => {
        return Math.sqrt(time_fraction);
    },
    linear: (time_fraction) => {
        return time_fraction;
    },
    bounce_start: (time_fraction) => {
        return (4 * Math.pow(time_fraction, 3)) - (3 * Math.pow(time_fraction, 2));
    },
    bounce_end: (time_fraction) => {
        return (-4 * Math.pow(time_fraction, 3)) + (5 * Math.pow(time_fraction, 2));
    },
};
;
class AnimationCSS {
    static createFile(changing_properties, name_animation) {
        let new_animation_css_file = document.createElement("style");
        new_animation_css_file.className = 'animation_pattern';
        new_animation_css_file.innerText = _getKeyframesAnimation();
        document.body.append(new_animation_css_file);
        return new_animation_css_file;
        function _getKeyframesAnimation() {
            let from_properties = "";
            let to_properties = "";
            changing_properties.forEach((prop) => {
                let function_value = prop.function_value;
                let unit_of_measurement = prop.unit_of_measurement;
                if (typeof unit_of_measurement != "string")
                    unit_of_measurement = "";
                let start_value_prop = prop.start_value + unit_of_measurement;
                let end_value_prop = prop.end_value + unit_of_measurement;
                if (typeof function_value == "string") {
                    start_value_prop = `${function_value}(${start_value_prop})`;
                    end_value_prop = `${function_value}(${end_value_prop})`;
                }
                from_properties += `${prop.name}: ${start_value_prop}; `;
                to_properties += `${prop.name}: ${end_value_prop}; `;
            });
            return `
                    @keyframes ${name_animation} {
                        from { ${from_properties} }
                        to { ${to_properties} }
                    }
                `;
        }
    }
    constructor(animation_settings) {
        this._ID_ANIMATION = 0;
        animation_settings.changing_properties.forEach((prop) => {
            if (typeof prop.unit_of_measurement != "string") {
                prop.unit_of_measurement = "";
            }
        });
        if (typeof animation_settings.timing_settings.delay != "number") {
            animation_settings.timing_settings.delay = 0;
        }
        this._animation_settings = animation_settings;
    }
    start() {
        this._addSpecStylesForChangingElements("start_value");
        this._animation_css_file = AnimationCSS.createFile(this._animation_settings.changing_properties, this._animation_settings.name);
        setTimeout(() => this.end(), this._animation_settings.timing_settings.duration);
    }
    end() {
        if (typeof this._animation_css_file != "undefined") {
            this._animation_css_file.remove();
        }
        this._addSpecStylesForChangingElements("end_value");
        if (typeof this._animation_settings.next_function == "function") {
            this._animation_settings.next_function();
        }
    }
    _addSpecStylesForChangingElements(value) {
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
        this._animation_settings.changing_properties.forEach((prop) => {
            let unit_of_measurement = prop.unit_of_measurement;
            if (typeof unit_of_measurement != "string")
                unit_of_measurement = "";
            let value_prop = prop[value] + unit_of_measurement;
            this._animation_settings.changing_elements.forEach((element) => {
                element.style.animation = animation_value;
                element.style[prop.name] = value_prop;
            });
        });
    }
}
AnimationCSS.INDEX_ANIMATION = 1;
;
export { AnimationCSS, AnimationJS };
