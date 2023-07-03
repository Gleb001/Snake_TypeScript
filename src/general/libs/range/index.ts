// main ======================================================== //
function range(min: number, max: number, check: number) {
    if (min > max) { min = max; max = min; }
    return check < min ? max : check > max ? min : check;
}

// export ====================================================== //
export default range;