import React, { useState, useEffect } from 'react';
import useSelf from '../../hooks/useSelf';
import MatchingPageTemplate from './MatchingPageTemplate';
import MatchingList from '../../components/matching/MatchingList';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/matching/SelfPage.module.scss';
import useCustomLogin from '../../hooks/useCustomLogin';
import LoginModal from '../../components/member/LoginModal';

const SelfPage = () => {
    const { self, loading, error, fetchSelf } = useSelf();
    const navigate = useNavigate();

    // 로그인 상태 확인
    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();

    // 모임 만들기 버튼 클릭 핸들러
    const handleCreateButtonClick = () => {
        if (!isLogin) {
            moveToLoginReturn();
        } else {
            navigate('/matching/create');
        }
    };

    useEffect(() => {
        fetchSelf();
    }, [fetchSelf]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>데이터를 가져오는 중 오류 발생</div>;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.createButton} onClick={handleCreateButtonClick}>모임 만들기</button>
                </div>
                <MatchingPageTemplate
                    items={self}
                    ListComponent={MatchingList}
                    gridColumns={2}
                    matchingType="self"
                />
            </div>
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        </>
    );
};

export default SelfPage;
