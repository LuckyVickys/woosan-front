import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/FilterBar.module.scss';

/**
 * 필터 바 컴포넌트
 * @param {Object} props - 필터 바의 속성
 * @param {string} props.activeCategory - 현재 활성화된 카테고리
 * @param {Function} props.onCategoryChange - 카테고리 변경 시 호출되는 함수
 */
const FilterBar = ({ activeCategory, onCategoryChange }) => {
    // 카테고리 버튼을 렌더링하는 함수
    const renderButton = (category, label) => (
        <button
            className={`${styles.filterButton} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => onCategoryChange(category)}
        >
            {label}
        </button>
    );

    return (
        <div className={styles.filterBar}>
            {renderButton('all', '전체')}
            {renderButton('romance', '연애&사랑')}
            {renderButton('sports', '운동&스포츠')}
            {renderButton('food', '푸드&드링크')}
            {renderButton('culture', '문화&예술')}
            {renderButton('neighborhood', '동네&또래')}
            {renderButton('study_class', '스터디&클래스')}
        </div>
    );
};

FilterBar.propTypes = {
    activeCategory: PropTypes.string.isRequired,
    onCategoryChange: PropTypes.func.isRequired
};

export default FilterBar;
