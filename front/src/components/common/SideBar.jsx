import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../../assets/styles/App.scss";
import { FaUtensils, FaBroom, FaConciergeBell, FaMoneyBill, FaPaintRoller, FaRegFileAlt, FaTh, FaRegSmile, FaUserEdit, FaClipboardList, FaComments, FaHeart, FaUsers, FaEnvelopeOpenText, FaSignOutAlt, FaBullhorn, FaGift } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/loginSlice';

const SideBar = ({ pageType }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState('');

    // URL의 검색 파라미터를 기반으로 activeCategory 상태를 설정
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryName = params.get('categoryName');
        setActiveCategory(categoryName || '');
    }, [location.search]);

    // 카테고리 클릭 시 URL을 변경하고 activeCategory 상태를 업데이트
    const handleNavigation = (categoryName) => {
        setActiveCategory(categoryName);
        if (pageType === 'board') {
            navigate(`/board?page=1&size=10&categoryName=${categoryName}`);
        } else if (pageType === 'cs') {
            navigate(`/cs/${categoryName}`);
        } else if (pageType === 'myPage') {
            navigate(`/myPage/${categoryName}`);
        } else if (pageType === 'matching') {
            navigate(`/matching/${categoryName}`);
        }
    };

    // 로그아웃
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
            if (result.isConfirmed) {
                dispatch(logout());
                Swal.fire({
                    icon: 'success',
                    title: '로그아웃 되었습니다.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '확인'
                }).then((res) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                })
            }
        });
    }

    return (
        <aside className="sidebar">
            <div className="category">
                {pageType === 'board' && (
                    <>
                        <div className="category-title">꿀팁</div>
                        <div className={`sub-category ${activeCategory === '' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('')} className={activeCategory === '' ? 'active' : ''}>
                                <FaTh className={`icon ${activeCategory === '' ? 'active' : ''}`} />전체
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '맛집' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('맛집')} className={activeCategory === '맛집' ? 'active' : ''}>
                                <FaUtensils className={`icon ${activeCategory === '맛집' ? 'active' : ''}`} />맛집
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '청소' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('청소')} className={activeCategory === '청소' ? 'active' : ''}>
                                <FaBroom className={`icon ${activeCategory === '청소' ? 'active' : ''}`} />청소
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '요리' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('요리')} className={activeCategory === '요리' ? 'active' : ''}>
                                <FaConciergeBell className={`icon ${activeCategory === '요리' ? 'active' : ''}`} />요리
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '재테크' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('재테크')} className={activeCategory === '재테크' ? 'active' : ''}>
                                <FaMoneyBill className={`icon ${activeCategory === '재테크' ? 'active' : ''}`} />재테크
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '인테리어' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('인테리어')} className={activeCategory === '인테리어' ? 'active' : ''}>
                                <FaPaintRoller className={`icon ${activeCategory === '인테리어' ? 'active' : ''}`} />인테리어
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '정책' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('정책')} className={activeCategory === '정책' ? 'active' : ''}>
                                <FaRegFileAlt className={`icon ${activeCategory === '정책' ? 'active' : ''}`} />정책
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '기타' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('기타')} className={activeCategory === '기타' ? 'active' : ''}>
                                <FaRegSmile className={`icon ${activeCategory === '기타' ? 'active' : ''}`} />기타
                            </button>
                        </div>
                    </>
                )}
                {pageType === 'matching' && (
                    <>
                        <div className="category-title">모임</div>
                        <div className={`sub-category ${activeCategory === '' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('')} className={activeCategory === '' ? 'active' : ''}>
                                <FaTh className={`icon ${activeCategory === '' ? 'active' : ''}`} />전체
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'regularly' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('regularly')} className={activeCategory === 'regularly' ? 'active' : ''}>
                                <FaUtensils className={`icon ${activeCategory === 'regularly' ? 'active' : ''}`} />정기 모임
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'temporary' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('temporary')} className={activeCategory === 'temporary' ? 'active' : ''}>
                                <FaBroom className={`icon ${activeCategory === 'temporary' ? 'active' : ''}`} />번개
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'self' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('self')} className={activeCategory === 'self' ? 'active' : ''}>
                                <FaConciergeBell className={`icon ${activeCategory === 'self' ? 'active' : ''}`} />셀프 소개팅
                            </button>
                        </div>
                    </>
                )}
                {pageType === 'cs' && (
                    <>
                        <div className="category-title">고객 지원</div>
                        <div className={`sub-category ${activeCategory === 'notices' || activeCategory === '' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('notices')} className={activeCategory === 'notices' || activeCategory === '' ? 'active' : ''}>
                                <FaBullhorn className={`icon ${activeCategory === 'notices' || activeCategory === '' ? 'active' : ''}`} />공지사항
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'event' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('event')} className={activeCategory === 'event' ? 'active' : ''}>
                                <FaGift className={`icon ${activeCategory === 'event' ? 'active' : ''}`} />이벤트
                            </button>
                        </div>
                    </>
                )}
                {pageType === 'myPage' && (
                    <>
                        <div className="category-title">마이페이지</div>
                        <div className={`sub-category ${activeCategory === 'info' || activeCategory === '' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('info')} className={activeCategory === 'info' || activeCategory === '' ? 'active' : ''}>
                                <FaUserEdit className={`icon ${activeCategory === 'info' || activeCategory === '' ? 'active' : ''}`} />회원 정보 수정
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'board' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('board')} className={activeCategory === 'board' ? 'active' : ''}>
                                <FaClipboardList className={`icon ${activeCategory === 'board' ? 'active' : ''}`} />작성한 게시글 조회
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'reply' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('reply')} className={activeCategory === 'reply' ? 'active' : ''}>
                                <FaComments className={`icon ${activeCategory === 'reply' ? 'active' : ''}`} />작성한 댓글 조회
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'like' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('like')} className={activeCategory === 'like' ? 'active' : ''}>
                                <FaHeart className={`icon ${activeCategory === 'like' ? 'active' : ''}`} />추천 게시글
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'matching' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('matching')} className={activeCategory === 'matching' ? 'active' : ''}>
                                <FaUsers className={`icon ${activeCategory === 'matching' ? 'active' : ''}`} />모임 조회
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'msg' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('msg')} className={activeCategory === 'msg' ? 'active' : ''}>
                                <FaEnvelopeOpenText className={`icon ${activeCategory === 'msg' ? 'active' : ''}`} />쪽지함
                            </button>
                        </div>
                        <div className="sub-category">
                            <div onClick={handleLogout}>
                                <FaSignOutAlt className="icon" />Log out
                            </div>
                        </div>
                    </>
                )}
                {pageType === 'adminPage' && (
                    <>
                        <div className="category-title">관리자 페이지</div>
                        <div className={`sub-category ${activeCategory === 'upload' || activeCategory === '' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('upload')} className={activeCategory === 'upload' || activeCategory === '' ? 'active' : ''}>
                                <FaBullhorn className={`icon ${activeCategory === 'upload' || activeCategory === '' ? 'active' : ''}`} />배너 관리
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'reports' || activeCategory === '' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('reports')} className={activeCategory === 'reports' || activeCategory === '' ? 'active' : ''}>
                                <FaBullhorn className={`icon ${activeCategory === 'reports' || activeCategory === '' ? 'active' : ''}`} />신고 관리
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'notices' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('notices')} className={activeCategory === 'notices' ? 'active' : ''}>
                                <FaGift className={`icon ${activeCategory === 'notices' ? 'active' : ''}`} />공지사항 관리
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === 'msgs' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('msgs')} className={activeCategory === 'msgs' ? 'active' : ''}>
                                <FaGift className={`icon ${activeCategory === 'msgs' ? 'active' : ''}`} />쪽지함
                            </button>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
};

export default SideBar;
