import React from "react";
import { formatDate } from "../../../util/DateUtil";

const TableRowComponent = ({ item, onClick }) => (
    <tr onClick={() => onClick(item.id)}>
        <td>{item.id}</td>
        <td>{item.type}</td>
        <td>{item.complaintReason}</td>
        <td>{item.reporterNickname}</td>
        <td>{formatDate(item.regDate)}</td>
        <td>{item.isChecked ? "Checked" : "Unchecked"}</td>
    </tr>
);

export default TableRowComponent;
