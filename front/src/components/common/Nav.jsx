import {Link} from "react-router-dom";
import '../../assets/styles/Common.scss';

const Nav = () => {
    return (
        <nav id='navbar' className="nav poppins-medium">
            <div className="catagory">
                <div className="board">
                    <Link to={'/board/'}>꿀팁</Link>
                </div>
                <div className="matching">
                    <Link to={'/matching/'}>모임</Link>
                </div>
                <div className="cs">
                    <Link to={'/cs/'}>고객지원</Link>
                </div>
                <div className="myPage">
                    <Link to={'/myPage/'}>마이페이지</Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav;