import React, { useState, useEffect } from 'react';
import MatchingForm from '../../components/matching/MatchingForm';
import { createRegularly, createTemporary, createSelf } from '../../api/matchingBoardApi';
import styles from '../../assets/styles/matching/CreateMatching.module.scss';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreateMatchingPage = () => {
    const [matchingType, setMatchingType] = useState(1); // 기본값: 정기모임
    const [categoryDescription, setCategoryDescription] = useState(''); // 카테고리 설명 상태
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        switch (matchingType) {
            case 1:
                setCategoryDescription('정기모임은 레벨3부터 1개만 생성 가능합니다.');
                break;
            case 2:
                setCategoryDescription('번개는 레벨2부터 1개만 생성 가능합니다.');
                break;
            case 3:
                setCategoryDescription('셀프 소개팅은 레벨2부터 1개만 생성 가능합니다.');
                break;
            default:
                setCategoryDescription('');
                break;
        }
    }, [matchingType]);

    const handleSubmit = async (formData) => {
        try {
            if (matchingType === 1) {
                await createRegularly(formData);
                Swal.fire('성공!', '정기모임이 성공적으로 생성되었습니다.', 'success');
            } else if (matchingType === 2) {
                await createTemporary(formData);
                Swal.fire('성공!', '번개모임이 성공적으로 생성되었습니다.', 'success');
            } else if (matchingType === 3) {
                await createSelf(formData);
                Swal.fire('성공!', '셀프 소개팅이 성공적으로 생성되었습니다.', 'success');
            }
            navigate(-1);
        } catch (error) {
            console.error('모임 생성 중 오류 발생:', error);
            Swal.fire('오류!', error.response ? error.response.data : error.message, 'error');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleBar}>
                <div className={styles.titleBarLine}></div>
                <div className={styles.titleBarText}>모임 만들기</div>
            </div>
            <div className={styles.categorySelector}>
                <label htmlFor="category">모임 카테고리</label>
                <select
                    id="category"
                    value={matchingType}
                    onChange={(e) => setMatchingType(Number(e.target.value))}
                >
                    <option value={1}>정기 모임</option>
                    <option value={2}>번개</option>
                    <option value={3}>셀프 소개팅</option>
                </select>
                <span className={styles.categoryDescription}>{categoryDescription}</span>
            </div>
            <MatchingForm onSubmit={handleSubmit} initialValues={{}} matchingType={matchingType} />
        </div>
    );
};

export default CreateMatchingPage;
