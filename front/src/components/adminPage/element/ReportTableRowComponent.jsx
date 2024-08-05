import React, { useState, useEffect } from "react";
import { formatDate } from "../../../util/DateUtil";

const slicedText = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
    } else {
        return str;
    }
};

const ReportTableRowComponent = ({ item, onClick }) => {
    const [reportType, setReportType] = useState(null);
    useEffect(() => {
        if (item.type === "board") {
            setReportType("게시글");
        } else if (item.type === "reply") {
            setReportType("댓글");
        } else if (item.type === "message") {
            setReportType("쪽지");
        }
    }, [item]);
    return (
        <tr onClick={() => onClick(item.id)}>
            <td>{item.id}</td>
            <td>{reportType}</td>
            <td>{slicedText(item.complaintReason, 15)}</td>
            <td>{item.reporterNickname}</td>
            <td>{formatDate(item.regDate)}</td>
            <td>{item.isChecked ? "완료" : "미완료"}</td>
        </tr>
    );
};
export default ReportTableRowComponent;
