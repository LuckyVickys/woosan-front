import React, { useEffect, useState } from "react";
import { getList } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMove";
import ListPageComponent from "../../components/board/element/ListPageComponent";
import TableRowComponent from "../board/element/TableLowComponent";
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
    },
    notice: {},
    popularList: [],
};

const ListComponent = () => {
    const { page, size, categoryName, moveToList, moveToRead } = useCustomMove();

    const [serverData, setServerData] = useState(initState);

    useEffect(() => {
        getList({ page, size, categoryName }).then(data => {
            console.log("Fetched data:", data);
            setServerData(data);
        }).catch(err => {
            console.error("Failed to fetch data:", err);
        });
    }, [page, size, categoryName]);

    const handleRowClick = (id) => {
        moveToRead(id, serverData)
        console.log("HandleRowClick:", serverData);
    };



    const { notice, popularList, boardPage } = serverData;

    return (
        <div className="list-component">
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
                    {notice && notice.id && (
                        <TableRowComponent item={notice} onClick={handleRowClick} isNotice={true} />
                    )}
                    {popularList && popularList.map((item) => (
                        <TableRowComponent key={item.id} item={item} onClick={handleRowClick} isPopular={true} />
                    ))}
                    {boardPage.dtoList && boardPage.dtoList.map((item) => (
                        <TableRowComponent key={item.id} item={item} onClick={handleRowClick} />
                    ))}
                </tbody>
            </table>
            <ListPageComponent serverData={boardPage} movePage={moveToList} />
        </div>
    );
};


export default ListComponent;
