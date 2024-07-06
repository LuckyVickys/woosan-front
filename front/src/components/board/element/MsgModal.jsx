import React, { useState, useEffect } from 'react';
import "../../../assets/styles/App.scss";
import { TiDelete } from "react-icons/ti";

const MsgModal = ({ writerId, nickname, onClose }) => {
    console.log("Sending msg :", writerId, nickname);
    
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isClosing) {
          const timer = setTimeout(() => {
            onClose();
          }, 200); 
          return () => clearTimeout(timer); 
        }
      }, [isClosing, onClose]);

    const handleClickMsgAdd = async (e) => {
        const formData = new FormData();
        formData.append('', );
    }

    return (
        <div className='modal-background' onClick={onClose}>
            <div className='msg-modal' onClick={(e) => e.stopPropagation()}>
                <div className='msg-modal-header'>
                    <div className='msg-modal-title'>쪽지 작성</div>
                    <TiDelete className='delete-icon' onClick={onClose}/>
                </div>
                <div className='msg-modal-body'>
                    수신자
                    <div className='input receiver-input  E6E6E6'>{nickname}</div>
                    <textarea className='input message-input E6E6E6' type="text" placeholder="내용"/>
                </div>
                <div className="form-buttons">
                    <button className="save-button" onClick={handleClickMsgAdd}>보내기</button>
                    <button className="cancel-button">취소</button>
                </div>
            </div>
        </div>
    );
};

export default MsgModal;