import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/styles/App.scss';
// import useCustomLogin from '../../hooks/useCustomLogin';        // 혜리 추가
// import LoginModal from '../../components/member/LoginModal';    // 혜리 추가

import { autocomplete, saveSearchKeyword } from "../../api/boardApi";

const AutocompleteDropdown = ({ suggestions, onSelect, highlightedIndex }) => (
  <ul className="dropdown-list">
    {suggestions.map((suggestion, index) => (
      <li
        key={index}
        className={index === highlightedIndex ? 'highlighted' : ''}
        onMouseDown={() => onSelect(suggestion)}
      >
        {suggestion}
      </li>
    ))}
  </ul>
);

const CatagoryDropdown = ({ categories, onSelect }) => (
  <ul className="dropdown-list">
    {categories.map((category, index) => (
      <li key={index} onClick={() => onSelect(category.value)}>{category.label}</li>
    ))}
  </ul>
);

const FilterDropdown = ({ filters, onSelect }) => (
  <ul className="dropdown-list">
    {filters.map((filter, index) => (
      <li key={index} onClick={() => onSelect(filter.value)}>{filter.label}</li>
    ))}
  </ul>
);

const SearchBar = ({ categories, filters }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedFilter, setSelectedFilter] = useState('title');
  const [keyword, setKeyword] = useState('');

  const categoryRef = useRef(null);
  const filterRef = useRef(null);
  const inputRef = useRef(null);

  // 혜리 추가 - 로그인 하지 않았을 때 addPage로 이동하지 못하게
  // const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();

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
    } else if (filterRef.current && filterRef.current.contains(event.target)) {
      setShowFilterDropdown(!showFilterDropdown);
      setShowCategoryDropdown(false);
    } else {
      setShowCategoryDropdown(false);
      setShowFilterDropdown(false);
      setAutocompleteSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  useEffect(() => {
    setSelectedCategory('전체');
    setSelectedFilter('title');
    setShowCategoryDropdown(false);
    setShowFilterDropdown(false);
    setAutocompleteSuggestions([]);
  }, [location.pathname]);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!keyword.trim()) {
      return;
    }

    navigate(`/board/search?category=${selectedCategory}&filter=${selectedFilter}&keyword=${keyword}`);
  };

  const handleWriteButtonClick = () => {
    navigate('/board/add'); // AddPage 경로로 이동
  };

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setKeyword(value);
    setHighlightedIndex(-1);

    if (value && selectedCategory && selectedFilter) {
      try {
        console.log(`Requesting autocomplete for keyword: ${value}, category: ${selectedCategory}, searchType: ${selectedFilter}`);
        const data = await autocomplete(value, selectedFilter, selectedCategory);
        console.log("Autocomplete response:", data);
        setAutocompleteSuggestions(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching autocomplete data:", error);
      }
    } else {
      setAutocompleteSuggestions([]);
    }
  };

  const handleAutocompleteSelect = (suggestion) => {
    setKeyword(suggestion);
    setAutocompleteSuggestions([]);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(suggestion.length, suggestion.length);
    }, 0);
  };

  const handleKeyDown = (event) => {
    if (autocompleteSuggestions.length > 0) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex === autocompleteSuggestions.length - 1 ? 0 : prevIndex + 1
        );
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex === 0 ? autocompleteSuggestions.length - 1 : prevIndex - 1
        );
      } else if (event.key === 'Enter' && highlightedIndex >= 0) {
        event.preventDefault();
        handleAutocompleteSelect(autocompleteSuggestions[highlightedIndex]);
      }
    }
  };

  return (
    <>
      <div className="search-bar">
        <div className="catagory-dropdown" ref={categoryRef}>
          {selectedCategory ? categories.find(c => c.value === selectedCategory).label : '전체'}
          <div className="dropdown" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}></div>
          {showCategoryDropdown && <CatagoryDropdown categories={categories} onSelect={handleCategorySelect} />}
          <div className='dropdown-arrow'></div>
        </div>
        <div className="filter-dropdown" ref={filterRef}>
          {selectedFilter ? filters.find(f => f.value === selectedFilter).label : '제목'}
          <div className="dropdown" onClick={() => setShowFilterDropdown(!showFilterDropdown)}></div>
          {showFilterDropdown && <FilterDropdown filters={filters} onSelect={handleFilterSelect} />}
          <div className='dropdown-arrow'></div>
        </div>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            name="keyword"
            placeholder="검색어를 입력해주세요."
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            ref={inputRef}
          />
          <button className="search-button" type="submit" disabled={!keyword.trim()}></button>
          {autocompleteSuggestions.length > 0 && (
            <AutocompleteDropdown
              suggestions={autocompleteSuggestions}
              onSelect={handleAutocompleteSelect}
              highlightedIndex={highlightedIndex}
            />
          )}
        </form>
        <button className='write-button' onClick={handleWriteButtonClick}>글 쓰기</button>
      </div>
      {/* {isLoginModalOpen && <LoginModal onClose={closeLoginModal}/>} // 혜리 추가 - 로그인 하지 않았을 때 addPage로 이동하지 못하게 */}
    </>
  );
}

export default SearchBar;
