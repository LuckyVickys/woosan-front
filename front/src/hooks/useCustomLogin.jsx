import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const useCustomLogin = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.loginSlice);  // 로그인 상태
    const isLogin = loginState.email ? true : false;            // 로그인 여부
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const doLogin = async (loginParam) => {    // 로그인 함수
        const action = await dispatch(loginPostAsync(loginParam));
        return action.payload;
    }

    const doLogout = () => {    // 로그아웃 함수
        dispatch(logout());
    }

    const moveToPath = (path) => {  // 페이지 이동
        navigate({pathname: path}, {replace: true});
    }

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    }

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    }

    useEffect(() => {
        // LoginModal이 열릴 때 body 스크롤 방지
        if (isLoginModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isLoginModalOpen]);

    const moveToLoginReturn = () => {   // 로그인 모달 컴포넌트
        openLoginModal();
    }

    // 예외처리 - 수정 필요
    // const exceptionHandler = (ex) => {

    //     console.log("Exception--------------------");
    //     console.log(ex);

    //     const errorMsg = ex.response.data.error;
    //     const errorStr = createSearchParams({error: errorMsg}).toString();

    //     // 로그인해야 하는 경우
    //     if(errorMsg === '') {
    //         Swal.fire({
    //             icon: 'warning',
    //             title: '로그인',
    //             text: '로그인이 필요한 서비스입니다.',
    //         })
    //     } else {
    //         Swal.fire({
    //             icon: 'warning',
    //             title: '레벨업 필요',
    //             text: '레벨2 이상인 회원만 열람할 수 있습니다.',
    //         }).then((result) => {
    //             if(result.isConfirmed) {
    //                 navigate({pathname: '/', search: errorStr});
    //             }
    //         });
    //     }
    // }

    return {loginState, isLogin, doLogin, doLogout, moveToPath, openLoginModal, closeLoginModal, isLoginModalOpen, moveToLoginReturn};
}

export default useCustomLogin;
