import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { useParams } from "react-router-dom";
import { getReport } from "../../api/adminApi";
import { formatDate } from "../../util/DateUtil";
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
        const id = targetId;
        moveToRead(id, "/board");
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
                <button className="remove-button">신고 글 삭제</button>
                <button className="finish-button">처리 완료</button>
            </div>
        </div>
    );
};

export default ReportReadComponent;
