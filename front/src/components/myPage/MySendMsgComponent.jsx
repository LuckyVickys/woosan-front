// MySendMsgComponent.jsx
import React from "react";
import { useSelector } from "react-redux";
import useCustomMsgMove from "../../hooks/useCustomMsgMove";
import { delSendMessage, getSendMessage } from "../../api/myPageApi";
import MyMsgListComponent from "./element/MyMsgListComponent";

const MySendMsgComponent = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const memberType = loginState.memberType;
    const { moveToRead } = useCustomMsgMove(memberType === "ADMIN" ? "/adminPage/send-message" : "/myPage/send-message");

    const fetchMessages = ({ page, size }) => {
        const params = {
            memberId: loginState.id,
            pageRequestDTO: {
                page,
                size
            }
        };
        return getSendMessage(params, loginState.accessToken);
    };

    const deleteMessage = (id) => {
        return delSendMessage(id, loginState.accessToken);
    };

    return (
        <MyMsgListComponent 
            fetchMessages={fetchMessages} 
            deleteMessage={deleteMessage} 
            moveToRead={moveToRead} 
            columnHeaders={["번호", "수신자", "내용", "작성 날짜"]} 
            role="send"
        />
    );
};

export default MySendMsgComponent;
