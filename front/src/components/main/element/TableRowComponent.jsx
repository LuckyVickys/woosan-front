import React from "react";
import "../../../assets/styles/App.scss";
import { formatDate } from "../../../util/DateUtil";

const slicedTitle = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    } else {
        return str;
    }
}

const TableRowComponent = ({ item, onClick, className, isNotice = false, isPopular = false }) => (
    <tr
        className={`${className} ${isNotice ? "notice-row" : isPopular ? "popular-row" : "board-row"}`}
        onClick={() => onClick(item.id)}
        style={{ cursor: "pointer" }} // 클릭 가능한 커서 스타일 추가
    >
        {isNotice ? (
            <>
                <td className="noticelist-category">{item.categoryName}</td>
                <td className="noticelist-title">{slicedTitle(item.title, 15)}</td>
                <td className="noticelist-date">{new Date(item.regDate).toLocaleDateString()}</td>
            </>
        ) : (
            <>
                <td className="likelist-category">{item.categoryName}</td>
                <td className="likelist-title">
                    {slicedTitle(item.title, 15)}
                </td>
                <td className="likelist-like">
                    <div className='likelist-like-icon'></div>
                    {item.likesCount}
                </td>
            </>
        )}
    </tr>
);

export default TableRowComponent;
