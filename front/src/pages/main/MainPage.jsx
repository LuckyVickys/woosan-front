import React, { useEffect, useState, useCallback } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import '../../assets/styles/App.scss';
import BasicLayout from "../../layouts/BasicLayout";
import LikeList from "../../components/main/LikeList";
import NoticeList from "../../components/main/NoticeList";
import NewMatchingList from "../../components/main/NewMatchingList";
import MatchingModal from '../../components/matching/MatchingModal';
import Banner from '../../components/main/Banner';
import { getAllMatching } from '../../api/matchingBoardApi';
import { useSelector } from 'react-redux';
import useCustomLogin from "../../hooks/useCustomLogin";
import LoginModal from "../../components/member/LoginModal";
import Swal from 'sweetalert2';
import { Desktop, Tablet, Mobile } from '../../layouts/ResponsiveComponent';

// 하드코딩된 예시 데이터
const hardcodedItems = [
    {
        id: 1,
        memberId: "123",
        matchingType: 2,
        title: "떡볶이 맛집 같이 가실분?",
        content: "test.",
        regDate: "2024-07-28T12:29:00Z",
        views: 15,
        isDeleted: false,
        placeName: "남동공단떡볶이",
        locationX: 45.676,
        locationY: -110.362,
        address: "123 Park Ave, Yellowstone",
        meetDate: "2024-07-28T12:29:00Z",
        tag: JSON.stringify({ "떡볶이": "food" }),
        headCount: 5,
        currentMemberCount: 1,
        location: "Mountain Base",
        introduce: "Looking forward to meeting new friends!",
        mbti: "INFJ",
        gender: "Male",
        age: 29,
        height: 175,
        filePathUrl: ["https://kr.object.ncloudstorage.com/woosan/matchingBoard/4148abbb-9353-405e-9b33-aadb0ba42f60_%EB%96%A1%EB%B3%B6%EC%9D%B4.jpg"],
        nickname: "유월",
        profileImageUrl: ["http://example.com/profile.jpg"]
    },
    {
        id: 2,
        memberId: "456",
        matchingType: 1,
        title: "관극하러 가실 분🥰 굿",
        content: "Explore the city with us.",
        regDate: "2024-07-28T08:00:00Z",
        views: 22,
        isDeleted: false,
        placeName: "샤롯데시어터 입구",
        locationX: 34.052,
        locationY: -118.243,
        address: "456 City St, Downtown",
        meetDate: "2024-08-01T10:00:00Z",
        tag: JSON.stringify({"뮤지컬":"culture"}),
        headCount: 5,
        currentMemberCount: 3,
        location: "City Center",
        introduce: "Excited to see you all!",
        mbti: "ENFP",
        gender: "Female",
        age: 26,
        height: 165,
        filePathUrl: ["https://kr.object.ncloudstorage.com/woosan/matchingBoard/bc044f40-8db7-48ea-9e28-4c214af3d47a_AKR20210514057100005_01_i_P4.jpg"],
        nickname: "아니야",
        profileImageUrl: ["http://example.com/explorer.jpg"]
    }
    // 필요에 따라 더 많은 하드코딩된 데이터 추가
];

