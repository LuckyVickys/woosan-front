import React, { useEffect, useState } from 'react';
import useTemporary from '../../hooks/useTemporary';
import MatchingPageTemplate from './MatchingPageTemplate';
import MatchingList from '../../components/matching/MatchingList';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/matching/TemporaryPagePage.module.scss';
import useCustomLogin from '../../hooks/useCustomLogin';
import LoginModal from '../../components/member/LoginModal';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const TemporaryPage = () => {
    const { temporary, loading, error } = useTemporary();
    const navigate = useNavigate();
    const [sortedTemporary, setSortedTemporary] = useState([]);

    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();

    const loginState = useSelector((state) => state.loginSlice);
    const memberLevel = loginState.level;

    useEffect(() => {
        if (temporary.length > 0) {
            const sorted = [...temporary].sort((a, b) => new Date(a.meetDate) - new Date(b.meetDate));
            setSortedTemporary(sorted);
        }
    }, [temporary]);

    const handleCreateButtonClick = () => {
        if (!isLogin) {
            moveToLoginReturn();
        } else if (memberLevel === 'LEVEL_1') {
            Swal.fire({
                title: "레벨 제한",
                html: "정기모임 레벨3이상 1인1개<br>번개, 셀프소개팅 레벨2이상 1인 1개",
                icon: "warning",
                confirmButtonText: "확인"
            });
        } else {
            navigate('/matching/create');
        }
    };

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
