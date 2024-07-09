import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchListComponent from '../../components/board/SearchListComponent';

const SearchListPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const category = queryParams.get("category") || "";
    const filter = queryParams.get("filter") || "titleOrContent";
    const keyword = queryParams.get("keyword") || "";

    return (
        <div className="contents">
            <SearchListComponent category={category} filter={filter} keyword={keyword} />
        </div>
    );
}

export default SearchListPage;
