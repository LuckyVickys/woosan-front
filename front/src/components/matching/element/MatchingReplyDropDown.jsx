import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteReply } from '../../../api/matchingBoardReplyApi';
import { MdOutlineLocalPostOffice } from "react-icons/md";

const MatchingReplyDropDown = ({ replyId, openReport, openMsg, onDeleteSuccess, showDeleteButton }) => {
    const loginState = useSelector((state) => state.loginSlice);

    // 댓글 삭제 핸들러
    const handleDelete = () => {
        Swal.fire({
            title: '댓글을 삭제하시겠습니까?',
            text: `${replyId}를 삭제하시면 복구하실 수 없습니다.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReply(replyId, loginState.id)
                    .then(() => {
                        Swal.fire('삭제 완료', `${replyId}가 삭제되었습니다.`, 'success').then(() => {
                            onDeleteSuccess(replyId); // 상태 업데이트를 호출합니다
                        });
                    })
                    .catch((error) => {
                        Swal.fire('삭제 실패', '댓글 삭제에 실패했습니다.', 'error');
                        console.error("Error deleting reply:", error);
                    });
            }
        });
    };

    // 신고 핸들러
    const handleOpenReport = () => {
        openReport();
    };

    // 쪽지 전송 핸들러
    const handleOpenMsg = () => {
        openMsg();
    };

    return (
        <div className="reply-dropdown-wrapper">
            <div className="reply-dropdown-list">
                <div className="reply-dropdown" onClick={handleOpenReport}>
                    <div className="reply-report-icon"></div>
                    <div className="reply-report-text">신고하기</div>
                </div>
                <div className="reply-dropdown" onClick={handleOpenMsg}>
                    <MdOutlineLocalPostOffice className="reply-msg-icon" />
                    <div className="reply-msg-text">쪽지 전송</div>
                </div>
                {showDeleteButton && (
                    <div className="reply-dropdown" onClick={handleDelete}>
                        <div className="reply-delete-icon"></div>
                        <div className="reply-delete-text">삭제하기</div>
                    </div>
                )}
            </div>
        </div>
    );
};

MatchingReplyDropDown.propTypes = {
    replyId: PropTypes.number.isRequired,
    openReport: PropTypes.func.isRequired,
    openMsg: PropTypes.func.isRequired,
    onDeleteSuccess: PropTypes.func.isRequired,
    showDeleteButton: PropTypes.bool.isRequired
};

export default MatchingReplyDropDown;
