import MyBoardComponent from "../../components/myPage/MyBoardComponent";
import { useNavigate } from "react-router-dom";

const NoticePage = () => {
    const navigate = useNavigate();
    const handleWriteButtonClick = () => {
        navigate("/adminPage/notice/add");
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
            <MyBoardComponent />
        </div>
    );
};
export default NoticePage;
