// Nav.jsx
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import '../../assets/styles/App.scss';
import RankingList from "./RankingList";
import { useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../../components/member/LoginModal";
import Swal from 'sweetalert2';

const Nav = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const memberType = loginState.memberType;
    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();
    const navigate = useNavigate();

    const handleMyPageClick = (e) => {
        e.preventDefault();
        if (!isLogin) {
            moveToLoginReturn();
        } else if (memberType === "USER") {
            navigate("/mypage");
        }
    }

    const handleMatchingClick = (e) => {
        if (!isLogin) {
            e.preventDefault();
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
        } else {
            if(loginState.level === "LEVEL_1") {
                e.preventDefault();
                Swal.fire({
                    title: "레벨 2 이상의 회원만 이용할 수 있는 서비스입니다.",
                    icon: "error",
                    confirmButtonText: "확인",
                    confirmButtonColor: "#3085d6",
                });
            }
        }
    }

    return (
        <nav id='navbar' className="nav poppins-medium">
            <div className="category">
                <div className="board">
                    <NavLink to={'/board/'} className={({ isActive }) => isActive ? "active" : ""}>
                        꿀팁
                    </NavLink>
                </div>
                <div className="matching">
                    <NavLink to={'/matching/'} className={({ isActive }) => isActive ? "active" : ""} onClick={handleMatchingClick}>
                        모임
                    </NavLink>
                </div>
                <div className="cs">
                    <NavLink to={'/cs/'} className={({ isActive }) => isActive ? "active" : ""}>
                        고객 지원
                    </NavLink>
                </div>
                <div className="mypage">
                    {memberType === "ADMIN" ? (
                        <NavLink to={'/admin/'} className={({ isActive }) => isActive ? "active" : ""}>
                            관리자페이지
                        </NavLink>
                    ) : (
                        <NavLink to={'/mypage/'}
                            className={({ isActive }) => isActive ? "active" : ""}
                            onClick={handleMyPageClick}
                            style={{ cursor: 'pointer' }}
                        >
                            마이페이지
                        </NavLink>
                    )}
                </div>
            </div>
            
            <RankingList />
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        </nav>
    );
}

export default Nav;
