// MyReceiveMsgComponent.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useCustomMsgMove from "../../hooks/useCustomMsgMove";
import { delReceiveMessage, getReceiveMessage } from "../../api/myPageApi";
import MyMsgListComponent from "./element/MyMsgListComponent";

const MyReceiveMsgComponent = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const userRole = loginState.role;
    const { moveToRead, moveToReceiveList } = useCustomMsgMove();

    const fetchMessages = ({ page, size }) => {
        const params = {
            memberId: loginState.id,
            pageRequestDTO: {
                page: page,
                size: size
            }
        };
        return getReceiveMessage(params, loginState.accessToken);
    };

    const deleteMessage = (id) => {
        return delReceiveMessage(id, loginState.accessToken);
    };

    return (
        <MyMsgListComponent 
            fetchMessages={fetchMessages} 
            deleteMessage={deleteMessage} 
            moveToRead={moveToRead} 
            moveToList={moveToReceiveList}
            columnHeaders={["번호", "발신자", "내용", "작성 날짜"]} 
            role="receive"
        />
    );
};

export default MyReceiveMsgComponent;
