import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MatchingForm from '../../components/matching/MatchingForm';
import { getMatchingBoardsByMemberId, updateMatchingBoard, deleteMatchingBoard } from '../../api/matchingBoardApi';
import styles from '../../assets/styles/matching/ModifyMatching.module.scss';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const ModifyMatchingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const loginState = useSelector((state) => state.loginSlice);
    const [matching, setMatching] = useState(null);
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]); // 파일 상태 관리
    const [existingFiles, setExistingFiles] = useState([]); // 기존 파일 상태 관리

    useEffect(() => {
        const fetchMatching = async () => {
            try {
                const response = await getMatchingBoardsByMemberId(loginState.id);
                const matchingBoard = response.find((board) => board.id === Number(id));
                if (matchingBoard) {
                    setMatching(matchingBoard);
                    setExistingFiles(matchingBoard.filePathUrl ? [{ url: matchingBoard.filePathUrl }] : []);
                } else {
                    Swal.fire('오류!', '매칭 보드를 찾을 수 없습니다.', 'error');
                    navigate(-1);
                }
            } catch (error) {
                console.error('Error fetching matching:', error);
                Swal.fire('오류!', '매칭 정보를 불러오는 중 문제가 발생했습니다.', 'error');
                navigate(-1);
            } finally {
                setLoading(false);
            }
        };
        fetchMatching();
    }, [id, loginState.id, navigate]);

    const handleSubmit = async (formData) => {
        try {
            files.forEach((file, index) => {
                if (file instanceof File) {
                    formData.append('images', file);
                }
            });

            await updateMatchingBoard(id, formData);
            Swal.fire('성공!', '매칭이 성공적으로 수정되었습니다.', 'success');
            navigate(`/matching/${id}`);
        } catch (error) {
            console.error('매칭 수정 중 오류 발생:', error);
            Swal.fire('오류!', error.response ? error.response.data : error.message, 'error');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteMatchingBoard(id, loginState.id);
            Swal.fire('성공!', '매칭이 성공적으로 삭제되었습니다.', 'success');
            navigate('/matching');
        } catch (error) {
            console.error('매칭 삭제 중 오류 발생:', error);
            Swal.fire('오류!', error.response ? error.response.data : error.message, 'error');
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const getMatchingTypeLabel = (type) => {
        switch (type) {
            case 1:
                return '정기 모임';
            case 2:
                return '번개';
            case 3:
                return '셀프 소개팅';
            default:
                return '';
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!matching) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleBar}>
                <div className={styles.titleBarLine}></div>
                <div className={styles.titleBarText}>모임 수정하기</div>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="matchingType">매칭 타입</label>
                <input
                    id="matchingType"
                    value={getMatchingTypeLabel(matching.matchingType)}
                    readOnly
                    className={styles.readOnlyInput}
                />
            </div>
            <MatchingForm onSubmit={handleSubmit} initialValues={matching} matchingType={matching.matchingType} />
            <div className={styles.formGroup}>
                <label>기존 파일</label>
                <div className={styles.fileList}>
                    {existingFiles.map((file, index) => (
                        <div key={index} className={styles.fileItem}>
                            <img src={file.url} alt="preview" width="100" height="100" />
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handleDelete} className={styles.deleteButton}>모임 삭제</button>
        </div>
    );
};

export default ModifyMatchingPage;
