const Range = {
    getNumberInRange({ start_number, finish_number, check_number, floating_range = false }) {
        let number_below_range = start_number;
        let number_above_range = finish_number;
        if (floating_range) {
            number_below_range = finish_number;
            number_above_range = start_number;
        }
        let result = check_number;
        if (check_number < start_number) {
            result = number_below_range;
        }
        else if (check_number > finish_number) {
            result = number_above_range;
        }
        return result;
    }
};
export default Range;
