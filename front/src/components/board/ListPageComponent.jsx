import '../../assets/styles/board2.scss';

const ListPageComponent = ({ serverData, movePage }) => {
    if (!serverData || !serverData.pageNumList) {
        return null;
    }

    return (
        <div>
            <div className="pagination">
                <button
                    className="pagination-button prev"
                    onClick={() => movePage({ page: serverData.prevPage })}
                    disabled={!serverData.prevPage}
                >
                    &lt;
                </button>
                {serverData.pageNumList.map((pageNum) => (
                    <button
                        key={pageNum}
                        className={`pagination-button ${serverData.current === pageNum ? 'active' : ''}`}
                        onClick={() => movePage({ page: pageNum })}
                    >
                        {pageNum}
                    </button>
                ))}
                <button
                    className="pagination-button next"
                    onClick={() => movePage({ page: serverData.nextPage })}
                    disabled={!serverData.nextPage}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default ListPageComponent;
