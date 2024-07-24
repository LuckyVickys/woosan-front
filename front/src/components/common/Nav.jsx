// Nav.jsx
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import '../../assets/styles/App.scss';
import RankingList from "./RankingList";
import { useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../../components/member/LoginModal"; // LoginModal import 추가

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

    return (
        <nav id='navbar' className="nav poppins-medium">
            <div className="category">
                <div className="board">
                    <NavLink to={'/board/'} className={({ isActive }) => isActive ? "active" : ""}>
                        꿀팁
                    </NavLink>
                </div>
                <div className="matching">
                    <NavLink to={'/matching/'} className={({ isActive }) => isActive ? "active" : ""}>
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
                        <NavLink to={'/adminPage/'} className={({ isActive }) => isActive ? "active" : ""}>
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
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />} {/* 로그인 모달 조건부 렌더링 */}
        </nav>
    );
}

export default Nav;
