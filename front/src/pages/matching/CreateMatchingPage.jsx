import React, { useState, useEffect } from 'react';
import MatchingForm from '../../components/matching/MatchingForm';
import { createRegularly, createTemporary, createSelf } from '../../api/matchingBoardApi';
import styles from '../../assets/styles/matching/CreateMatching.module.scss';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useCustomLogin from '../../hooks/useCustomLogin';
import LoginModal from '../../components/member/LoginModal';
import { useSelector } from 'react-redux';

const CreateMatchingPage = () => {
    const [matchingType, setMatchingType] = useState(1); // 기본값: 정기모임
    const [categoryDescription, setCategoryDescription] = useState(''); // 카테고리 설명 상태
    const navigate = useNavigate(); // useNavigate 훅 사용
    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();
    const loginState = useSelector((state) => state.loginSlice);
    const memberType = loginState.memberType; // 회원 유형 (USER, ADMIN 등)

    useEffect(() => {
        const description = '정기모임은 레벨3부터 1개만 생성 가능합니다.';
        setCategoryDescription(description);
        Swal.fire({
            title: '카테고리 안내',
            text: description,
            icon: 'info',
            confirmButtonText: '확인'
        });
    }, []);

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
        if (!isLogin || (memberType !== 'USER' && memberType !== 'ADMIN')) {
            Swal.fire({
                title: "로그인이 필요한 서비스입니다.",
                icon: "error",
                confirmButtonText: "확인",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    moveToLoginReturn();
                }
            });
            return;
        }

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
            Swal.fire('오류!', error.response ? error.response.data : error.message, 'error');
        }
    };

    const handleCategoryChange = (e) => {
        const selectedType = Number(e.target.value);
        setMatchingType(selectedType);

        // 스윗알럿으로 설명 띄우기
        let description = '';
        switch (selectedType) {
            case 1:
                description = '정기모임은 레벨3부터 1개만 생성 가능합니다.';
                break;
            case 2:
                description = '번개는 레벨2부터 1개만 생성 가능합니다.';
                break;
            case 3:
                description = '셀프 소개팅은 레벨2부터 1개만 생성 가능합니다.';
                break;
            default:
                break;
        }
        Swal.fire({
            title: '카테고리 안내',
            text: description,
            icon: 'info',
            confirmButtonText: '확인'
        });
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
                    onChange={handleCategoryChange}
                >
                    <option value={1}>정기 모임</option>
                    <option value={2}>번개</option>
                    <option value={3}>셀프 소개팅</option>
                </select>
                <span className={styles.categoryDescription}>{categoryDescription}</span>
            </div>
            <MatchingForm onSubmit={handleSubmit} initialValues={{}} matchingType={matchingType} />
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        </div>
    );
};

export default CreateMatchingPage;
