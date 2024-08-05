import React, { useEffect, useState } from "react";
import { combinedSearch } from "../../api/boardApi";
import { useSearchParams } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove";
import SearchListPageComponent from "../../components/board/element/SearchListPageComponent";
import TableRowComponent from "../../components/board/element/TableRowComponent";
import "../../assets/styles/App.scss";
import SearchBar from "../../components/common/SearchBar.jsx"

const initState = {
  standardResult: {
    dtoList: [],
    pageRequestDTO: {
      page: 1,
      size: 10,
    },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 1,
  },
  synonymResult: {
    dtoList: [],
    pageRequestDTO: {
      page: 1,
      size: 10,
    },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 1,
  },
};

const SearchListComponent = ({ category, filter, keyword }) => {
  const { moveToRead } = useCustomMove();
  const [searchParams, setSearchParams] = useSearchParams();
  const [serverData, setServerData] = useState(initState);
  const [loading, setLoading] = useState(true);

  const fetchData = (page = 1, rpage = 1) => {
    setLoading(true);
    const size = parseInt(searchParams.get("size")) || 10;
    combinedSearch(category, filter, keyword, page, rpage, size)
      .then((data) => {
        setServerData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const rpage = parseInt(searchParams.get("rpage")) || 1;
    fetchData(page, rpage);
  }, [searchParams, category, filter, keyword]);

  const handleRowClick = (id) => {
    moveToRead(id, "/board");
  };

  const moveStandardPage = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
    fetchData(page, parseInt(searchParams.get("rpage")) || 1);
  };

  const moveSynonymPage = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("rpage", page.toString());
    setSearchParams(newParams);
    fetchData(parseInt(searchParams.get("page")) || 1, page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!serverData || !serverData.standardResult || !serverData.synonymResult) {
    return <div>No data available</div>;
  }

  const { standardResult, synonymResult } = serverData;

  const categories = [
    { label: '전체', value: '전체' },
    { label: '맛집', value: '맛집' },
    { label: '청소', value: '청소' },
    { label: '요리', value: '요리' },
    { label: '재테크', value: '재테크' },
    { label: '인테리어', value: '인테리어' },
    { label: '정책', value: '정책' },
    { label: '기타', value: '기타' }
  ];

  const filters = [
    { label: '제목', value: 'title' },
    { label: '내용', value: 'content' },
    { label: '작성자', value: 'writer' },
    { label: '제목 + 내용', value: 'titleOrContent' },
    { label: '제목 + 작성자', value: 'titleOrWriter' },
    { label: '내용 + 작성자', value: 'contentOrWriter' },
    { label: '제목 + 내용 + 작성자', value: 'titleOrContentOrWriter' }
  ];
  return (
    <div>
      <div><br></br></div>
      <SearchBar categories={categories} filters={filters} />
      <div className="list-component">
        <h2>기본 검색 결과</h2>
        <table className="list-table">
          <thead>
            <tr>
              <th>카테고리</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성 날짜</th>
              <th>조회수</th>
              <th>추천</th>
            </tr>
          </thead>
          <tbody>
            {standardResult.dtoList &&
              standardResult.dtoList.map((item) => (
                <TableRowComponent
                  key={item.id}
                  item={item}
                  onClick={() => handleRowClick(item.id)}
                />
              ))}
          </tbody>
        </table>
        <SearchListPageComponent
          serverData={standardResult}
          movePage={moveStandardPage}
        />

        <h2>연관 검색 결과</h2>
        <table className="list-table">
          <thead>
            <tr>
              <th>카테고리</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성 날짜</th>
              <th>조회수</th>
              <th>추천</th>
            </tr>
          </thead>
          <tbody>
            {synonymResult.dtoList &&
              synonymResult.dtoList.map((item) => (
                <TableRowComponent
                  key={item.id}
                  item={item}
                  onClick={() => handleRowClick(item.id)}
                />
              ))}
          </tbody>
        </table>
        <SearchListPageComponent
          serverData={synonymResult}
          movePage={moveSynonymPage}
        />
      </div>
    </div>
  );
};

export default SearchListComponent;
