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
    const categories = [
        { key: 'all', label: '전체' },
        { key: 'romance', label: '연애&사랑' },
        { key: 'sports', label: '운동&스포츠' },
        { key: 'food', label: '푸드&드링크' },
        { key: 'culture', label: '문화&예술' },
        { key: 'neighborhood', label: '동네&또래' },
        { key: 'study_class', label: '스터디&클래스' }
    ];

    return (
        <div className={styles.filterBar}>
            {categories.map((category) => (
                <button
                    key={category.key}
                    className={`${styles.filterButton} ${activeCategory === category.key ? styles.active : ''}`}
                    onClick={() => onCategoryChange(category.key)}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
};

FilterBar.propTypes = {
    activeCategory: PropTypes.string.isRequired,
    onCategoryChange: PropTypes.func.isRequired
};

export default FilterBar;
