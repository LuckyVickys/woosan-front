import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/FilterBar.module.scss';

/**
 * 필터 바 컴포넌트
 * @param {Object} props - 필터 바의 속성
 */
const FilterBar = ({ activeCategory, onCategoryChange }) => {
    return (
        <div className={styles.filterBar}>
            <button className={`${styles.filterButton} ${activeCategory === 'all' ? styles.active : ''}`} onClick={() => onCategoryChange('all')}>전체</button>
            <button className={`${styles.filterButton} ${activeCategory === 'romance' ? styles.active : ''}`} onClick={() => onCategoryChange('romance')}>연애&사랑</button>
            <button className={`${styles.filterButton} ${activeCategory === 'sports' ? styles.active : ''}`} onClick={() => onCategoryChange('sports')}>운동&스포츠</button>
            <button className={`${styles.filterButton} ${activeCategory === 'food' ? styles.active : ''}`} onClick={() => onCategoryChange('food')}>푸드&드링크</button>
            <button className={`${styles.filterButton} ${activeCategory === 'culture' ? styles.active : ''}`} onClick={() => onCategoryChange('culture')}>문화&예술</button>
            <button className={`${styles.filterButton} ${activeCategory === 'neighborhood' ? styles.active : ''}`} onClick={() => onCategoryChange('neighborhood')}>동네&또래</button>
        </div>
    );
};

FilterBar.propTypes = {
    activeCategory: PropTypes.string.isRequired,
    onCategoryChange: PropTypes.func.isRequired
};

export default FilterBar;
