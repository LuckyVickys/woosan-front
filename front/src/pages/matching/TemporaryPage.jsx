import React from 'react';
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

    // 혜리 추가 - 로그인 하지 않았을 때 addPage로 이동하지 못하게
    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();

    // 모임 만들기 버튼 클릭 시 호출되는 함수
    const handleCreateButtonClick = () => {
        // 혜리 추가 - 로그인 하지 않았을 때 addPage로 이동하지 못하게
        if(!isLogin) {
            moveToLoginReturn();
        } else {
            navigate('/matching/CreateMatching');
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
                    items={temporary}
                    ListComponent={MatchingList}
                    gridColumns={1}
                />
            </div>
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        </>
    );
};

export default TemporaryPage;
