import React from "react";
import { formatDate } from "../../../util/DateUtil";

const MyRepliesTableRowComponent = ({ item, index, onClick }) => (
    <tr className="board-row" onClick={onClick}>
        <td>{index + 1}</td>
        <td>{item.categoryName}</td>
        <td>{item.title}</td>
        <td>{item.content}</td>
        <td>{formatDate(item.regDate)}</td>
        <td>{item.likesCount}</td>
    </tr>
);

export default MyRepliesTableRowComponent;
