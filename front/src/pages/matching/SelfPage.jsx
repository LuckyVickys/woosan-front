import React, { useState, useEffect, useRef } from 'react';
import useSelf from '../../hooks/useSelf';
import MatchingItem from '../../components/matching/MatchingItem';
import MatchingModal from '../../components/matching/MatchingModal';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/matching/SelfPage.module.scss';
import useCustomLogin from '../../hooks/useCustomLogin';
import LoginModal from '../../components/member/LoginModal';

const SelfPage = ({ userGender }) => {
    const { self, loading, error, fetchMore, hasMore } = useSelf();
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    const observer = useRef();

    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();

    const lastItemRef = useRef();
    useEffect(() => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchMore();
            }
        });

        if (lastItemRef.current) observer.current.observe(lastItemRef.current);
    }, [loading, hasMore, fetchMore]);

    const handleCreateButtonClick = () => {
        if (!isLogin) {
            moveToLoginReturn();
        } else {
            navigate('/matching/create');
        }
    };

    if (loading && self.length === 0) {
        console.log('로딩 중...');
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        return <div className={styles.error}>데이터를 가져오는 중 오류 발생</div>;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.createButton} onClick={handleCreateButtonClick}>모임 만들기</button>
                </div>
                <div className={styles.matchingListContainer}>
                    {self.map((item, index) => (
                        <MatchingItem
                            key={item.id}
                            {...item}
                            onClick={() => setSelectedItem(item)}
                            ref={index === self.length - 1 ? lastItemRef : null}
                        />
                    ))}
                </div>
                {selectedItem && (
                    <MatchingModal item={selectedItem} onClose={() => setSelectedItem(null)} />
                )}
            </div>
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        </>
    );
};

export default SelfPage;
