// BasidLayout의 area에서 sidebar를 제외한 콘텐츠 영역의 헤더
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/styles/Common.scss';

const CatagoryDropdown = ({ onSelect }) => {
  const categories = ['카테고리','맛집', '청소', '요리', '재테크', '인테리어', '정책', '기타'];

  return (
    <ul className="dropdown-list">
      {categories.map((category, index) => (
      <li key={index} onClick={() => onSelect(category)}>{category}</li>
      ))}
    </ul>
  );
}

const FilterDropdown = ({ onSelect }) => {
  const filters = ['필터', '제목', '작성자', '내용'];

  return (
    <ul className="dropdown-list">
      {filters.map((filter, index) => (
      <li key={index} onClick={() => onSelect(filter)}>{filter}</li>
      ))}
    </ul>
  );
}

const SearchBar = () => {
  const location = useLocation();

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  
  const categoryRef = useRef(null);
  const filterRef = useRef(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilterDropdown(false);
  };

  const handleClick = (event) => {
    if (categoryRef.current && categoryRef.current.contains(event.target)) {
      setShowCategoryDropdown(!showCategoryDropdown);
      setShowFilterDropdown(false); 
    }
    else if (filterRef.current && filterRef.current.contains(event.target)) {
      setShowFilterDropdown(!showFilterDropdown);
      setShowCategoryDropdown(false); 
    }
    else {
      setShowCategoryDropdown(false);
      setShowFilterDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  useEffect(() => {
    setSelectedCategory('');
    setSelectedFilter('');
    setShowCategoryDropdown(false);
    setShowFilterDropdown(false);
  }, [location.pathname]);

    return (
        <div className="search-bar">
          <div className="catagory-dropdown" ref={categoryRef}>
            {selectedCategory ? `${selectedCategory}` : '카테고리'}
            <div className="dropdown" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}></div>
            {showCategoryDropdown && <CatagoryDropdown onSelect={handleCategorySelect} />}
            <div className='dropdown-arrow'></div>
          </div>
          <div className="filter-dropdown" ref={filterRef}>
            {selectedFilter ? `${selectedFilter}` : '필터'}
            <div className="dropdown" onClick={() => setShowFilterDropdown(!showFilterDropdown)}></div>
            {showFilterDropdown && <FilterDropdown onSelect={handleFilterSelect} />}
            <div className='dropdown-arrow'></div>
          </div>
          <form className="search-box" action="search" method="get">
              <input className="search-input" type="text" name="keyword" placeholder="검색어를 입력해주세요."/>
              <button className="search-button"></button>
          </form>
          <button className='write-button'>글 쓰기</button>
        </div>
    );
}

export default SearchBar;