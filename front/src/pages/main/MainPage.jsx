import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import '../../assets/styles/App.scss';
import BasicLayout from "../../layouts/BasicLayout";
import LikeList from "../../components/main/LikeList";
import NoticeList from "../../components/main/NoticeList";
import NewMatchingList from "../../components/main/NewMatchingList";
import MatchingModal from '../../components/matching/MatchingModal';
import Banner from '../../components/main/Banner';
import { getAllMatching } from '../../api/matchingBoardApi';

const MainPage = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllMatching();
                if (Array.isArray(response)) {
                    setItems(response);
                } else {
                    console.error('Invalid response format:', response);
                    setItems([]); // 오류 발생 시 빈 배열로 설정
                }
            } catch (error) {
                console.error('Error fetching matchings:', error);
                setItems([]); // 오류 발생 시 빈 배열로 설정
            }
        };

        fetchData();
    }, []);

    const handleItemClick = (id) => {
        const item = items.find(item => item.id === id);
        setSelectedItem(item);
        console.log(`아이템 클릭됨: ${id}`);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        console.log('모달 창 닫기');
    };

    return (
        <BasicLayout>
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
                            <NavLink to={'/matching/'}>View All ➔</NavLink>
                        </div>
                        <NewMatchingList items={items} onItemClick={handleItemClick} />
                    </div>
                </div>
                {selectedItem && (
                    <MatchingModal item={selectedItem} onClose={handleCloseModal} />
                )}
            </div>
        </BasicLayout>
    );
}

export default MainPage;
