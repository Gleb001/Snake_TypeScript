
// main ======================================================== //

// modes administrator ----------------------------------------- //
let modes_administrator = {

    // started_modes ------------------------------------------- //
    started_modes: [] as number[],

    // clear modes --------------------------------------------- //
    breakWorkModes() {
        this.started_modes.forEach(mode => clearInterval(mode));
    },

};

// export ====================================================== //
export default modes_administrator;