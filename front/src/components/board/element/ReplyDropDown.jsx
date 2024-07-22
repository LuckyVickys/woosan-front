import React, { useState } from "react";
import ReportModal from "./ReportModal";
import MsgModal from "./MsgModal";
import Swal from "sweetalert2";
import { deleteReply } from "../../../api/replyApi"; // Import deleteReply function
import { useSelector } from "react-redux";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import "../../../assets/styles/App.scss";
import useCustomLogin from '../../../hooks/useCustomLogin';        // 혜리 추가
import LoginModal from '../../../components/member/LoginModal';    // 혜리 추가

const ReplyDropDown = ({
    onSelect,
    replyId,
    openReport,
    openMsg,
    showReportButton,
    showMsgButton,
    showDeleteButton,
    onDeleteSuccess,
    getReplies,
}) => {
    const [openReportModal, setOpenReportModal] = useState(false);
    const [openMsgModal, setOpenMsgModal] = useState(false);
    const loginState = useSelector((state) => state.loginSlice);

    // 혜리 추가 - 로그인 하지 않았을 때 addPage로 이동하지 못하게
    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();

    const handleReport = () => {
        openReport();
    };

    const handleMsg = () => {
        openMsg();
    };

    const handleDelete = () => {
        // onSelect("delete", replyId);
        const removeDTO = {
            id: replyId,
            writerId: loginState.id,
        };
        Swal.fire({
            title: "댓글을 삭제하시겠습니까?",
            text: `${replyId}를 삭제하시면 복구하실 수 없습니다.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReply(removeDTO)
                    .then(() => {
                        Swal.fire(
                            "삭제 완료",
                            `${replyId}가 삭제되었습니다.`,
                            "success"
                        );
                        onDeleteSuccess(replyId);
                        getReplies(); // 댓글 목록 다시 불러오기
                    })
                    .catch((error) => {
                        Swal.fire(
                            "삭제 실패",
                            "댓글 삭제에 실패했습니다.",
                            "error"
                        );
                        console.error("Error deleting reply:", error);
                    });
            }
        });
    };

    return (
        <>
            <div className="comment-dropdown-wrapper">
                <div className="comment-dropdown-list">
                    {showReportButton && (
                        <div className="comment-dropdown" onClick={handleReport}>
                            <div className="comment-report-icon"></div>
                            <div className="comment-report-text">신고하기</div>
                        </div>
                    )}
                    {showMsgButton && (
                        <div className="comment-dropdown" onClick={handleMsg}>
                            <MdOutlineLocalPostOffice className="comment-msg-icon" />
                            <div className="comment-msg-text">쪽지 전송</div>
                        </div>
                    )}
                    {showDeleteButton && (
                        <div
                            className="comment-dropdown"
                            onClick={handleDelete}
                        >
                            <div className="comment-delete-icon"></div>
                            <div className="comment-delete-text">삭제하기</div>
                        </div>
                    )}
                </div>
            </div>
            {openReportModal && (
                <ReportModal onClose={() => setOpenReportModal(false)} />
            )}
            {/* {openMsgModal && (
                <MsgModal onClose={() => setOpenMsgModal(false)} />
            )} */}
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        </>
    );
};

export default ReplyDropDown;
