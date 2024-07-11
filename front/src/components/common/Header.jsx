import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/image/logo.svg";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import LoginModal from "../member/LoginModal";
import "../../assets/styles/App.scss";
import { useSelector } from "react-redux";
import { getKakaoUserData } from "../../api/kakaoApi";
import { login } from "../../slices/loginSlice";
import Swal from "sweetalert2";
import { getMemberWithEmail } from "../../api/memberApi";
import ProfileDropdown from "../member/ProfileDropdown";

const Header = () => {
  const loginState = useSelector((state) => state.loginSlice);
  console.log("id: " + loginState.id);
  console.log("email: " + loginState.email);

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openFindPW, setOpenFindPW] = useState(false);
  const [kakaoUserData, setKakaoUserData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const closeLoginModal = () => {
    setOpenLogin(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (loginState.email) {
        try {
          console.log("Fetching user data...");
          const memberData = await getMemberWithEmail(loginState.email);
          console.log("Member data fetched: ", memberData);
          setUserData(memberData);

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
    // 프로필 드롭다운 상태가 변경될 때마다 애니메이션을 추가
    if (isProfileDropdownOpen) {
      const dropdown = document.querySelector(".profile-dropdown-wrapper");
      if (dropdown) {
        // setTimeout을 이용하여 애니메이션 효과 부여
        setTimeout(() => {
          dropdown.classList.add("active");
        }, 40); // 50ms 지연 후 애니메이션 시작
      }
    }
  }, [isProfileDropdownOpen]);

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
