import React, { useEffect, useState } from "react";
import { getMyBoard } from "../../api/myPageApi";
import useCustomMove from "../../hooks/useCustomMove";
import ListPageComponent from "../../components/myPage/element/ListPageComponent";
import MyBoardTableRowComponent from "../../components/myPage/element/MyBoardTableRowComponent";
import "../../assets/styles/App.scss";
import { useSelector } from "react-redux";

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

const MyBoardComponent = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const { page, size, moveToList, moveToRead, refresh } =
        useCustomMove("/mypage/board");
    const [serverData, setServerData] = useState(initState);

    const token = loginState.accessToken;

    useEffect(() => {
        const currentPage = page || 1;
        const currentSize = size || 10;
        const params = {
            memberId: loginState.id,
            pageRequestDTO: {
                page: currentPage,
                size: currentSize,
            },
        };
        getMyBoard(params, token)
            .then((data) => {
                setServerData(data);
            })
            .catch((err) => {
                console.error("Failed to fetch data:", err);
            });
    }, [page, size, refresh, loginState.id, token]);

    const handleRowClick = (id) => {
        moveToRead(id, "/board");
    };

    const {
        dtoList,
        pageNumList,
        pageRequestDTO,
        prev,
        next,
        totalCount,
        prevPage,
        nextPage,
        totalPage,
        current,
    } = serverData;

    return (
        <>
            <div className="myBoard-list-component">
                {dtoList.length > 0 ? (
                    <div className="list-component">
                        <table className="list-table">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>카테고리</th>
                                    <th>제목</th>
                                    <th>작성 날짜</th>
                                    <th>조회수</th>
                                    <th>추천</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dtoList &&
                                    dtoList.map((item, index) => (
                                        <MyBoardTableRowComponent
                                            key={item.id}
                                            item={item}
                                            index={index}
                                            onClick={() => handleRowClick(item.id)}
                                        />
                                    ))}
                            </tbody>
                        </table>
                        <ListPageComponent
                            serverData={{
                                dtoList,
                                pageNumList,
                                pageRequestDTO,
                                prev,
                                next,
                                totalCount,
                                prevPage,
                                nextPage,
                                totalPage,
                                current,
                            }}
                            movePage={(page) => moveToList({ page })}
                        />
                    </div>
                ) : (
                    <div className="message-not-found">
                        작성한 게시글이 존재하지 않습니다.
                    </div>
                )}
            </div>
        </>
    );
};

export default MyBoardComponent;
