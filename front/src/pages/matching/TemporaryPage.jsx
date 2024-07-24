import React, { useEffect, useState } from 'react';
import useTemporary from '../../hooks/useTemporary';
import MatchingPageTemplate from './MatchingPageTemplate';
import MatchingList from '../../components/matching/MatchingList';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/matching/TemporaryPagePage.module.scss';
import useCustomLogin from '../../hooks/useCustomLogin';
import LoginModal from '../../components/member/LoginModal';

const TemporaryPage = () => {
    const { temporary, loading, error } = useTemporary();
    const navigate = useNavigate();
    const [sortedTemporary, setSortedTemporary] = useState([]);

    // 혜리 추가 - 로그인 상태 확인
    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();

    useEffect(() => {
        if (temporary.length > 0) {
            // 모임 날짜 기준으로 정렬
            const sorted = [...temporary].sort((a, b) => new Date(a.meetDate) - new Date(b.meetDate));
            setSortedTemporary(sorted);
        }
    }, [temporary]);

    // 모임 만들기 버튼 클릭 핸들러
    const handleCreateButtonClick = () => {
        if (!isLogin) {
            moveToLoginReturn();
        } else {
            navigate('/matching/create');
        }
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
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.createButton} onClick={handleCreateButtonClick}>모임 만들기</button>
                </div>
                <MatchingPageTemplate
                    items={sortedTemporary}
                    ListComponent={MatchingList}
                    gridColumns={2}
                />
            </div>
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        </>
    );
};

export default TemporaryPage;
