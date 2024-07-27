import React from "react";
import { basicDate } from "../../../util/DateUtil";

const slicedText = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
    } else {
        return str;
    }
};

const TableRowComponent = ({
    item,
    onClick,
    isNotice = false,
    isPopular = false,
}) => (
    <tr
        className={
            isNotice ? "notice-row" : isPopular ? "popular-row" : "board-row"
        }
        onClick={() => onClick(item.id)}
    >
        <td>{isNotice ? "공지사항" : item.categoryName}</td>
        <td>
            {isPopular && <span className="best-label">BEST</span>}
            {slicedText(item.title)}
            <span className="replyCount">({item.replyCount})</span>
        </td>
        <td>{item.nickname}</td>
        <td>{basicDate(item.regDate)}</td>
        <td>{item.views}</td>
        <td>{item.likesCount}</td>
    </tr>
);

export default TableRowComponent;
