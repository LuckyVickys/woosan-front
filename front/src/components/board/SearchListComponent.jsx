import React, { useEffect, useState } from "react";
import { searchBoard, searchWithSynonyms } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMove";
import ListPageComponent from "./element/ListPageComponent";
import TableRowComponent from "./element/TableLowComponent";
import "../../assets/styles/App.scss";

const initState = {
    boardPage: {
        dtoList: [],
        pageNumList: [],
        pageRequestDTO: {
            page: 0,
            size: 10
        },
        prev: false,
        next: false,
        totalCount: 0,
        prevPage: 0,
        nextPage: 0,
        totalPage: 0,
        current: 0,
    }
};

const SearchListComponent = ({ category, filter, keyword }) => {
    const { moveToRead } = useCustomMove();
    const [serverData, setServerData] = useState(initState);
    const [synonymData, setSynonymData] = useState([]);

    useEffect(() => {
        searchBoard(category, filter, keyword).then(data => {
            console.log("Fetched data:", data);
            setServerData(data.boardPage);
        }).catch(err => {
            console.error("Failed to fetch data:", err);
        });

        searchWithSynonyms(keyword).then(data => {
            console.log("Fetched synonym data:", data);
            setSynonymData(data);
        }).catch(err => {
            console.error("Failed to fetch synonym data:", err);
        });
    }, [category, filter, keyword]);

    const handleRowClick = (id) => {
        moveToRead(id, serverData);
        console.log("HandleRowClick:", serverData);
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
                        <TableRowComponent key={item.id} item={item} onClick={handleRowClick} />
                    ))}
                </tbody>
            </table>
            <ListPageComponent serverData={serverData} />

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
                        <TableRowComponent key={item.id} item={item} onClick={handleRowClick} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchListComponent;
