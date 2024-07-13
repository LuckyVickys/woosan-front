import React, { useEffect, useState } from "react";
import { getMyReplies } from "../../api/myPageApi";
import useCustomMove from "../../hooks/useCustomMove";
import ListPageComponent from "../board/element/ListPageComponent";
import TableRowComponent from "../board/element/TableRowComponent";
import "../../assets/styles/App.scss";

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

const MyReplyComponent = () => {
    const { page, size, moveToList, refresh } = useCustomMove();
    const [serverData, setServerData] = useState(initState);

    useEffect(() => {
        const params = {
            memberId: 8, // 실제로는 로그인된 사용자의 ID를 가져와야 합니다.
            pageRequestDTO: {
                page,
                size
            }
        };
        getMyReplies(params).then(data => {
            console.log("Fetched data:", data);
            setServerData(data);
        }).catch(err => {
            console.error("Failed to fetch data:", err);
        });
    }, [page, size, refresh]); // refresh 추가

    const handleRowClick = (id) => {
        // 댓글 클릭 시 동작 정의
        console.log("HandleRowClick:", id);
    };

    const { dtoList, pageNumList, pageRequestDTO, prev, next, totalCount, prevPage, nextPage, totalPage, current } = serverData;

    return (
        <div className="list-component">
            <table className="list-table">
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>작성 날짜</th>
                        <th>조회수</th>
                        <th>추천</th>
                        <th>카테고리</th>
                        <th>댓글 수</th>
                    </tr>
                </thead>
                <tbody>
                    {dtoList && dtoList.map((item) => (
                        <TableRowComponent key={item.id} item={item} onClick={() => handleRowClick(item.id)} />
                    ))}
                </tbody>
            </table>
            <ListPageComponent
                serverData={{ dtoList, pageNumList, pageRequestDTO, prev, next, totalCount, prevPage, nextPage, totalPage, current }}
                movePage={moveToList}
            />
        </div>
    );
};

export default MyReplyComponent;
