import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getRealTimeSearchRankings } from "../../api/boardApi";
import '../../assets/styles/App.scss';

const Nav = () => {
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const data = await getRealTimeSearchRankings();
                setRankings(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRankings();
    }, []);

    return (
        <nav id='navbar' className="nav poppins-medium">
            <div className="catagory">
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
                    <NavLink to={'/myPage/'} className={({ isActive }) => isActive ? "active" : ""}>
                        마이페이지
                    </NavLink>
                </div>
            </div>

            <div className="real-time-rankings">
                {rankings.length > 0 && (
                    <div className="slide">
                        {rankings.map((keyword, index) => (
                            <div key={index}>{keyword}</div>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Nav;
