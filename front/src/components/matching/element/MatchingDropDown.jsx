import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { useSelector } from 'react-redux';

const MatchingDropDown = ({ id, openReport, openMsg, showModifyButton, memberId }) => {
    const navigate = useNavigate();
    const loginState = useSelector((state) => state.loginSlice);
    const loggedInUserId = loginState.id;

    const handleModifyButtonClick = () => {
        navigate(`/matching/modify/${id}`);
    };

    const handleOpenReport = () => {
        openReport();
    };

    const handleOpenMsg = () => {
        openMsg();
    };

    return (
        <div className="board-dropdown-wrapper">
            <div className="board-dropdown-list">
                {loggedInUserId === memberId ? (
                    showModifyButton && (
                        <div className='board-dropdown' onClick={handleModifyButtonClick}>
                            <div className='board-modify-icon'></div>
                            <div className='board-modify-text'>수정하기</div>
                        </div>
                    )
                ) : (
                    <>
                        <div className='board-dropdown' onClick={handleOpenReport}>
                            <div className='board-report-icon'></div>
                            <div className='board-report-text'>신고하기</div>
                        </div>
                        <div className='board-dropdown'>
                            <MdOutlineLocalPostOffice className='board-msg-icon'/>
                            <div className='board-msg-text' onClick={handleOpenMsg}>쪽지 전송</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default MatchingDropDown;
