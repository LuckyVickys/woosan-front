import React, { useEffect, useState } from "react";
import { getNoticeList } from "../../api/csApi";
import useCustomNoticeMove from "../../hooks/useCustomNoticeMove";
import "../../assets/styles/App.scss";
import NoticeListPageComponent from "../../components/adminPage/element/NoticeListPageComponent";
import TableRowComponent from "../../components/board/element/TableRowComponent";

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: {
        page: 0,
        size: 10,
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
    const { page, size, moveToList, moveToRead } = useCustomNoticeMove();
    const [noticePage, setNoticePage] = useState(initState);

    useEffect(() => {
        getNoticeList({ page, size })
            .then((data) => {
                setNoticePage(data);
            })
            .catch((err) => {
                console.error("Failed to fetch data:", err);
            });
    }, [page, size]);

    const handleRowClick = (id) => {
        moveToRead(id, "/cs/notices");
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
                    {noticePage.dtoList &&
                        noticePage.dtoList.map((item) => (
                            <TableRowComponent
                                key={item.id}
                                item={item}
                                onClick={() => handleRowClick(item.id)}
                            />
                        ))}
                </tbody>
            </table>
            <NoticeListPageComponent
                noticeData={noticePage}
                movePage={moveToList}
            />
        </div>
    );
};

export default NoticeListComponent;
