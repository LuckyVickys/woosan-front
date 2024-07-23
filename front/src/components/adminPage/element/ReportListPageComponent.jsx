import "../../../assets/styles/App.scss";

const ReportListPageComponent = ({ reportData, movePage }) => {
    if (!reportData || !reportData.pageNumList) {
        return null;
    }

    return (
        <div>
            <div className="pagination">
                <button
                    className="pagination-button prev"
                    onClick={() => movePage({ page: reportData.prevPage })}
                    disabled={!reportData.prevPage}
                >
                    &lt;
                </button>
                {reportData.pageNumList.map((pageNum) => (
                    <button
                        key={pageNum}
                        className={`pagination-button ${
                            reportData.current === pageNum ? "active" : ""
                        }`}
                        onClick={() => movePage({ page: pageNum })}
                    >
                        {pageNum}
                    </button>
                ))}
                <button
                    className="pagination-button next"
                    onClick={() => movePage({ page: reportData.nextPage })}
                    disabled={!reportData.nextPage}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default ReportListPageComponent;
