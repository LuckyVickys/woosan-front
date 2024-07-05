import React, { useState } from 'react';
import '../../../assets/styles/msgModal.scss';
import { TiDelete } from "react-icons/ti";

const MsgModal = () => {
    
    const [isClosing, setIsClosing] = useState(false);

    const handleClickMsgAdd = async (e) => {
        const formData = new FormData();
        formData.append('', );
    }

    return (
        <div className={`modal-background ${isClosing ? 'closing' : ''}`}>
            <div className={`msg-modal ${isClosing ? 'closing' : ''}`}>
                <div className='msg-modal-header'>
                    <div className='msg-modal-title'>쪽지 작성</div>
                    <TiDelete className='delete-icon'/>
                </div>
                <div className='msg-modal-body'>
                    수신자
                    <input className='input receiver-input  E6E6E6' type="text" placeholder="수신자"/>
                    내용
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