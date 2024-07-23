import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

    const categories = useMemo(() => ({
        all: '전체',
        romance: '연애&사랑',
        sports: '운동&스포츠',
        food: '푸드&드링크',
        culture: '문화&예술',
        neighborhood: '동네&또래',
        study_class: '스터디&클래스'
    }), []);

    const filterItemsByCategory = useCallback((category, items) => {
        if (!items) return [];
        if (category === 'all') return items;
        return items.filter(item => {
            try {
                const parsedTag = JSON.parse(item.tag);
                return Object.values(parsedTag).includes(category);
            } catch (e) {
                console.error('태그 파싱 중 오류 발생:', e);
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
        console.log(`아이템 클릭됨: ${id}`);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        console.log('모달 창 닫기');
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setPage(1);
        const sortedItems = getSortedItems(items);
        setDisplayedItems(filterItemsByCategory(category, sortedItems).slice(0, itemsPerPage));
        console.log(`카테고리 변경됨: ${category}`);
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
        tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired, // tag를 객체로 받도록 수정
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
