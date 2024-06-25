import {Link} from "react-router-dom";
import logoImage from "../../assets/image/logo.svg"; // 이미지 파일 경로
import '../../assets/styles/Common.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <div className="logoImage">
                    <Link to={'/'}><img src={logoImage} alt="Logo" /></Link>
                </div>
                <div className="logoTitle">
                        <Link to={'/'}>우리는 함께 산다</Link>
                </div>
            </div>
            <div className="login">
                <div> | </div>
                <Link to={'/login'} className="loginButton" >
                    로그인
                </Link>
            </div>
        </header>
    )
}

export default Header;