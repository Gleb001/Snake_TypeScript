
// typescript entities ========================================= //
type GetNumberInRange_func = {
    start_number: number,
    finish_number: number,
    check_number: number,
    floating_range: boolean
}

// main ======================================================== //
const Range = {

    // This is a function for returning a number from a range 
    // depending on the type of boundary range:
    // -) strict (no floating)
    // Exemple: range = ( 1 - 20 ); check_number = 45 => check_number = 20
    // Exemple: range = ( 1 - 20 ); check_number = -45 => check_number = 1
    // -) floating
    // Exemple: range = ( 1 - 20 ); check_number = 45 => check_number = 1
    // Exemple: range = ( 1 - 20 ); check_number = -45 => check_number = 20
    getNumberInRange({
        start_number, finish_number, check_number,
        floating_range = false
    }: GetNumberInRange_func): number {

        // 1. set a number below and above the range
        let number_below_range = start_number;
        let number_above_range = finish_number;
        if (floating_range) {
            number_below_range = finish_number;
            number_above_range = start_number;
        }

        // 2. get result
        let result = check_number;
        if (check_number < start_number) {
            result = number_below_range;
        } else if (check_number > finish_number) {
            result = number_above_range;
        }
        return result;

    }

};

// export ====================================================== //
export default Range;