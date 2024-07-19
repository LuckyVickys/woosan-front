import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReport } from "../../api/adminApi";
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

    return (
        <div className="read-report-component">
            <div className="report-type-link">
                <div className="report-type">
                    <label>신고 유형</label>
                    <div className="report-text">{reportType}</div>
                </div>
                <div className="report-link">바로가기</div>
            </div>
            <div className="report-member-target">
                <div className="report-member">
                    <label>신고 대상자</label>
                    <div className="report-text">
                        {report.reporteredMemberNickname}
                    </div>
                </div>
                <div className="report-target">
                    <label>신고 대상</label>
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
                    <div className="report-text">{report.regDate}</div>
                </div>
            </div>
            <div className="report-content">
                <label>신고 내용</label>
                <div className="report-content-text">
                    {report.complaintReason}
                </div>
            </div>
            <div className="form-buttons">
                <button className="save-button">저장</button>
                <button className="cancel-button">취소</button>
            </div>
        </div>
    );
};

export default ReportReadComponent;
