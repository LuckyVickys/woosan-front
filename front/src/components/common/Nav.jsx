import { NavLink } from "react-router-dom";
import React from "react";
import '../../assets/styles/App.scss';
import RankingList from "./RankingList";
import { useSelector } from "react-redux";

const Nav = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const memberType = loginState.memberType;

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
                <div className="myPage">
                    {memberType === "USER" ? (
                        <NavLink to={'/myPage/'} className={({ isActive }) => isActive ? "active" : ""}>
                            마이페이지
                        </NavLink>
                    ) : (
                        <NavLink to={'/adminPage/'} className={({ isActive }) => isActive ? "active" : ""}>
                            관리자페이지
                        </NavLink>
                    )}
                    
                </div>
            </div>

            <RankingList />
        </nav>
    );
}

export default Nav;
