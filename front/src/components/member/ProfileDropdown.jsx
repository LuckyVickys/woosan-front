import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/App.scss";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import Swal from "sweetalert2";
import { logout } from "../../slices/loginSlice";

const ProfileDropdown = ({userData}) => {
    const loginState = useSelector((state) => state.loginSlice);
    const memberType = loginState.memberType;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const navToMypage = () => {
        navigate(memberType === "ADMIN" ? "/admin" : "/mypage");
    };

    const navToMessages = () => {
        navigate(
            memberType === "ADMIN"
                ? "/admin/send-message"
                : "/mypage/send-message"
        );
    };

    const navToLikes = () => {
        navigate(`/mypage/like`);
    };

    const handleLogout = () => {
        Swal.fire({
            icon: "warning",
            title: "로그아웃 하시겠습니까?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logout());
                Swal.fire({
                    icon: "success",
                    title: "로그아웃 되었습니다.",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "확인",
                }).then((res) => {
                    if (result.isConfirmed) {
                        navigate("/");
                    }
                });
            }
        });
    };

    const toggleMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const pointPercent =
        ((userData.point / userData.nextPoint) * 100).toFixed(1) + "%";


    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
        }
    }, []);
    
    useEffect(() => {
        document.documentElement.setAttribute('display-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);
    
    return (
        <>
            <div className="profile-dropdown-wrapper">
                <div className="profile-triangle" />
                <div className="profile-contents">
                    <div className="profile-info-wrapper">
                        <div className="profile-nickname">
                            {userData.nickname}
                        </div>
                        <div className="profile-email">{userData.email}</div>
                    </div>
                    <hr />
                    {memberType === "USER" && (
                        <>
                            <div className="profile-level-point">
                            <div className="profile-level">{userData.level}</div>
                            <div className="profile-point-bar-wrapper">
                                <div
                                    className="profile-point-bar point-bar"
                                    style={{ width: pointPercent }}
                                />
                                <div className="profile-nextpoint-bar point-bar" />
                            </div>
                            <div className="profile-point-info">
                                <div className="profile-point-wrapper">
                                    <div className="profile-point">
                                        {userData.point}
                                    </div>{" "}
                                    /
                                    <div className="profile-nextpoint">
                                        {userData.nextPoint} P
                                    </div>
                                </div>
                                <div className="profile-point-percent">
                                    {pointPercent}
                                </div>
                            </div>
                        </div>
                        <hr />
                    </>
                    )}
                    <div className="profile-nav">
                        {memberType === "USER" ? (
                            <div
                                className="profile-mypage"
                                onClick={navToMypage}
                            >
                                마이페이지
                            </div>
                        ) : (
                            <div
                                className="profile-mypage"
                                onClick={navToMypage}
                            >
                                관리자페이지
                            </div>
                        )}
                        <div
                            className="profile-messages"
                            onClick={navToMessages}
                        >
                            <MdOutlineLocalPostOffice
                                size={20}
                                color="#00B207"
                                style={{ marginRight: 5 }}
                            />
                            쪽지함
                        </div>
                        {memberType === "USER" && (
                            <div className="profile-likes" onClick={navToLikes}>
                                <FaHeart
                                    size={20}
                                    color="#00B207"
                                    style={{ marginRight: 5 }}
                                />{" "}
                                추천 게시물
                            </div>
                        )}
                        <div className="profile-mode" onClick={toggleMode}>
                            {isDarkMode ? (
                                <FaMoon
                                    size={20}
                                    color="#00B207"
                                    style={{ marginRight: 5 }}
                                />
                            ) : (
                                <MdSunny
                                    size={20}
                                    color="#00B207"
                                    style={{ marginRight: 5 }}
                                />
                            )}
                            다크모드/라이트모드
                        </div>
                    </div>
                    <hr />
                    <div className="profile-logout" onClick={handleLogout}>
                        <IoLogOutOutline size={20} style={{ marginRight: 5 }} />
                        Log-out
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDropdown;
