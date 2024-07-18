import React, { useState, useEffect } from 'react';
import useSelf from '../../hooks/useSelf';
import MatchingItem from '../../components/matching/MatchingItem';
import MatchingModal from '../../components/matching/MatchingModal';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/matching/SelfPage.module.scss';

const SelfPage = ({ userGender }) => {
    const { self, loading, error } = useSelf();
    const [displayedItems, setDisplayedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sentHearts, setSentHearts] = useState([]);
    const [receivedHearts, setReceivedHearts] = useState([]);
    const [dismissedIds, setDismissedIds] = useState([]);
    const [view, setView] = useState('default'); // 'default', 'sentHearts', 'receivedHearts'
    const navigate = useNavigate();

    useEffect(() => {
        if (self) {
            const filteredItems = self.filter(item => item.gender !== userGender && !dismissedIds.includes(item.id));
            setDisplayedItems(filteredItems.slice(0, 3));
        }
    }, [self, userGender, dismissedIds]);

    const handleHeartClick = (id) => {
        const updatedItems = displayedItems.filter(item => item.id !== id);
        setDisplayedItems(updatedItems);
        setSentHearts([...sentHearts, id]);
        // 매칭 요청 처리 로직 추가
    };

    const handleXClick = (id) => {
        const updatedItems = displayedItems.filter(item => item.id !== id);
        setDisplayedItems(updatedItems);
        setDismissedIds([...dismissedIds, id]);
    };

    const handleNewMatchingClick = () => {
        const newItems = self.filter(item => item.gender !== userGender && !displayedItems.includes(item) && !dismissedIds.includes(item.id)).slice(0, 3);
        setDisplayedItems(newItems);
    };

    const handleCancelSentHeart = (id) => {
        const updatedSentHearts = sentHearts.filter(heartId => heartId !== id);
        setSentHearts(updatedSentHearts);
        // 매칭 요청 취소 로직 추가
    };

    const handleAcceptReceivedHeart = (id) => {
        const updatedReceivedHearts = receivedHearts.filter(heartId => heartId !== id);
        setReceivedHearts(updatedReceivedHearts);
        // 매칭 요청 수락 로직 추가
    };

    const handleRejectReceivedHeart = (id) => {
        const updatedReceivedHearts = receivedHearts.filter(heartId => heartId !== id);
        setReceivedHearts(updatedReceivedHearts);
        // 매칭 요청 거절 로직 추가
    };

    const handleCreateButtonClick = () => {
        navigate('/matching/CreateMatching');
    };

    const renderDefaultView = () => (
        <>
            <div className={styles.matchingList}>
                {displayedItems.map(item => (
                    <div key={item.id} className={styles.matchingItem}>
                        <MatchingItem {...item} onClick={() => setSelectedItem(item)} />
                        <div className={styles.buttons}>
                            <button className={styles.heartButton} onClick={() => handleHeartClick(item.id)}>❤️보내기</button>
                            <button className={styles.xButton} onClick={() => handleXClick(item.id)}>❌</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.newMatchingButton} onClick={handleNewMatchingClick}>
                New Matching
            </button>
        </>
    );

    const renderSentHeartsView = () => (
        <div className={styles.heartsList}>
            {sentHearts.map(id => (
                <div key={id} className={styles.heartItem}>
                    <MatchingItem {...self.find(item => item.id === id)} />
                    <button className={styles.cancelButton} onClick={() => handleCancelSentHeart(id)}>취소</button>
                </div>
            ))}
        </div>
    );

    const renderReceivedHeartsView = () => (
        <div className={styles.heartsList}>
            {receivedHearts.map(id => (
                <div key={id} className={styles.heartItem}>
                    <MatchingItem {...self.find(item => item.id === id)} />
                    <button className={styles.acceptButton} onClick={() => handleAcceptReceivedHeart(id)}>수락</button>
                    <button className={styles.rejectButton} onClick={() => handleRejectReceivedHeart(id)}>거절</button>
                </div>
            ))}
        </div>
    );

    if (loading) {
        console.log('로딩 중...');
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        return <div className={styles.error}>데이터를 가져오는 중 오류 발생</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.createButton} onClick={handleCreateButtonClick}>모임 만들기</button>
            </div>
            <div className={styles.navButtons}>
                <button className={styles.headerButton} onClick={() => setView('default')}>새로운 매칭</button>
                <button className={styles.headerButton} onClick={() => setView('sentHearts')}>내가 보낸 하트</button>
                <button className={styles.headerButton} onClick={() => setView('receivedHearts')}>내가 받은 하트</button>
            </div>
            {view === 'default' && renderDefaultView()}
            {view === 'sentHearts' && renderSentHeartsView()}
            {view === 'receivedHearts' && renderReceivedHeartsView()}
            {selectedItem && (
                <MatchingModal item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </div>
    );
};

export default SelfPage;
