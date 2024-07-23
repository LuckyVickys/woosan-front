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
import defaultProfile from "../../assets/image/profile.png";


const Header = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const memberType = loginState.memberType;

  const [openLogin, setOpenLogin] = useState(false);
  const [kakaoUserData, setKakaoUserData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileBoxRef = useRef(null);

  const navigate = useNavigate();

  const closeLoginModal = () => {
    setOpenLogin(false);
  };

  const navToMessages = () => {
    navigate(memberType === "ADMIN" ? "/adminPage/receive-message" : "/myPage/receive-message");
  }

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (loginState.email) {
        try {
          const userData = await getMemberWithEmail(loginState.email, loginState.accessToken);
          setUserData(userData);

          if (loginState.isKakao) {
            const kakaoData = await getKakaoUserData(loginState.accessToken);
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
        }
      }
    };
    fetchData();
  }, []);

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
        const handleClickOutside = (event) => {
            if (profileBoxRef.current && !profileBoxRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
            <div className="profile-box" id="loginProfile" ref={profileBoxRef}>
              <div className="user-level-nickname">
                <div className="user-level">
                {userData.memberType === "ADMIN" ? userData.memberType : userData.level}
                </div>
                <div className="user-nickname">{userData.nickname}</div>
              </div>
              {userData.profile && userData.profile.length > 0 ? (
                <img
                  className="user-profile"
                  src={userData.profile[0]}
                  alt="프로필 이미지"
                  onClick={toggleProfileDropdown}
                />
              ) : (
                <img
                className="user-profile"
                src={defaultProfile}
                alt="프로필 기본 이미지"
                onClick={toggleProfileDropdown}
              />
              )}
              {isProfileDropdownOpen && <ProfileDropdown userData={userData} />}
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
