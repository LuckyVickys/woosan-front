import React, { useEffect, useState, useRef } from 'react';
import useTemporary from '../../hooks/useTemporary';
import MatchingPageTemplate from './MatchingPageTemplate';
import MatchingList from '../../components/matching/MatchingList';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/matching/TemporaryPagePage.module.scss';
import useCustomLogin from '../../hooks/useCustomLogin';
import LoginModal from '../../components/member/LoginModal';

const TemporaryPage = () => {
    const { temporary, loading, error } = useTemporary();
    const navigate = useNavigate();
    const [sortedTemporary, setSortedTemporary] = useState([]);
    const [selectedHour, setSelectedHour] = useState('All');
    const scrollContainerRef = useRef(null);

    // 혜리 추가 - 로그인 상태 확인
    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();

    useEffect(() => {
        if (temporary.length > 0) {
            // 모임 시간 기준으로 정렬
            const sorted = [...temporary].sort((a, b) => new Date(a.meetDate) - new Date(b.meetDate));
            setSortedTemporary(sorted);
        }
    }, [temporary]);

    // 모임 만들기 버튼 클릭 핸들러
    const handleCreateButtonClick = () => {
        if (!isLogin) {
            moveToLoginReturn();
        } else {
            navigate('/matching/CreateMatching');
        }
    };

    // 시간 필터링 핸들러
    const handleHourClick = (hour) => {
        setSelectedHour(hour);
    };

    // 시간 필터링된 항목 반환
    const getFilteredItems = () => {
        if (selectedHour === 'All') {
            return sortedTemporary;
        }
        return sortedTemporary.filter(item => new Date(item.meetDate).getHours() === selectedHour);
    };

    // 좌우 스크롤 핸들러
    const handleScroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 100; // 스크롤 양 조정
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // 시간 목록 추출 및 정렬
    const extractAndSortHours = (items) => {
        const hours = Array.from(new Set(items.map(item => new Date(item.meetDate).getHours())));
        return hours.sort((a, b) => a - b);
    };

    if (loading) {
        console.log('로딩 중...');
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        return <div className={styles.error}>데이터를 가져오는 중 오류 발생</div>;
    }

    const sortedHours = extractAndSortHours(sortedTemporary);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.createButton} onClick={handleCreateButtonClick}>모임 만들기</button>
                </div>
                <div className={styles.timeBarContainer}>
                    <button className={styles.scrollButton} onClick={() => handleScroll('left')}>&lt;</button>
                    <div className={styles.timeBar} ref={scrollContainerRef}>
                        {['All', ...sortedHours].map((hour, index) => (
                            <button
                                key={index}
                                className={`${styles.timeButton} ${selectedHour === hour ? styles.selected : ''}`}
                                onClick={() => handleHourClick(hour)}
                            >
                                {hour === 'All' ? '전체' : `${hour}시`}
                            </button>
                        ))}
                    </div>
                    <button className={styles.scrollButton} onClick={() => handleScroll('right')}>&gt;</button>
                </div>
                <MatchingPageTemplate
                    items={getFilteredItems()}
                    ListComponent={MatchingList}
                    gridColumns={2}
                />
            </div>
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        </>
    );
};

export default TemporaryPage;
