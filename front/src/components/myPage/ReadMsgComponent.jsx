import React, { useEffect, useState } from "react";
import "../../assets/styles/App.scss";
import { useSelector } from "react-redux";
import { formatDate } from "../../util/DateUtil";

const initState = {
    id: 0,
    senderNickname: "",
    receiverNickname: "",
    content: "",
    regDate: "",
};

const ReadMsgComponent = ({ selectedMsg }) => {
    const loginState = useSelector((state) => state.loginSlice);

    const handleMsgSend = (id) => {
        console.log("Sending message");
    }

    const handleMsgDelete = (id) => {
        console.log("Deleting message with ID:", selectedMsg.id);
    };

    const handleMsgList = (id) => {
        console.log("Going back");
    }

    return (
        <>
            <div className="read-msg-title">
                <h1 className="read-msg-title-text">{selectedMsg.state}</h1>
            </div>
            <div className="read-msg-header">
                <div className="left">
                    <div className="read-msg-author-info">
                        <div className="read-msg-author">
                            <div className="read-msg-role sender">{selectedMsg.role}</div> | 
                            {/* <img src={selectedMsg.profile} alt="프로필" className="read-msg-profile-image" /> */}
                            &nbsp; {selectedMsg.nickname} | {formatDate(selectedMsg.regDate)}
                        </div>
                    </div>
                </div>
                <div className="right">
                    <button className="report-button">
                        <div className='report-icon'></div>
                        <div className='report-text'>신고</div>
                    </button>
                </div>
            </div>
            <div className="read-msg-content">
                <p>{selectedMsg.content}</p>
            </div>
            <div className="msg-button">
                <button className="msg-send-button" onClick={handleMsgSend}>답장</button>
                <button className="msg-delete-button" onClick={handleMsgDelete}>삭제</button>

            </div>
        </>
    );
};

export default ReadMsgComponent;