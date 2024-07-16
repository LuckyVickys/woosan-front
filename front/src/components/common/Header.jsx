import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/image/logo.svg";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import LoginModal from "../member/LoginModal";
import "../../assets/styles/App.scss";
import { useSelector } from "react-redux";
import { getKakaoUserData } from "../../api/kakaoApi";
import Swal from "sweetalert2";
import { getMemberWithEmail } from "../../api/memberApi";
import ProfileDropdown from "../member/ProfileDropdown";
import { login } from "../../slices/loginSlice";

const Header = () => {
  const loginState = useSelector((state) => state.loginSlice);
  // loginState 값을 콘솔에 출력
  useEffect(() => {
    console.log("loginState: ", loginState);
  }, [loginState]);

  const [openLogin, setOpenLogin] = useState(false);
  const [kakaoUserData, setKakaoUserData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const closeLoginModal = () => {
    setOpenLogin(false);
  };

  const navToMessages = () => {
    navigate(`/myPage/msg`);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (loginState.email) {
        try {
          console.log("HEADER Fetching user data...");
          const userData = await getMemberWithEmail(loginState.email);
          console.log("HEADER data fetched: ", userData);
          setUserData(userData);

          if (loginState.isKakao) {
            const kakaoData = await getKakaoUserData(loginState.accessToken);
            console.log("Kakao user data fetched: ", kakaoData);
            setKakaoUserData(kakaoData);
          }
        } catch (error) {
          Swal.fire({
            title: `로그인 에러`,
            text: `다시 시도해주세요.`,
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "확인",
          });
          console.error("Error fetching user data: ", error);
        }
      }
    };
    fetchData();
  }, [loginState.email, loginState.accessToken, loginState.isKakao]);

  useEffect(() => {
    if (isProfileDropdownOpen) {
      const dropdown = document.querySelector(".profile-dropdown-wrapper");
      if (dropdown) {
        setTimeout(() => {
          dropdown.classList.add("active");
        }, 40);
      }
    }
  }, [isProfileDropdownOpen]);

  useEffect(() => {
    if (loginState.profile && loginState.profile.length > 0) {
      console.log("HeaderConsoleProfile: ", loginState.profile[0]);
    } else {
      console.log("HeaderConsoleProfile: No profile image");
    }
  }, [loginState.profile]);

  return (
    <header className="header">
      <div className="logo">
        <div className="logoImage">
          <Link to="/">
            <img src={logoImage} alt="Logo" />
          </Link>
        </div>
        <div className="logoTitle">
          <Link to="/">우리는 함께 산다</Link>
        </div>
      </div>
      {loginState.email ? (
        <div className="login">
          <MdOutlineLocalPostOffice
            className="messageIcon"
            onClick={navToMessages}
          />
          <div className="loginBar"> | </div>
          {userData ? (
            <div className="profile-box" id="loginProfile">
              <div className="user-level-nickname">
                <div className="user-level">{userData.level}</div>
                <div className="user-nickname">
                  {loginState.isKakao
                    ? kakaoUserData?.properties?.nickname
                    : userData.nickname}
                </div>
              </div>
              {loginState.isKakao ? (
                <img
                  className="user-profile"
                  src={kakaoUserData?.properties?.profile_image}
                  alt="프로필 이미지"
                  onClick={toggleProfileDropdown}
                />
              ) : userData.profile && userData.profile.length > 0 ? (
                <img
                  className="user-profile"
                  src={userData.profile[0]}
                  alt="프로필 이미지"
                  onClick={toggleProfileDropdown}
                />
              ) : (
                <div
                  className="user-profile"
                  onClick={toggleProfileDropdown}
                ></div>
              )}
              {isProfileDropdownOpen && <ProfileDropdown />}
            </div>
          ) : (
            <div className="profile-box" id="loginProfile">
              <div className="user-level-nickname">
                <div className="user-level">로딩 중...</div>
              </div>
              <div className="user-profile"></div>
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
