import NoticeListComponent from "../../components/cs/NoticeListComponent";
import { useNavigate } from "react-router-dom";

const NoticePage = () => {
    const navigate = useNavigate();
    const handleWriteButtonClick = () => {
        navigate("/admin/notice/add");
    };
    return (
        <div className="">
            <div className="search-bar">
                <button
                    className="write-button"
                    onClick={handleWriteButtonClick}
                >
                    공지사항 쓰기
                </button>
            </div>
            <NoticeListComponent />
        </div>
    );
};
export default NoticePage;
