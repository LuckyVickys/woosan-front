import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import MatchingModal from '../../components/matching/MatchingModal';
import FilterBar from '../../components/matching/FilterBar';
import SelfFilterBar from '../../components/matching/SelfFilterBar';
import styles from '../../assets/styles/matching/MatchingPageTemplate.module.scss';
import { throttle } from 'lodash-es';

const MatchingPageTemplate = ({ items, ListComponent, gridColumns, matchingType }) => {
    const [displayedItems, setDisplayedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeFilters, setActiveFilters] = useState({
        gender: '',
        mbti: '',
        ageRange: '',
        category: 'all'
    });
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const filterItemsByCategory = useCallback((category, items) => {
        if (!items) return [];
        if (category === 'all') return items;
        return items.filter(item => {
            try {
                const parsedTag = JSON.parse(item.tag);
                return Object.values(parsedTag).includes(category);
            } catch (e) {
                return false;
            }
        });
    }, []);

    const filterItems = useCallback((items, filters) => {
        return items.filter(item => {
            const genderMatch = !filters.gender || item.gender === filters.gender;
            const mbtiMatch = !filters.mbti || item.mbti === filters.mbti;
            const ageMatch = !filters.ageRange || (item.age >= filters.ageRange[0] && item.age <= filters.ageRange[1]);
            return genderMatch && mbtiMatch && ageMatch;
        });
    }, []);

    const getSortedItems = (items) => {
        return [...items].sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
    };

    useEffect(() => {
        const sortedItems = getSortedItems(items);
        const filteredItems =
            matchingType === 'self'
                ? filterItems(sortedItems, activeFilters)
                : filterItemsByCategory(activeFilters.category, sortedItems);
        setDisplayedItems(filteredItems.slice(0, itemsPerPage * page));
    }, [items, activeFilters, page, filterItems, filterItemsByCategory, matchingType]);

    useEffect(() => {
        const handleScroll = throttle(() => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
                setPage(prevPage => prevPage + 1);
            }
        }, 200);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleItemClick = (id) => {
        const item = displayedItems.find(item => item.id === id);
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const handleFilterChange = (name, value) => {
        setActiveFilters(prevFilters => {
            if (name === 'ageRange') {
                const ageRanges = {
                    '20대': [20, 29],
                    '30대': [30, 39],
                    '40대': [40, 49],
                    '50대': [50, 59],
                    '60대 이상': [60, 100]
                };
                return { ...prevFilters, ageRange: value ? ageRanges[value] : '' };
            }
            return { ...prevFilters, [name]: value };
        });
        setPage(1);
    };

    const renderFilterBar = () => {
        switch (matchingType) {
            case 'self':
                return <SelfFilterBar activeFilters={activeFilters} onFilterChange={handleFilterChange} />;
            default:
                return <FilterBar activeCategory={activeFilters.category} onCategoryChange={category => handleFilterChange('category', category)} />;
        }
    };

    return (
        <div className={styles.container}>
            {renderFilterBar()}
            <ListComponent items={displayedItems} onItemClick={handleItemClick} gridColumns={gridColumns} />
            {selectedItem && <MatchingModal item={selectedItem} onClose={handleCloseModal} />}
        </div>
    );
};

MatchingPageTemplate.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        memberId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        matchingType: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        regDate: PropTypes.string.isRequired,
        views: PropTypes.number.isRequired,
        isDeleted: PropTypes.bool.isRequired,
        placeName: PropTypes.string.isRequired,
        locationX: PropTypes.number.isRequired,
        locationY: PropTypes.number.isRequired,
        address: PropTypes.string.isRequired,
        meetDate: PropTypes.string.isRequired,
        tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        headCount: PropTypes.number.isRequired,
        location: PropTypes.string,
        introduce: PropTypes.string,
        mbti: PropTypes.string,
        gender: PropTypes.string,
        age: PropTypes.number,
        height: PropTypes.number,
        filePathUrl: PropTypes.arrayOf(PropTypes.string)
    })).isRequired,
    ListComponent: PropTypes.elementType.isRequired,
    gridColumns: PropTypes.number.isRequired,
    matchingType: PropTypes.string.isRequired,
};

export default MatchingPageTemplate;
