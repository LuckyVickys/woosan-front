import "../../../assets/styles/App.scss";

const NoticeListPageComponent = ({ noticeData, movePage }) => {
    if (!noticeData || !noticeData.pageNumList) {
        return null;
    }

    return (
        <div>
            <div className="pagination">
                <button
                    className="pagination-button prev"
                    onClick={() => movePage({ page: noticeData.prevPage })}
                    disabled={!noticeData.prevPage}
                >
                    &lt;
                </button>
                {noticeData.pageNumList.map((pageNum) => (
                    <button
                        key={pageNum}
                        className={`pagination-button ${
                            noticeData.current === pageNum ? "active" : ""
                        }`}
                        onClick={() => movePage({ page: pageNum })}
                    >
                        {pageNum}
                    </button>
                ))}
                <button
                    className="pagination-button next"
                    onClick={() => movePage({ page: noticeData.nextPage })}
                    disabled={!noticeData.nextPage}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default NoticeListPageComponent;
