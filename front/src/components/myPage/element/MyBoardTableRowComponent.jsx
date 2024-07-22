import React from "react";
import { formatDate } from "../../../util/DateUtil";

const slicedText = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
    } else {
        return str;
    }
};

const MyBoardTableRowComponent = ({ item, index, onClick }) => (
    <tr className="board-row" onClick={onClick}>
        <td>{index + 1}</td>
        <td>{item.categoryName}</td>
        <td>{slicedText(item.title, 15)}</td>
        <td>{formatDate(item.regDate)}</td>
        <td>{item.views}</td>
        <td>{item.likesCount}</td>
    </tr>
);

export default MyBoardTableRowComponent;
