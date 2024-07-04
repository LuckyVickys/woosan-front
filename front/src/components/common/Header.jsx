import React, { useState, useEffect, useRef } from "react";

import {Link} from "react-router-dom";
import logoImage from "../../assets/image/logo.svg";
import '../../assets/styles/App.scss';
import LoginModal from "../member/LoginModal";

const Header = () => {
    const [openLogin, setOpenLogin] = useState(false);

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
                <div className='user-msg'></div>
                <div className="loginBar"> | </div>
                <div className="loginButton" id="loginButton" onClick={() => setOpenLogin(true)}>
                    로그인
                </div>
                <div className="profile-box" id="loginProfile">
                    <div className='user-level-nickname'>
                        <div className='user-level'>dmdkrdmr</div>
                        <div className='user-nickname'>dfdfdf</div>
                    </div>
                    <div className='user-profile'></div>
                </div>
            </div>
            {openLogin && <LoginModal/>}
        </header>
    )
}

export default Header;