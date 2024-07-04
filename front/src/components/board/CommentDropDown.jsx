import React, { useState } from 'react';

import ReportModal from '../../components/board/element/ReportModal';
import MsgModal from '../../components/board/element/MsgModal';
import Swal from 'sweetalert2';

const CommentDropDown = ({ onSelect, commentId, replyId }) => {
    const [openReportModal, setOpenReportModal] = useState(false);
    const [openMsgModal, setOpenMsgModal] = useState(false);

    const handleReport = () => {
        if (commentId) {
            console.log("Send Report commentId:", commentId);
            onSelect("report", commentId);
        } else if (replyId) {
            console.log("Send Report replyId:", replyId);
            onSelect("report", replyId);
        }
        setOpenReportModal(true);
    };

    const handleMsg = () => {
        if (commentId) {
            console.log("Send Msg commentId:", commentId);
            onSelect("msg", commentId);
        } else if (replyId) {
            console.log("Send Msg replyId:", replyId);
            onSelect("msg", replyId);
        }
        setOpenMsgModal(true);
    };

    const handleDelete = () => {
        if (commentId) {
            console.log("Deleted commentId:", commentId);
            onSelect("delete", commentId);
            Swal.fire({
                title: '게시글 삭제',
                text: `${commentId}를 삭제하시겠습니까?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '삭제',
                cancelButtonText: '취소'
            }).then((result) => {
                if (result.isConfirmed) {
                    // 삭제 기능
                    Swal.fire('삭제 완료', `${commentId}가 삭제되었습니다.`, 'success');
                    console.log("Finished commentId:", commentId);
                }
            });
        } else if (replyId) {
            console.log("Deleted replyId:", replyId);
            onSelect("delete", replyId);
            Swal.fire({
                title: '게시글 삭제',
                text: `${replyId}를 삭제하시겠습니까?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '삭제',
                cancelButtonText: '취소'
            }).then((result) => {
                if (result.isConfirmed) {
                    // 삭제 기능
                    Swal.fire('삭제 완료', `${replyId}가 삭제되었습니다.`, 'success');
                    console.log("Finished replyId:", replyId);
                }
            });
        }
    };

    return (
        <>
            <div className="comment-dropdown-wrapper">
                <div className="comment-dropdown-list">
                    <div className='comment-dropdown' onClick={handleReport}>
                        <div className='comment-report-icon'></div>
                        <div className='comment-report-text'>신고하기</div>
                    </div>
                    <div className='comment-dropdown' onClick={handleMsg}>
                        <div className='comment-msg-icon'></div>
                        <div className='comment-msg-text'>쪽지 전송</div>
                    </div>
                    <div className='comment-dropdown' onClick={handleDelete}>
                        <div className='comment-delete-icon'></div>
                        <div className='comment-delete-text'>삭제하기</div>
                    </div>
                </div>
            </div>
            {openReportModal && (
                <ReportModal onClose={() => setOpenMsgModal(false)} />
            )}
            {openMsgModal && (
                <MsgModal onClose={() => setOpenMsgModal(false)} />
            )}
        </>
    );
};

export default CommentDropDown;