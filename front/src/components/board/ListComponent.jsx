import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 사용하여 페이지 이동
import { getList } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMove";
import '../../assets/styles/board2.scss';
import ListPageComponent from "./ListPageComponent";

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
    const { page, size, categoryName, moveToList } = useCustomMove();

    const [serverData, setServerData] = useState(initState);

    const navigate = useNavigate();

    useEffect(() => {
        getList({ page, size, categoryName }).then(data => {
            console.log("Fetched data:", data);
            setServerData(data);
        }).catch(err => {
            console.error("Failed to fetch data:", err);
        });
    }, [page, size, categoryName]);

    const handleRowClick = (id) => {
        navigate(`/board/${id}`); // 게시물의 세부 페이지로 이동
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
                        <tr className="notice-row" onClick={() => handleRowClick(notice.id)}>
                            <td>공지</td>
                            <td>{notice.title}</td>
                            <td>{notice.nickname}</td>
                            <td>{notice.regDate}</td>
                            <td>{notice.views}</td>
                            <td>{notice.likesCount}</td>
                        </tr>
                    )}
                    {popularList && popularList.map((item) => (
                        <tr key={item.id} className="popular-row" onClick={() => handleRowClick(item.id)}>
                            <td>{item.categoryName}</td>
                            <td><span className="best-label">BEST</span> {item.title}</td>
                            <td>{item.nickname}</td>
                            <td>{item.regDate}</td>
                            <td>{item.views}</td>
                            <td>{item.likesCount}</td>
                        </tr>
                    ))}
                    {boardPage.dtoList && boardPage.dtoList.map((item) => (
                        <tr key={item.id} className="board-row" onClick={() => handleRowClick(item.id)}>
                            <td>{item.categoryName}</td>
                            <td>{item.title}</td>
                            <td>{item.nickname}</td>
                            <td>{item.regDate}</td>
                            <td>{item.views}</td>
                            <td>{item.likesCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ListPageComponent serverData={boardPage} movePage={moveToList} />
        </div>
    );
};

export default ListComponent;
