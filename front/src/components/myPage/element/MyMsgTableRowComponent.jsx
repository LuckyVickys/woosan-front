import React from "react";
import { formatDate } from "../../../util/DateUtil";
import { MdDeleteForever } from "react-icons/md";

const MsgTableRowComponent = ({ item, index, onClick, onDelete, role }) => (
    <tr className="board-row" onClick={onClick}>
        <td>{index + 1}</td>
        <td>{role === "send" ? item.receiverNickname : item.senderNickname}</td>
        <td>{item.content}</td>
        <td>{formatDate(item.regDate)}</td>
        <td onClick={(e) => { e.stopPropagation(); onDelete(); }}><MdDeleteForever /></td>
    </tr>
);

export default MsgTableRowComponent;
