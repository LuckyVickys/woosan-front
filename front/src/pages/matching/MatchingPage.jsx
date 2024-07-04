import React, { useState } from 'react';
import useRegularly from '../../hooks/useRegularly';
import useTemporary from '../../hooks/useTemporary';
import useSelf from '../../hooks/useSelf';
import MatchingList from '../../components/MatchingList';
import MatchingModal from '../../components/MatchingModal';
import styles from '../../assets/styles/matching/MatchingPage.module.scss';

const MatchingPage = () => {
    const { regularly, loading: loadingRegularly, error: errorRegularly } = useRegularly();
    const { temporary, loading: loadingTemporary, error: errorTemporary } = useTemporary();
    const { self, loading: loadingSelf, error: errorSelf } = useSelf();
    const [selectedItem, setSelectedItem] = useState(null);

    if (loadingRegularly || loadingTemporary || loadingSelf) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (errorRegularly || errorTemporary || errorSelf) {
        return <div className={styles.error}>데이터를 가져오는 중 오류 발생</div>;
    }

    const handleItemClick = (id) => {
        const item = [...regularly, ...temporary, ...self].find(item => item.id === id);
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>매칭 리스트</h1>
            <MatchingList
                regularly={regularly}
                temporary={temporary}
                self={self}
                onItemClick={handleItemClick}
            />
            {selectedItem && (
                <MatchingModal item={selectedItem} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default MatchingPage;
