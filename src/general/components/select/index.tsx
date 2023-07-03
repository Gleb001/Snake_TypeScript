// import ====================================================== //
// libs
import createHTMLElement from "@libs/jsx";
// components
import {SelectType} from "./types";

// main ======================================================== //
let Select: SelectType = ({
    settings, className
}) => {
    return (
        <select
            style="text-align: left; cursor: pointer;"
            class={className}
            onchange={function (this: HTMLSelectElement) {
                settings.current = this.value;
            }}
        >
            {Object.keys(settings.list).map(setting_name => {
                let option = document.createElement("option") as HTMLOptionElement;
                if (setting_name == settings.current) option.selected = true;
                option.value = setting_name;
                option.innerHTML = setting_name;
                return option;
            })}
        </select>
    );
};

// exoprt ====================================================== //
export default Select;