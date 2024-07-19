import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { useParams } from "react-router-dom";
import { getReport } from "../../api/adminApi";
import { deleteBoard } from "../../api/boardApi";
import { deleteReply } from "../../api/replyApi";
import { formatDate } from "../../util/DateUtil";
import Swal from "sweetalert2";
import "../../assets/styles/App.scss";

const initState = {
    id: 0,
    reporterId: 0,
    reporterNickname: "",
    type: "",
    targetId: "",
    complaintReason: "",
    reporteredMemberId: "",
    reporteredMemberNickname: "",
    regDate: "",
    isChecked: false,
    images: null,
    filePathUrl: [],
};

const ReportReadComponent = () => {
    const { id } = useParams();
    const [report, setReport] = useState(initState);
    const [reportType, setReportType] = useState(null);
    const { moveToRead } = useCustomMove();

    const [result, setResult] = useState(false);

    useEffect(() => {
        getReport(id).then((data) => {
            setReport(data);
        });
    }, [id]);

    useEffect(() => {
        if (report.type === "board") {
            setReportType("게시글");
        } else if (report.type === "reply") {
            setReportType("댓글");
        }
    }, [report]);

    const handleLinkClick = (targetId) => {
        if (report.type === "board") {
            moveToRead(targetId, "/board");
        } else if (report.type === "reply") {
            moveToRead(targetId, "/board");
        }
    };

    const handleRemoveTarget = async () => {
        const removeDTO = {
            id: report.targetId,
            writerId: report.reporteredMemberId,
        };

        const result = await Swal.fire({
            title: "삭제 확인",
            text: "정말로 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
        });

        if (result.isConfirmed) {
            try {
                if (report.type === "board") {
                    await deleteBoard(removeDTO);
                } else if (report.type === "reply") {
                    await deleteReply(removeDTO);
                }
                Swal.fire({
                    title: "삭제 완료",
                    text: "신고된 글이 삭제되었습니다.",
                    icon: "success",
                    confirmButtonText: "확인",
                });
            } catch (error) {
                Swal.fire({
                    title: "삭제 실패",
                    text: `삭제 중 오류가 발생했습니다: ${error.message}`,
                    icon: "error",
                    confirmButtonText: "확인",
                });
            }
        }
    };

    const handleReportResult = async () => {
        const result = await Swal.fire({
            title: "삭제 확인",
            text: "정말로 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
        });

        if (result.isConfirmed) {
            try {
                setResult(true);
                Swal.fire({
                    title: "처리 완료",
                    text: "신고 상세 조회 페이지로 돌아갑니다.",
                    icon: "success",
                    confirmButtonText: "확인",
                });
            } catch (error) {
                Swal.fire({
                    title: "삭제 실패",
                    text: `삭제 중 오류가 발생했습니다: ${error.message}`,
                    icon: "error",
                    confirmButtonText: "확인",
                });
            }
        }
    };

    return (
        <div className="read-report-component">
            <div className="report-type-link">
                <label>신고 유형</label>
                <div className="report-type">
                    <div className="report-text">{reportType}</div>
                    <div
                        className="report-link-button"
                        onClick={() => handleLinkClick(report.targetId)}
                    >
                        바로가기
                    </div>
                </div>
            </div>
            <div className="report-member-target">
                <div className="report-member">
                    <label>신고 대상자</label>
                    <div className="report-text">
                        {report.reporteredMemberNickname}
                    </div>
                </div>
                <div className="report-target">
                    <label>신고 글</label>
                    <div className="report-text">{report.targetId}</div>
                </div>
            </div>
            <div className="horizonLine"></div>
            <div className="report-reporter-ragDate">
                <div className="report-reporter">
                    <label>신고자</label>
                    <div className="report-text">{report.reporterNickname}</div>
                </div>
                <div className="report-ragDate">
                    <label>신고 날짜</label>
                    <div className="report-text">
                        {formatDate(report.regDate)}
                    </div>
                </div>
            </div>
            <div className="report-content">
                <label>신고 내용</label>
                <div className="report-content-text">
                    {report.complaintReason}
                </div>
            </div>
            <div className="report-image">
                <label>첨부 파일</label>
                <div className="image-container">
                    {report.filePathUrl.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`image-${index}`}
                            className="image"
                        />
                    ))}
                </div>
            </div>
            <div className="report-buttons">
                <button className="secession-button">신고 대상자 탈퇴</button>
                <button className="remove-button" onClick={handleRemoveTarget}>
                    신고 글 삭제
                </button>
                <button className="finish-button" onClick={handleReportResult}>
                    처리 완료
                </button>
            </div>
        </div>
    );
};

export default ReportReadComponent;
