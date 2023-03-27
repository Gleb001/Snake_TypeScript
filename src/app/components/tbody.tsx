// typescript ================================================== //
type TbodyType = typeof JSX.FunctionComponentHTML<
    HTMLElement,
    {
        size_cell: number,
        number_rows: number,
        number_columns: number,
    }
>

// import ====================================================== //
import createHTMLElement from "jsx";

// main ======================================================== //
let Tbody: TbodyType = ({size_cell, number_rows, number_columns}) => {

    let rows = new Array(number_rows).fill(0);
    let columns = new Array(number_columns).fill(0);

    return (
        <tbody>{
            rows.map(row => (
                <tr>{
                    columns.map(column => (
                        <td style={
                            `width: ${size_cell}px;
                            height: ${size_cell}px;`
                        }></td>
                    ))
                }</tr>
            ))
        }</tbody>
    );

};

// export ====================================================== //
export default Tbody;