const MainPage = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const loginState = useSelector((state) => state.loginSlice);
    const token = loginState.accessToken;
    const memberType = loginState.memberType;
    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        if (!isLogin) {
            // 로그인하지 않은 경우 하드코딩된 데이터 사용
            setItems(hardcodedItems);
        } else {
            try {
                const response = await getAllMatching(token);
                if (Array.isArray(response)) {
                    setItems(response);
                } else {
                    setItems([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
                // 로그인 상태일 때만 스윗 알럿을 띄우도록 조건을 추가
                if (isLogin) {
                    Swal.fire({
                        title: "서버 오류가 발생했습니다.",
                        text: "잠시 후 다시 시도해 주세요.",
                        icon: "error",
                        confirmButtonText: "확인",
                        confirmButtonColor: "#3085d6",
                    });
                }
                setItems([]);
            }
        }
    }, [isLogin, token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleItemClick = (id) => {
        if (!isLogin) {
            Swal.fire({
                title: "로그인이 필요한 서비스입니다.",
                icon: "error",
                confirmButtonText: "확인",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    moveToLoginReturn();
                }
            });
        } else if (memberType === "USER" || memberType === "ADMIN") {
            const item = items.find(item => item.id === id);
            setSelectedItem(item);
        }
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const handleMatchingViewAllClick = useCallback((e) => {
        e.preventDefault();
        if (!isLogin) {
            Swal.fire({
                title: "로그인이 필요한 서비스입니다.",
                icon: "error",
                confirmButtonText: "확인",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    moveToLoginReturn();
                }
            });
        } else if (memberType === "USER" || memberType === "ADMIN") {
            navigate("/matching");
        }
    }, [isLogin, memberType, navigate, moveToLoginReturn]);

    return (
        <BasicLayout>
            <Desktop>
                <div className="main-contents">
                    <div className="banner">
                        <Banner />
                        <div className="popular-post">
                            <div className='popular-post-header'>
                                <div className="header-title">인기글</div>
                                <NavLink to={'/board/'}>View All ➔</NavLink>
                            </div>
                            <LikeList />
                        </div>
                    </div>
                    <div className="main-info">
                        <div className="info">
                            <div className='info-icon1'></div>
                            <div className='info-text'>
                                <h1>100% 회원제 커뮤니티</h1>
                                <p>비회원은 저리 가라, ONLY 회원</p>
                            </div>
                        </div>
                        <div className="info">
                            <div className='info-icon2'></div>
                            <div className='info-text'>
                                <h1>포인트 차곡차곡, 등급 UP</h1>
                                <p>더욱 재밌는 커뮤니티 활동</p>
                            </div>
                        </div>
                        <div className="info">
                            <div className='info-icon3'></div>
                            <div className='info-text'>
                                <h1>자취생을 위한 꿀팁이 궁금해!</h1>
                                <p>자취 고수들의 공유마당, 꿀팁</p>
                            </div>
                        </div>
                        <div className="info">
                            <div className='info-icon4'></div>
                            <div className='info-text'>
                                <h1>심심한데 누구 만날까?</h1>
                                <p>다양한 모임이 가득, 모임</p>
                            </div>
                        </div>
                    </div>
                    <div className="main-notice-matching">
                        <div className="main-notice">
                            <div className='main-notice-header'>
                                <div className="header-title">공지사항</div>
                                <NavLink to={'/cs/'}>View All ➔</NavLink>
                            </div>
                            <NoticeList />
                        </div>
                        <div className="main-matching">
                            <div className='main-matching-header'>
                                <div className="header-title">New 모임</div>
                                <NavLink to={'/matching/'} onClick={handleMatchingViewAllClick}>View All ➔</NavLink>
                            </div>
                            <NewMatchingList items={items} onItemClick={handleItemClick} />
                        </div>
                    </div>
                    {selectedItem && (
                        <MatchingModal item={selectedItem} onClose={handleCloseModal} />
                    )}
                </div>
            </Desktop>
            <Tablet>
                <div className="main-contents">
                    <div className="banner">
                        <Banner />
                    </div>
                    <div className="main-info">
                        <div className="info">
                            <div className='info-icon1'></div>
                            <div className='info-text'>
                            <h1>100% 회원제 커뮤니티</h1>
                            <p>비회원은 저리 가라, ONLY 회원</p>
                            </div>
                        </div>
                        <div className="info">
                            <div className='info-icon3'></div>
                            <div className='info-text'>
                            <h1>자취생을 위한 꿀팁이 궁금해!</h1>
                            <p>자취 고수들의 공유마당, 꿀팁</p>
                            </div>
                        </div>
                        <div className="info">
                            <div className='info-icon4'></div>
                            <div className='info-text'>
                            <h1>심심한데 누구 만날까?</h1>
                            <p>다양한 모임이 가득, 모임</p>
                            </div>
                        </div>
                    </div>
                    <div className="main-notice-matching">
                        <div className="main-notice">
                            <div className='main-notice-header'>
                                <div className="header-title">공지사항</div>
                                <NavLink to={'/cs/'}>View All ➔</NavLink>
                            </div>
                            <NoticeList />
                        </div>
                        <div className="main-matching">
                            <div className='main-matching-header'>
                                <div className="header-title">New 모임</div>
                                <NavLink to={'/matching/'} onClick={handleMatchingViewAllClick}>View All ➔</NavLink>
                            </div>
                            <NewMatchingList items={items} onItemClick={handleItemClick} />
                        </div>
                    </div>
                    {selectedItem && (
                        <MatchingModal item={selectedItem} onClose={handleCloseModal} />
                    )}
                </div>
            </Tablet>
            <Mobile>
                <div className="main-contents">
                    <div className="banner">
                        <Banner />
                    </div>
                    <div className="main-info">
                        <div className="info">
                            <div className='info-icon1'></div>
                            <div className='info-text'>
                            <h1>100% 회원제 커뮤니티</h1>
                            <p>비회원은 저리 가라, ONLY 회원</p>
                            </div>
                        </div>
                        <div className="info">
                            <div className='info-icon3'></div>
                            <div className='info-text'>
                            <h1>자취생을 위한 꿀팁이 궁금해!</h1>
                            <p>자취 고수들의 공유마당, 꿀팁</p>
                            </div>
                        </div>
                        <div className="info">
                            <div className='info-icon4'></div>
                            <div className='info-text'>
                            <h1>심심한데 누구 만날까?</h1>
                            <p>다양한 모임이 가득, 모임</p>
                            </div>
                        </div>
                    </div>
                    <div className="main-notice-matching">
                        <div className="main-notice">
                            <div className='main-notice-header'>
                                <div className="header-title">공지사항</div>
                                <NavLink to={'/cs/'}>View All ➔</NavLink>
                            </div>
                            <NoticeList />
                        </div>
                        <div className="main-matching">
                            <div className='main-matching-header'>
                                <div className="header-title">New 모임</div>
                                <NavLink to={'/matching/'} onClick={handleMatchingViewAllClick}>View All ➔</NavLink>
                            </div>
                            <NewMatchingList items={items} onItemClick={handleItemClick} />
                        </div>
                    </div>
                    {selectedItem && (
                        <MatchingModal item={selectedItem} onClose={handleCloseModal} />
                    )}
                </div>
            </Mobile>
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        </BasicLayout>
    );
};

export default MainPage;
