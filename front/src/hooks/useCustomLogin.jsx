// useCustomLogin.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";
import { useState, useEffect } from "react";

const useCustomLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.loginSlice);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const doLogin = async (loginParam) => {
        const action = await dispatch(loginPostAsync(loginParam));
        return action.payload;
    }

    const doLogout = () => {
        dispatch(logout());
    }

    const moveToPath = (path) => {
        navigate({ pathname: path }, { replace: true });
    }

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    }

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    }

    useEffect(() => {
        if (isLoginModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isLoginModalOpen]);

    const moveToLoginReturn = () => {
        openLoginModal();
    }

    return { loginState, doLogin, doLogout, moveToPath, openLoginModal, closeLoginModal, isLoginModalOpen, moveToLoginReturn };
}

export default useCustomLogin;
