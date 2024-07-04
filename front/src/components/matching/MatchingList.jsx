import React from 'react';
import MatchingItem from './MatchingItem';
import styles from '../../assets/styles/matching/MatchingList.module.scss';

const MatchingList = ({ regularly, temporary, self, onItemClick }) => {
    const allItems = [
        ...regularly.slice(0, 2),
        ...temporary.slice(0, 2),
        ...self.slice(0, 2),
    ];

    return (
        <div className={styles.grid}>
            {allItems.map((item, index) => (
                <MatchingItem key={index} {...item} onClick={onItemClick} />
            ))}
        </div>
    );
};

export default MatchingList;
