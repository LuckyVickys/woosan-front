import React from "react";
import { formatDate } from "../../../util/DateUtil";

const slicedText = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
    } else {
        return str;
    }
};

const MyRepliesTableRowComponent = ({ item, index, onClick }) => (
    <tr className="board-row" onClick={onClick}>
        <td>{index + 1}</td>
        <td>{item.categoryName}</td>
        <td>{slicedText(item.title, 15)}</td>
        <td>{slicedText(item.content, 15)}</td>
        <td>{formatDate(item.regDate)}</td>
        <td>{item.likesCount}</td>
    </tr>
);

export default MyRepliesTableRowComponent;
