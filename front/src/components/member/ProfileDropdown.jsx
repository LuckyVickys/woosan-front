import React from "react";
import "../../assets/styles/Common.scss";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";

const ProfileDropdown = () => {

    return (
        <>
        <div className="profile-dropdown-wrapper">
            <div className="profile-triangle"/>
            <div className="profile-contents">
                <div className="profile-info-wrapper">
                    <div className="profile-nickname">카카시</div>
                    <div className="profile-email">kamui@gmail.com</div>
                </div>
                <hr />
                <div className="profile-level-point">
                    <div className="profile-level">LEVEL_3</div>
                    <div className="profile-point-bar-wrapper">
                        <div className="profile-point-bar point-bar"/>
                        <div className="profile-nextpoint-bar point-bar"/>
                    </div>
                    <div className="profile-point-info">
                        <div className="profile-point-wrapper">
                            <div className="profile-point">486</div> / 
                            <div className="profile-nextpoint">600 P</div>
                        </div>
                        <div className="profile-point-percent">81%</div>
                    </div>
                </div>
                <hr />
                <div className="profile-nav">
                    <div className="profile-mypage">마이페이지</div>
                    <div className="profile-messages">
                        <MdOutlineLocalPostOffice size={20} style={{marginRight: 5}} />쪽지함
                    </div>
                    <div className="profile-likes">
                        <FaHeart size={20} color="red" style={{marginRight: 5}}/> 추천 게시물
                    </div>
                    <div className="profile-mode"><MdSunny size={20} style={{marginRight: 5}}/> 다크모드/라이트모드</div>
                </div>
                <hr />
                <div className="profile-logout"><IoLogOutOutline size={20} style={{marginRight: 5}} />Log-out</div>
            </div>
        </div>
        </>
    );
}

export default ProfileDropdown;