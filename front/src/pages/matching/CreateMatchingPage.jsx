import React, { useState } from 'react';
import MatchingForm from '../../components/matching/MatchingForm';
import { createRegularly, createTemporary, createSelf } from '../../api/matchingBoardApi';
import styles from '../../assets/styles/matching/CreateMatching.module.scss';

const CreateMatching = () => {
    const [matchingType, setMatchingType] = useState(1); // 기본값: 정기모임

    const handleSubmit = async (data) => {
        try {
            if (matchingType === 1) {
                await createRegularly(data);
                alert('정기모임이 성공적으로 생성되었습니다.');
            } else if (matchingType === 2) {
                await createTemporary(data);
                alert('번개모임이 성공적으로 생성되었습니다.');
            } else if (matchingType === 3) {
                await createSelf(data);
                alert('셀프 소개팅이 성공적으로 생성되었습니다.');
            }
        } catch (error) {
            alert('모임 생성 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.categorySelector}>
                <button
                    className={matchingType === 1 ? styles.active : ''}
                    onClick={() => setMatchingType(1)}
                >
                    정기 모임
                </button>
                <button
                    className={matchingType === 2 ? styles.active : ''}
                    onClick={() => setMatchingType(2)}
                >
                    번개
                </button>
                <button
                    className={matchingType === 3 ? styles.active : ''}
                    onClick={() => setMatchingType(3)}
                >
                    셀프 소개팅
                </button>
            </div>
            <MatchingForm onSubmit={handleSubmit} initialValues={{}} matchingType={matchingType} />
        </div>
    );
};

export default CreateMatching;
