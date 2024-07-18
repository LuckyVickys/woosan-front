import React from 'react';
import useRegularly from '../../hooks/useRegularly';
import MatchingPageTemplate from './MatchingPageTemplate';
import MatchingList from '../../components/matching/MatchingList';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/matching/RegularlyPage.module.scss';

const RegularlyPage = () => {
    const { regularly, loading, error } = useRegularly();
    const navigate = useNavigate();

    // 모임 만들기 버튼 클릭 시 호출되는 함수
    const handleCreateButtonClick = () => {
        navigate('/matching/CreateMatching');
    };

    if (loading) {
        console.log('로딩 중...');
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        return <div className={styles.error}>데이터를 가져오는 중 오류 발생</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.createButton} onClick={handleCreateButtonClick}>모임 만들기</button>
            </div>
            <MatchingPageTemplate
                items={regularly}
                ListComponent={MatchingList}
                gridColumns={2}
            />
        </div>
    );
};

export default RegularlyPage;
