import React, { useEffect, useState } from "react";
import "../../assets/styles/App.scss";
import { useSelector } from "react-redux";
import { formatDate } from "../../util/DateUtil";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { delSendMessage } from "../../api/myPageApi";
import MsgModal from "../board/element/MsgModal";

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: {
        page: 0,
        size: 10
    },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
};

const ReadMsgComponent = ({ selectedMsg, deleteMessage }) => {
    const loginState = useSelector((state) => state.loginSlice);
    const [msgData, setMsgData] = useState(initState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleMsgSend = (id) => {
        setIsModalOpen(true);
    }

    const handleMsgDelete = () => {
        Swal.fire({
            title: '쪽지를 삭제하시겠습니까?',
            icon: "warning",
            text: '삭제한 쪽지는 복구할 수 없습니다.',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                delSendMessage(selectedMsg.id).then(() => {
                    Swal.fire({
                        title: '삭제가 완료되었습니다.',
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: '확인',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/myPage/send-message");
                        }
                    });
                    setMsgData((prevData) => ({
                        ...prevData,
                        dtoList: prevData.dtoList.filter((msg) => msg.id !== selectedMsg.id)
                    }));
                }).catch(err => {
                    Swal.fire({
                        title: '삭제 실패',
                        icon: 'error',
                        text: '잠시 후 다시 시도해주세요.',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: '확인'
                    });
                });
            }
        });
    };

    const roleClassName = selectedMsg.role === "발신자" ? "sender" : "receiver";
    const isRemsg = selectedMsg.role === "발신자" ? true : false;

    return (
        <>
            <div className="read-msg-title">
                <h1 className="read-msg-title-text">{selectedMsg.state}</h1>
            </div>
            <div className="read-msg-header">
                <div className="left">
                    <div className="read-msg-author-info">
                        <div className="read-msg-author">
                            <div className={`read-msg-role ${roleClassName}`}>{selectedMsg.role}</div> | 
                            {selectedMsg.nickname} | {formatDate(selectedMsg.regDate)}
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
                {isRemsg && <button className="msg-send-button" onClick={handleMsgSend}>답장</button>}
                <button className="msg-delete-button" onClick={handleMsgDelete}>삭제</button>
            </div>
            {isModalOpen && (
                <MsgModal 
                    senderId={loginState.id} 
                    receiver={selectedMsg.nickname} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </>
    );
};

export default ReadMsgComponent;
