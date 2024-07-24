import React from "react";
import { useSelector } from "react-redux";
import useCustomMsgMove from "../../hooks/useCustomMsgMove";
import { delReceiveMessage, getReceiveMessage } from "../../api/myPageApi";
import MyMsgListComponent from "./element/MyMsgListComponent";

const MyReceiveMsgComponent = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const userRole = loginState.role;
    const { moveToRead } = useCustomMsgMove(userRole === "ADMIN" ? "/admin/receive-message" : "/myPage/receive-message");

    const fetchMessages = ({ page, size }) => {
        const params = {
            memberId: loginState.id,
            pageRequestDTO: {
                page,
                size
            }
        };
        return getReceiveMessage(params);
    };

    const deleteMessage = (id) => {
        return delReceiveMessage(id);
    };

    return (
        <MyMsgListComponent 
            fetchMessages={fetchMessages} 
            deleteMessage={deleteMessage} 
            moveToRead={moveToRead} 
            columnHeaders={["번호", "발신자", "내용", "작성 날짜"]} 
            role="receive"
        />
    );
};

export default MyReceiveMsgComponent;
