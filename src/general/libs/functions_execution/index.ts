// main ======================================================== //
function inSeries(...components: (() => void)[]) {
    for (let component of components) component();
}

// export ====================================================== //
export default inSeries;
