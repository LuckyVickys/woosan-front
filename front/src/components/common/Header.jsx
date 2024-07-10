import React, { useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom";
import logoImage from "../../assets/image/logo.svg";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import LoginModal from "../member/LoginModal";
import '../../assets/styles/App.scss';
import { useSelector } from "react-redux";
import { getKakaoUserData } from "../../api/kakaoApi";
import { login } from "../../slices/loginSlice";
import Swal from 'sweetalert2';

const Header = () => {

    const loginState = useSelector(state => state.loginSlice);
    console.log("id: " + loginState.id);
    console.log("email: " + loginState.email);

    const [openLogin, setOpenLogin] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openFindPW, setOpenFindPW] = useState(false);
    const [userData, setUserData] = useState(null);

    const closeLoginModal = () => {
        setOpenLogin(false);
    };

    useEffect(() => {
        // 카카오 로그인 상태일 때만 유저 정보 가져오기
        if(loginState.email && loginState.isKakao) {
            getKakaoUserData(loginState.accessToken)
            .then((userData) => {
                setUserData(userData);
            })
            .catch((error) => {
                Swal.fire({
                    title: `로그인 에러`,
                    text: `다시 시도해주세요.`,
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '확인'
                })
                console.error("Error fetching user data: ", error);
            });
        } else if (loginState.email) {
            // 일반 로그인일 때 사용자 정보 가져오기
        }
    }, [loginState.email, loginState.accessToken, loginState.isKakao]);

    return (
        <header className="header">
          <div className="logo">
            <div className="logoImage">
              <Link to={"/"}>
                <img src={logoImage} alt="Logo" />
              </Link>
            </div>
            <div className="logoTitle">
              <Link to={"/"}>우리는 함께 산다</Link>
            </div>
          </div>
          {loginState.email ? (
            <div className="login">
              <MdOutlineLocalPostOffice className="messageIcon" />
              <div className="loginBar"> | </div>
              {userData ? (
                <div className="profile-box" id="loginProfile">
                  <div className="user-level-nickname">
                    <div className="user-level">Lv3. </div>
                    <div className="user-nickname">{userData.properties.nickname}</div>
                  </div>
                <img className="user-profile" src={userData.properties.profile_image} alt="프로필 이미지" />
                </div>
              ) : (
                <div className="profile-box" id="loginProfile">
                  <div className="user-level-nickname">
                  <div className='user-level'>Lv3. </div>
                  <div className='user-nickname'>카카시</div>
                  </div>
                  <div className='user-profile'></div>
                </div>
              )}
            </div>
          ) : (
            <div className="login">
              <div className="loginBar"> | </div>
              <div
                className="loginButton"
                id="loginButton"
                onClick={() => setOpenLogin(true)}
              >
                로그인
              </div>
            </div>
          )}
          {openLogin && <LoginModal onClose={closeLoginModal} />}
        </header>
      );
    };

export default Header;