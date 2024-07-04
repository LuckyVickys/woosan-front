// src/components/TableRowComponent.jsx
import React from "react";
import { formatDate } from "../../../util/DateUtil";

const TableRowComponent = ({ item, onClick, isNotice = false, isPopular = false }) => (
    <tr className={isNotice ? "notice-row" : isPopular ? "popular-row" : "board-row"} onClick={() => onClick(item.id)}>
        <td>{isNotice ? "공지" : item.categoryName}</td>
        <td>
            {isPopular && <span className="best-label">BEST</span>}
            {item.title}
            <span className="replyCount">({item.replyCount})</span>
        </td>
        <td>{item.nickname}</td>
        <td>{formatDate(item.regDate)}</td>
        <td>{item.views}</td>
        <td>{item.likesCount}</td>
    </tr>
);

export default TableRowComponent;
