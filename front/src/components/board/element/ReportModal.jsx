import React, { useState, useEffect, useRef } from 'react';
import { addReport } from "../../../api/reportApi";
import { TiDelete } from "react-icons/ti";
import Swal from 'sweetalert2';
import "../../../assets/styles/App.scss";

const initState = {
    type: "",
    targetId: "",
    reportId: "",
    complaintReason: "",
    reportedId: "",
    files: []
};

const ReportModal = ({ type, targetId, reportId, reportedId, reportednickname, onClose }) => {
    const [report, setReport] = useState({ ...initState });
    const [files, setFiles] = useState([]);
    const uploadRef = useRef();
    const [isClosing, setIsClosing] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    
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
        setFiles(e.target.files);
    };

    const handleClickReportAdd = async (e) => {
        console.log("type :", type, targetId);
        console.log("reportId :", reportId, reportednickname);
        e.preventDefault(); 

        const formData = new FormData();
        formData.append('type', report.type);
        formData.append('targetId', report.targetId);
        formData.append('reportId', report.reportId);
        formData.append('complaintReason', report.complaintReason);
        formData.append('reportedId', report.reportedId);

        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        try {
            const response = await addReport(formData);

            if (response.status === 200) {
                Swal.fire({
                    title: `${reportedId, reportednickname}님을 신고하시겠습니까?`,
                    text: '신고 철회는 불가능합니다.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '신고',
                    cancelButtonText: '취소'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire('신고 완료', `${reportedId}에 대한 신고가 접수되었습니다.`, 'success').then(() => {
                            setIsClosing(true);
                        });
                    }
                });
            } else {
                throw new Error('신고 접수에 실패했습니다.');
            }
        } catch (error) {
            console.error('신고 접수 오류:', error.message);
            Swal.fire('신고 접수 실패', '신고 접수에 실패했습니다.', 'error');
        }
    };


    return (
        <div className='modal-background' onClick={onClose}>
            <div className='report-modal' onClick={(e) => e.stopPropagation()}>
                <div className='report-modal-header'>
                    <div className='report-modal-title'>신고</div>
                    <TiDelete className='delete-icon' onClick={onClose}/>
                </div>
                <div className='report-modal-body'>
                    신고 유형
                    <div className='input type-input' onSelect={handleSelectType}>{selectedType}</div>
                    내용
                    <textarea 
                        className='input report-input' 
                        type="text" 
                        placeholder="내용을 입력해주세요."
                        value={report.complaintReason} 
                        onChange={(e) => setReport({ ...report, complaintReason: e.target.value })} />
                    첨부파일
                    <input
                        className='report-file' 
                        type="file"
                        ref={uploadRef}
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-buttons">
                    <button className="save-button" onClick={handleClickReportAdd}>보내기</button>
                    <button className="cancel-button" onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;