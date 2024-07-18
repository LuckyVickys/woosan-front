import React from "react";
import ModifyComponent from "../../components/board/ModifyComponent";
import "../../assets/styles/App.scss"; // SCSS 파일 가져오기

const ModifyNoticePage = ({ id }) => {
    const category = "공지사항";
    const titleBarText = "공지사항 수정";

    return (
        <div className="contents">
            <ModifyComponent titleBarText={titleBarText} category={category} />
        </div>
    );
};

export default ModifyNoticePage;
