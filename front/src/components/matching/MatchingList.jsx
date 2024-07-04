import React from 'react';
import PropTypes from 'prop-types';
import MatchingItem from './MatchingItem';
import styles from '../../assets/styles/matching/MatchingList.module.scss';

const MatchingList = ({ items, onItemClick }) => {
    return (
        <div className={styles.grid}>
            {items.map(item => (
                <MatchingItem key={item.id} {...item} onClick={() => onItemClick(item.id)} />
            ))}
        </div>
    );
};

MatchingList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onItemClick: PropTypes.func.isRequired,
};

export default MatchingList;