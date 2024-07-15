import React, { useState, useEffect, useRef } from "react";
import { addReport } from "../../../api/reportApi";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import "../../../assets/styles/App.scss";

const initState = {
    type: "",
    targetId: "",
    reporterId: "",
    complaintReason: "",
    images: [],
};

const ReportModal = ({ type, targetId, reporterId, onClose }) => {
    const [report, setReport] = useState({ ...initState });
    const [images, setImages] = useState([]); // 파일 상태 관리
    const uploadRef = useRef();
    const [isClosing, setIsClosing] = useState(false);
    const [selectedType, setSelectedType] = useState(null); // 신고 유형

    useEffect(() => {
        setReport({ ...initState });
    }, [targetId, reporterId]);

    useEffect(() => {
        if (isClosing) {
            const timer = setTimeout(() => {
                onClose();
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isClosing, onClose]);

    useEffect(() => {
        handleSelectType();
    }, []);

    const handleSelectType = () => {
        let selectedType = "";

        if (type === "board") {
            selectedType = "게시글";
        } else if (type === "reply") {
            selectedType = "댓글";
        }

        setSelectedType(selectedType); // selectType을 설정
        return selectedType; // 선택된 타입을 반환
    };

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleClickReportAdd = async (e) => {
        console.log("type :", type, targetId);
        console.log("reportId :", reporterId);
        e.preventDefault();

        if (!images || images.length === 0) {
            Swal.fire(
                "첨부 파일 없음",
                "적어도 하나 이상의 파일을 첨부해야 합니다.",
                "error"
            );
            return;
        }

        const formData = new FormData();
        formData.append("type", type);
        formData.append("targetId", targetId);
        formData.append("reporterId", reporterId);
        formData.append("complaintReason", report.complaintReason);

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        try {
            const response = await addReport(formData);

            if (response) {
                Swal.fire({
                    title: `${selectedType}을 신고하시겠습니까?`,
                    text: "신고 철회는 불가능합니다.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "신고",
                    cancelButtonText: "취소",
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            "신고 완료",
                            `${selectedType}에 대한 신고가 접수되었습니다.`,
                            "success"
                        ).then(() => {
                            setIsClosing(true);
                        });
                    }
                });
            } else {
                throw new Error("신고 접수에 실패했습니다.");
            }
        } catch (error) {
            console.error("신고 접수 오류:", error.message);
            Swal.fire("신고 접수 실패", error.message, "error");
        }
    };

    return (
        <div className="report-modal-background" onClick={onClose}>
            <div className="report-modal" onClick={(e) => e.stopPropagation()}>
                <div className="report-modal-header">
                    <div className="report-modal-title">신고</div>
                    <TiDelete className="delete-icon" onClick={onClose} />
                </div>
                <div className="report-modal-body">
                    신고 유형
                    <div
                        className="input type-input"
                        onSelect={handleSelectType}
                    >
                        {selectedType}
                    </div>
                    내용
                    <textarea
                        className="input report-input"
                        type="text"
                        placeholder="내용을 입력해주세요."
                        value={report.complaintReason}
                        onChange={(e) =>
                            setReport({
                                ...report,
                                complaintReason: e.target.value,
                            })
                        }
                    />
                    첨부파일
                    <input
                        className="report-file"
                        type="file"
                        ref={uploadRef}
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <div className="report-form-buttons">
                    <button
                        className="report-save-button"
                        onClick={handleClickReportAdd}
                    >
                        보내기
                    </button>
                    <button className="report-cancel-button" onClick={onClose}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
