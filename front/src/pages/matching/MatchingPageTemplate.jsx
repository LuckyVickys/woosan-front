import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import MatchingModal from '../../components/matching/MatchingModal';
import FilterBar from '../../components/matching/FilterBar';
import styles from '../../assets/styles/matching/MatchingPageTemplate.module.scss';
import { throttle } from 'lodash-es';

/**
 * 매칭 페이지 템플릿 컴포넌트
 * @param {Object} props - 매칭 페이지 템플릿 속성
 */
const MatchingPageTemplate = ({ items, ListComponent, gridColumns }) => {
    const [displayedItems, setDisplayedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
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

    const getSortedItems = (items) => {
        return [...items].sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
    };

    useEffect(() => {
        const sortedItems = getSortedItems(items);
        const filteredItems = filterItemsByCategory(activeCategory, sortedItems);
        setDisplayedItems(filteredItems.slice(0, itemsPerPage * page));
    }, [items, activeCategory, page, filterItemsByCategory]);

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

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setPage(1);
        const sortedItems = getSortedItems(items);
        setDisplayedItems(filterItemsByCategory(category, sortedItems).slice(0, itemsPerPage));
    };

    return (
        <div className={styles.container}>
            <FilterBar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
            <ListComponent items={displayedItems} onItemClick={handleItemClick} gridColumns={gridColumns} />
            {selectedItem && (
                <MatchingModal item={selectedItem} onClose={handleCloseModal} />
            )}
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
};

export default MatchingPageTemplate;
