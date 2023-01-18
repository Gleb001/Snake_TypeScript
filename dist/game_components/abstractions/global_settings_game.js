const GLOBAL_SETTINGS = {
    point: {
        icon: "../../../../images/...",
        color: {
            list: {
                red: "red",
                blue: "blue"
            },
            get() {
                return "red";
            },
            set() {
                GLOBAL_SETTINGS.point.color;
            }
        }
    },
};
export default GLOBAL_SETTINGS;
