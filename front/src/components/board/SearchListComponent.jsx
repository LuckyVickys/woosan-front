import React, { useEffect, useState } from "react";
import { searchBoard, searchWithSynonyms } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMove";
import ListPageComponent from "../../components/board/element/ListPageComponent";
import TableRowComponent from "../../components/board/element/TableLowComponent";
import "../../assets/styles/App.scss";

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: {
        page: 1,
        size: 10
    },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 1,
};

const SearchListComponent = ({ category, filter, keyword }) => {
    const { moveToRead } = useCustomMove();
    const [serverData, setServerData] = useState(initState);
    const [synonymData, setSynonymData] = useState([]);
    const [pageSize, setPageSize] = useState(10);

    const fetchData = (page = 1) => {
        searchBoard(category, filter, keyword, page, pageSize).then(data => {
            setServerData(data.boardPage);
        }).catch(err => {
            console.error('Failed to fetch data:', err);
        });

        searchWithSynonyms(keyword).then(data => {
            setSynonymData(data);
        }).catch(err => {
            console.error('Failed to fetch synonym data:', err);
        });
    };

    useEffect(() => {
        fetchData();
    }, [category, filter, keyword, pageSize]);

    const handleRowClick = (id) => {
        moveToRead(id, serverData);
    };

    const movePage = (page) => {
        fetchData(page);
    };

    const { dtoList } = serverData;

    return (
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
                    {dtoList && dtoList.map((item) => (
                        <TableRowComponent key={item.id} item={item} onClick={() => handleRowClick(item.id)} />
                    ))}
                </tbody>
            </table>
            <ListPageComponent
                serverData={serverData}
                movePage={movePage}
            />

            <h2>유의/동의어 검색 결과</h2>
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
                    {synonymData && synonymData.map((item) => (
                        <TableRowComponent key={item.id} item={item} onClick={() => handleRowClick(item.id)} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchListComponent;