import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Common.scss";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import Swal from "sweetalert2";
import { logout } from '../../slices/loginSlice';

const ProfileDropdown = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navToMypage = () => {
        navigate(`/myPage`);
    }

    const navToMessages = () => {
        navigate(`/myPage/msg`);
    }
    
    const navToLikes = () => {
        navigate(`/myPage/like`);
    }

    const handleLogout = () => {
        Swal.fire({
            icon: 'warning',
            title: '로그아웃 하시겠습니까?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        }).then((result) => {
            if(result.isConfirmed) {
                dispatch(logout());
                Swal.fire({
                    icon: 'success',
                    title: '로그아웃 되었습니다.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '확인'
                }).then((res) => {
                    if(result.isConfirmed) {
                        navigate('/');
                    }
                })
            }
        });
    }

    return (
        <>
        <div className="profile-dropdown-wrapper">
            <div className="profile-triangle"/>
            <div className="profile-contents">
                <div className="profile-info-wrapper">
                    <div className="profile-nickname">{loginState.nickname}</div>
                    <div className="profile-email">{loginState.email}</div>
                </div>
                <hr />
                <div className="profile-level-point">
                    <div className="profile-level">{loginState.level}</div>
                    <div className="profile-point-bar-wrapper">
                        <div className="profile-point-bar point-bar"/>
                        <div className="profile-nextpoint-bar point-bar"/>
                    </div>
                    <div className="profile-point-info">
                        <div className="profile-point-wrapper">
                            <div className="profile-point">{loginState.point}</div> / 
                            <div className="profile-nextpoint">{loginState.nextPoint} P</div>
                        </div>
                        <div className="profile-point-percent">81%</div>
                    </div>
                </div>
                <hr />
                <div className="profile-nav">
                    <div className="profile-mypage" onClick={navToMypage}>마이페이지</div>
                    <div className="profile-messages" onClick={navToMessages}>
                        <MdOutlineLocalPostOffice size={20} style={{marginRight: 5}} />쪽지함
                    </div>
                    <div className="profile-likes" onClick={navToLikes}>
                        <FaHeart size={20} color="red" style={{marginRight: 5}}/> 추천 게시물
                    </div>
                    <div className="profile-mode"><MdSunny size={20} style={{marginRight: 5}}/> 다크모드/라이트모드</div>
                </div>
                <hr />
                <div className="profile-logout" onClick={handleLogout}><IoLogOutOutline size={20} style={{marginRight: 5}} />Log-out</div>
            </div>
        </div>
        </>
    );
}

export default ProfileDropdown;