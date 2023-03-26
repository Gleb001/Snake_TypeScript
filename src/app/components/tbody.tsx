// import ====================================================== //
// utilities --------------------------------------------------- //
import createHTMLElement from "jsx";

// main ======================================================== //
export default function Tbody(props: {
    size_cell: number, number_rows: number, number_columns: number,
}) {

    let rows = Array.from(Array(props.number_rows), elem => 0);
    let columns = Array.from(Array(props.number_columns), elem => 0);

    return (
        <tbody>{
            rows.map(row => (
                <tr>{columns.map(column => (
                    <td style={
                        `width: ${props.size_cell}px;
                        height: ${props.size_cell}px;`
                    }></td>
                ))}</tr>
            ))
        }</tbody>
    );

};