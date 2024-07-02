import { useEffect, useState } from "react";
import { getList } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMove";
import '../../assets/styles/board2.scss'; // Import the SCSS file

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

    useEffect(() => {
        getList({ page, size, categoryName }).then(data => {
            console.log("Fetched data:", data);
            setServerData(data);
        });
    }, [page, size, categoryName]);

    const handlePageChange = (newPage) => {
        moveToList({ page: newPage, size, categoryName });
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
                    {notice && (
                        <tr className="notice-row">
                            <td>공지</td>
                            <td>{notice.title}</td>
                            <td>{notice.nickname}</td>
                            <td>{notice.regDate}</td>
                            <td>{notice.views}</td>
                            <td>{notice.likesCount}</td>
                        </tr>
                    )}
                    {popularList.map((item) => (
                        <tr key={item.id} className="popular-row">
                            <td>{item.categoryName}</td>
                            <td><span className="best-label">BEST</span> {item.title}</td>
                            <td>{item.nickname}</td>
                            <td>{item.regDate}</td>
                            <td>{item.views}</td>
                            <td>{item.likesCount}</td>
                        </tr>
                    ))}
                    {boardPage.dtoList.map((item) => (
                        <tr key={item.id} className="board-row">
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
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={!boardPage.prev}
                    className="pagination-button prev"
                >
                    &lt;
                </button>
                {boardPage.pageNumList.map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`pagination-button ${pageNum === page ? 'active' : ''}`}
                    >
                        {pageNum}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={!boardPage.next}
                    className="pagination-button next"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default ListComponent;
