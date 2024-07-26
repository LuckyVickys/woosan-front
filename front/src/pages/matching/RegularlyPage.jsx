import React from 'react';
import useRegularly from '../../hooks/useRegularly';
import MatchingPageTemplate from './MatchingPageTemplate';
import MatchingList from '../../components/matching/MatchingList';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/matching/RegularlyPage.module.scss';
import useCustomLogin from '../../hooks/useCustomLogin';        // 혜리 추가
import LoginModal from '../../components/member/LoginModal';    // 혜리 추가
import Swal from 'sweetalert2'; // 스윗알럿 추가
import { useSelector } from 'react-redux'; // 로그인 상태 가져오기 위해 추가

const RegularlyPage = () => {
    const { regularly, loading, error } = useRegularly();
    const navigate = useNavigate();

    // 혜리 추가 - 로그인 하지 않았을 때 addPage로 이동하지 못하게
    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();
    
    // 레벨 정보를 가져오기 위해 useSelector 사용
    const loginState = useSelector((state) => state.loginSlice);
    const memberLevel = loginState.level;

    // 모임 만들기 버튼 클릭 시 호출되는 함수
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
                    items={regularly}
                    ListComponent={MatchingList}
                    gridColumns={2}
                />
            </div>
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        </>
    );
};

export default RegularlyPage;
