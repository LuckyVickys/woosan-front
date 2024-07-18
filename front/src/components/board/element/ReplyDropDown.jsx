import React, { useState } from "react";
import ReportModal from "./ReportModal";
import MsgModal from "./MsgModal";
import Swal from "sweetalert2";
import { deleteReply } from "../../../api/replyApi"; // Import deleteReply function
import { useSelector } from "react-redux";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import "../../../assets/styles/App.scss";

const ReplyDropDown = ({
    onSelect,
    replyId,
    openReport,
    openMsg,
    showReportButton,
    showMsgButton,
    showDeleteButton,
    onDeleteSuccess,
}) => {
    const [openReportModal, setOpenReportModal] = useState(false);
    const [openMsgModal, setOpenMsgModal] = useState(false);
    const loginState = useSelector((state) => state.loginSlice);

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
                        ).then(() => {
                            onDeleteSuccess(replyId); // 여기에서 상태 업데이트를 호출합니다
                        });
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
        </>
    );
};

export default ReplyDropDown;
