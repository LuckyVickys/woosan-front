import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineLocalPostOffice } from "react-icons/md";

const BoardDropDown = ({
    id,
    openReport,
    openMsg,
    showReportButton,
    showMsgButton,
    showModifyButton,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
    }, [location.search]);

    const handleModifyButtonClick = (params) => {
        if (location.pathname.includes("/board/")) {
            navigate(`/board/modify/${id}`);
        } else if (location.pathname.includes("/cs/notices/")) {
            navigate(`/adminPage/notice/modify/${id}`);
        }
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
                {showReportButton && (
                    <div className="board-dropdown" onClick={handleOpenReport}>
                        <div className="board-report-icon"></div>
                        <div className="board-report-text">신고하기</div>
                    </div>
                )}
                {showMsgButton && (
                    <div className="board-dropdown" onClick={handleOpenMsg}>
                        <MdOutlineLocalPostOffice className="board-msg-icon" />
                        <div className="board-msg-text">쪽지 전송</div>
                    </div>
                )}
                {showModifyButton && (
                    <div
                        className="board-dropdown"
                        onClick={handleModifyButtonClick}
                    >
                        <div className="board-modify-icon"></div>
                        <div className="board-modify-text">수정하기</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardDropDown;
