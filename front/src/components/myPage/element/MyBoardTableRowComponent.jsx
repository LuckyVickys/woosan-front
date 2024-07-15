import React from "react";
import { formatDate } from "../../../util/DateUtil";

const MyBoardTableRowComponent = ({ item, index, onClick }) => (
    <tr className="board-row" onClick={onClick}>
        <td>{index + 1}</td>
        <td>{item.categoryName}</td>
        <td>{item.title}</td>
        <td>{formatDate(item.regDate)}</td>
        <td>{item.views}</td>
        <td>{item.likesCount}</td>
    </tr>
);

export default MyBoardTableRowComponent;
