import MyBoardComponent from "../../components/myPage/MyBoardComponent";
import { useNavigate } from "react-router-dom";

const NoticePage = () => {
    const navigate = useNavigate();
    const handleWriteButtonClick = () => {
        navigate("/adminPage/notice/add");
    };
    return (
        <div className="">
            <MyBoardComponent />
            <button className="write-button" onClick={handleWriteButtonClick}>
                글 쓰기
            </button>
        </div>
    );
};
export default NoticePage;
