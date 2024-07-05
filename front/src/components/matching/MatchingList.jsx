import React from 'react';
import PropTypes from 'prop-types';
import MatchingItem from './MatchingItem';
import styles from '../../assets/styles/matching/MatchingList.module.scss';

/**
 * 매칭 리스트 컴포넌트
 * @param {Array} items - 매칭 아이템 배열
 * @param {Function} onItemClick - 아이템 클릭 시 호출되는 함수
 * @param {number} gridColumns - 그리드 컬럼 수
 */
const MatchingList = ({ items, onItemClick, gridColumns }) => {
    return (
        <div className={styles.itemsGrid} style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
            {items.map(item => (
                <MatchingItem key={item.id} {...item} onClick={() => onItemClick(item.id)} />
            ))}
        </div>
    );
};

MatchingList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onItemClick: PropTypes.func.isRequired,
    gridColumns: PropTypes.number.isRequired,
};

export default MatchingList;