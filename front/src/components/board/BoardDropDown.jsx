import React from 'react';
import { useNavigate } from 'react-router-dom';

const BoardDropDown = ({ id, onSelect }) => {
    const navigate = useNavigate();

    const handleModifyButtonClick = () => {
        navigate(`/board/modify/${id}`); // 올바른 id를 포함한 경로로 이동
    };

    return (
        <div className="board-dropdown-wrapper">
            <div className="board-dropdown-list">
                <div className='board-dropdown'>
                    <div className='board-report-icon'></div>
                    <div className='board-report-text'>신고하기</div>
                </div>
                <div className='board-dropdown'>
                    <div className='board-msg-icon'></div>
                    <div className='board-msg-text'>쪽지 전송</div>
                </div>
                <div className='board-dropdown'>
                    <div className='board-modify-icon'></div>
                    <div className='board-modify-text' onClick={handleModifyButtonClick}>수정하기</div>
                </div>
            </div>
        </div>
    );
}

export default BoardDropDown;
