import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaHome } from 'react-icons/fa';
import { PiGenderIntersexFill } from "react-icons/pi";
import { RiFireFill } from "react-icons/ri";
import styles from '../../assets/styles/matching/SelfFilterBar.module.scss';

const SelfFilterBar = ({ activeFilters, onFilterChange }) => {
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    const [showMbtiDropdown, setShowMbtiDropdown] = useState(false);
    const [showAgeRangeDropdown, setShowAgeRangeDropdown] = useState(false);

    const mbtiOptions = [
        'INTJ', 'INTP', 'ENTJ', 'ENTP',
        'INFJ', 'INFP', 'ENFJ', 'ENFP',
        'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
        'ISTP', 'ISFP', 'ESTP', 'ESFP'
    ];

    const ageRanges = ['20대', '30대', '40대', '50대', '60대 이상'];

    const handleGenderChange = (value) => {
        onFilterChange('gender', value);
        setShowGenderDropdown(false);
    };

    const handleMBTIChange = (value) => {
        onFilterChange('mbti', value);
        setShowMbtiDropdown(false);
    };

    const handleAgeRangeChange = (value) => {
        onFilterChange('ageRange', value);
        setShowAgeRangeDropdown(false);
    };

    const resetFilters = () => {
        onFilterChange('category', '');
        onFilterChange('gender', '');
        onFilterChange('mbti', '');
        onFilterChange('ageRange', '');
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest(`.${styles.filterButton}`)) {
            setShowGenderDropdown(false);
            setShowMbtiDropdown(false);
            setShowAgeRangeDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.filterBar}>
            <div className={styles.filterButton} onClick={resetFilters}>
                <FaHome />
                전체
            </div>
            <div className={styles.filterButton} onClick={() => setShowGenderDropdown(!showGenderDropdown)}>
                <PiGenderIntersexFill />
                {activeFilters.gender || '성별'}
                {showGenderDropdown && (
                    <div className={styles.dropdown}>
                        <div onClick={() => handleGenderChange('')}>전체</div>
                        <div onClick={() => handleGenderChange('남성')}>남성</div>
                        <div onClick={() => handleGenderChange('여성')}>여성</div>
                    </div>
                )}
            </div>
            <div className={styles.filterButton} onClick={() => setShowMbtiDropdown(!showMbtiDropdown)}>
                <FaUser />
                {activeFilters.mbti || 'MBTI'}
                {showMbtiDropdown && (
                    <div className={`${styles.dropdown} ${styles.scrollable}`}>
                        <div onClick={() => handleMBTIChange('')}>전체</div>
                        {mbtiOptions.map((option) => (
                            <div key={option} onClick={() => handleMBTIChange(option)}>{option}</div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.filterButton} onClick={() => setShowAgeRangeDropdown(!showAgeRangeDropdown)}>
                <RiFireFill />
                {activeFilters.ageRange ? `${activeFilters.ageRange[0]}대` : '연령대'}
                {showAgeRangeDropdown && (
                    <div className={styles.dropdown}>
                        <div onClick={() => handleAgeRangeChange('')}>전체</div>
                        {ageRanges.map((range) => (
                            <div key={range} onClick={() => handleAgeRangeChange(range)}>{range}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

SelfFilterBar.propTypes = {
    activeFilters: PropTypes.shape({
        gender: PropTypes.string,
        mbti: PropTypes.string,
        ageRange: PropTypes.string,
        category: PropTypes.string,
    }).isRequired,
    onFilterChange: PropTypes.func.isRequired,
};

export default SelfFilterBar;
