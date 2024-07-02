import { NavLink } from "react-router-dom";
import '../../assets/styles/App.scss';

const Nav = () => {
    return (
        <nav id='navbar' className="nav poppins-medium">
            <div className="catagory">
                <div className="board">
                    <NavLink
                        to={'/board/'}
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        꿀팁
                    </NavLink>
                </div>
                <div className="matching">
                    <NavLink
                        to={'/matching/'}
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        모임
                    </NavLink>
                </div>
                <div className="cs">
                    <NavLink
                        to={'/cs/'}
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        고객 지원
                    </NavLink>
                </div>
                <div className="myPage">
                    <NavLink
                        to={'/myPage/'}
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        마이페이지
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
