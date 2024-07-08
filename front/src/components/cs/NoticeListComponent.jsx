import React, { useEffect, useState } from "react";
import { getNoticeList } from "../../api/csApi";
import useCustomMove from "../../hooks/useCustomMove";
import '../../assets/styles/board2.scss';
import ListPageComponent from "../../components/board/element/ListPageComponent";
import TableRowComponent from "../../components/board/element/TableLowComponent";


const initState = {
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
};

const NoticeListComponent = () => {
    const { page, size, moveToList, moveToRead } = useCustomMove("/cs/notices");

    const [noticePage, setNoticePage] = useState(initState);

    useEffect(() => {
        getNoticeList({ page, size }).then(data => {
            console.log("Fetched data:", data);
            setNoticePage(prevState => ({
                ...prevState,
                dtoList: data, // 서버에서 받은 데이터를 dtoList에 설정
            }));
        }).catch(err => {
            console.error("Failed to fetch data:", err);
        });
    }, [page, size]);

    const handleRowClick = (id) => {
        moveToRead(id, noticePage);
        console.log("HandleRowClick:", noticePage);
    };
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
                    {noticePage.dtoList && noticePage.dtoList.map((item) => (
                        <TableRowComponent key={item.id} item={item} onClick={(handleRowClick)} />
                    ))}
                </tbody>
            </table>
            <ListPageComponent serverData={noticePage} movePage={moveToList} />
        </div>
    );
};

export default NoticeListComponent;
